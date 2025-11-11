// src/main.ts

import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Add FontAwesome
import 'theme-change'; // Add theme-change
import {createApp, type App as VueApp} from 'vue';
import axios from 'axios';
import type {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';

import {createPinia} from 'pinia';
import App from './App.vue';
import router from './router';

// ✅ Import Toastification
import Toast, {type PluginOptions} from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// 1. Pinia Store Imports (Need to import the specific stores needed for interceptors)
import {useAuthStore} from './stores/authStore';
import {useThemeStore} from './stores/themeStore';

// Define public routes by name (Used in the response interceptor)
// NOTE: Ensure your router names match these strings
const AUTH_ROUTES = ['Login', 'Signup', 'ForgotPassword', 'VerifyEmail'];

// --- 2. Axios and Interceptor Configuration ---
function configureAxios(routerInstance: typeof router): AxiosInstance {
    // Set global defaults
    axios.defaults.withCredentials = true;
    // Safely use VITE_API_BASE_URL, ensuring it's always a string
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '';

    // --- Request Interceptor: Add token ---
    axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem('token');
            const url = config.url || '';

            // Define public endpoints using regex patterns
            const publicEndpoints = [
                /^\/auth\/(login|register|signup|jwt\/login|jwt\/logout|google\/authorize|facebook\/authorize|forgot-password|verify)$/,
                /^\/api\/services\/?$/,
                /^\/api\/services\/[a-zA-Z0-9-]+\/?$/,
                /^\/api\/categories\/?$/,
                /^\/api\/search-categories\/?$/,
                /^\/api\/api\/address\/suggestions\/?$/,
            ];

            const isPublicEndpoint = publicEndpoints.some(pattern => pattern.test(url));

            if (token && !isPublicEndpoint) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    // --- Enhanced Response Interceptor (for 401 Unauthorized) ---
    // Since interceptors run outside of Vue component/setup context, we use an inner function
    // to lazily access the Pinia store instance only when needed.
    let isRefreshing = false;

    axios.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                // 🔑 PINIA CHANGE: Get the store instance *inside* the interceptor
                const authStore = useAuthStore();

                if (isRefreshing) {
                    // We skip the logic for queuing failed requests since your original code
                    // performed a full logout on 401, not a token refresh.
                    return Promise.reject(error);
                }

                isRefreshing = true;

                try {
                    console.warn("401 Unauthorized: Attempting to clear session and redirect to login.");

                    // 🔑 PINIA CHANGE: Call the action directly
                    await authStore.clearUser();

                    // Save current route for post-login redirect
                    if (!AUTH_ROUTES.includes(routerInstance.currentRoute.value.name as string)) {
                        localStorage.setItem('postLoginRedirect', JSON.stringify({
                            name: routerInstance.currentRoute.value.name,
                            params: routerInstance.currentRoute.value.params,
                            query: routerInstance.currentRoute.value.query
                        }));
                    }

                    // Redirect to login page
                    if (routerInstance.currentRoute.value.name !== 'Login') {
                        await routerInstance.push({name: 'Login'});
                    }

                    return Promise.reject(error);
                } catch (logoutError) {
                    console.error("Logout or redirect after 401 failed:", logoutError);
                    if (routerInstance.currentRoute.value.name !== 'Login') {
                        await routerInstance.push({name: 'Login'});
                    }
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            }
            // Case 2: Other HTTP errors (e.g., 400, 403, 404, 500)
            return Promise.reject(error);
        }
    );
    return axios;
}

// ✅ Toast options (you can adjust freely)
const toastOptions: PluginOptions = {
    timeout: 4000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false
};

// --- 3. Initialize Auth State and Application (Typed) ---
async function initApp(app: VueApp): Promise<void> {

    // Mount Pinia and Router first so the stores and router are accessible
    app.use(createPinia());
    app.use(router);

    // ✅ Add Toast plugin globally
    app.use(Toast, toastOptions);

    // 🔑 PINIA CHANGE: Get store instances after Pinia is mounted
    const authStore = useAuthStore();
    const themeStore = useThemeStore();

    // 🔑 PINIA CHANGE: Dispatch theme initialization
    themeStore.initTheme();

    try {
        const token = localStorage.getItem('token');
        if (token) {
            // Attempt to fetch user data and populate the store
            await authStore.viewUser(); // 🔑 PINIA CHANGE: Call action directly
        }
    } catch (error) {
        console.error('Application initialization failed (auth issue):', error);
        await authStore.clearUser(); // Ensure user is logged out if viewUser failed
    } finally {
        // Mount the app only after all configurations are complete
        app.mount("#app");
    }
}

// --- 4. Main Execution ---
configureAxios(router);
const app = createApp(App);
initApp(app);