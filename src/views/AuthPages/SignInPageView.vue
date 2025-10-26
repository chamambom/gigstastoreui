<template>
  <div class="min-h-screen flex items-center justify-center p-3 sm:p-4">
    <div class="w-full max-w-sm">
      <!-- Main Card -->
      <div class="card bg-base-300">
        <div class="card-body p-4 sm:p-6 space-y-4">

          <!-- Header Section -->
          <div class="text-center space-y-3">
            <div class="avatar">
              <div class="w-14 sm:w-16 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
                <img
                    src="@/assets/images/banner.png"
                    alt="GigSta community"
                    class="w-full h-full rounded-full object-contain bg-base-100"
                />
              </div>
            </div>
            <div class="space-y-1">
              <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Sign In
              </h1>
              <p class="text-orange-400 text-sm leading-relaxed">
                Become a GigSta & grow your side hustles
              </p>
            </div>
          </div>

          <!-- Social Login Section -->
<!--          <div class="space-y-3">-->
<!--            <button-->
<!--                @click="googleLogin"-->
<!--                class="btn btn-sm sm:btn-md border-gray-300 rounded-full w-full gap-2 sm:gap-3 group hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950/20 transition-all duration-200 min-h-10 sm:min-h-12"-->
<!--            >-->
<!--              <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" viewBox="0 0 24 24">-->
<!--                <path fill="#4285f4"-->
<!--                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>-->
<!--                <path fill="#34a853"-->
<!--                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>-->
<!--                <path fill="#fbbc05"-->
<!--                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>-->
<!--                <path fill="#ea4335"-->
<!--                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>-->
<!--              </svg>-->
<!--              <span class="font-medium text-sm sm:text-base-content truncate">Continue with Google</span>-->
<!--            </button>-->

<!--            <button-->
<!--                @click="facebookLogin"-->
<!--                class="btn btn-sm sm:btn-md border-gray-300 rounded-full w-full gap-2 sm:gap-3 group hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 transition-all duration-200 min-h-10 sm:min-h-12"-->
<!--            >-->
<!--              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#1877f2] group-hover:scale-110 transition-transform flex-shrink-0" viewBox="0 0 24 24"-->
<!--                   fill="currentColor">-->
<!--                <path-->
<!--                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>-->
<!--              </svg>-->
<!--              <span class="font-medium text-sm sm:text-base-content truncate">Continue with Facebook</span>-->
<!--            </button>-->
<!--          </div>-->

          <!-- Divider -->
          <div class="divider text-xs font-medium my-3">OR</div>

          <!-- Error Message -->
          <div v-if="loginError" class="alert alert-error py-2 px-3 text-sm rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-xs sm:text-sm">{{ loginError }}</span>
          </div>

          <!-- Form -->
          <form @submit.prevent="submitLogin" class="space-y-4">
            <!-- Email Field -->
            <div class="form-control">
              <label class="label pb-1 px-0">
                <span class="label-text font-medium text-sm">
                  Email <span class="text-error">*</span>
                </span>
              </label>
              <label
                  class="input input-sm sm:input-md input-bordered rounded-full flex items-center gap-2 focus-within:input-primary transition-all duration-200"
                  :class="{'input-error': v$.form.email.$error}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     class="w-4 h-4 opacity-70 flex-shrink-0">
                  <path
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                  <path
                      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                </svg>
                <input
                    type="email"
                    class="grow text-sm sm:text-base min-w-0"
                    placeholder="your@email.com"
                    v-model="v$.form.email.$model"
                    autocomplete="email"
                />
              </label>
              <label v-if="v$.form.email.$error" class="label pt-1 px-0">
                <span v-for="error of v$.form.email.$errors" :key="error.$uid"
                      class="label-text-alt text-error text-xs">
                  {{ error.$message }}
                </span>
              </label>
            </div>

            <!-- Password Field -->
            <div class="form-control">
              <label class="label pb-1 px-0">
                <span class="label-text font-medium text-sm">
                  Password <span class="text-error">*</span>
                </span>
              </label>
              <label
                  class="input input-sm sm:input-md input-bordered rounded-full flex items-center gap-2 focus-within:input-primary transition-all duration-200"
                  :class="{'input-error': v$.form.password.$error}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     class="w-4 h-4 opacity-70 flex-shrink-0">
                  <path fill-rule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clip-rule="evenodd"/>
                </svg>
                <input
                    type="password"
                    class="grow text-sm sm:text-base min-w-0"
                    placeholder="Enter your password"
                    v-model="v$.form.password.$model"
                    autocomplete="current-password"
                />
              </label>
              <label v-if="v$.form.password.$error" class="label pt-1 px-0">
                <span v-for="error of v$.form.password.$errors" :key="error.$uid"
                      class="label-text-alt text-error text-xs">
                  {{ error.$message }}
                </span>
              </label>
            </div>

            <!-- Forgot Password Link -->
            <div class="text-center py-1">
              <button
                  type="button"
                  @click="openForgotPasswordModal"
                  class="link text-orange-400 text-sm font-medium hover:link-hover transition-colors active:scale-95"
              >
                Forgot password?
              </button>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                :disabled="v$.form.$invalid || loadingLogin"
                class="btn btn-sm sm:btn-md bg-purple-700 hover:bg-purple-600 rounded-full w-full gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 min-h-10 sm:min-h-12"
            >
              <span v-if="loadingLogin" class="loading loading-spinner loading-sm"></span>
              <span v-else class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 flex-shrink-0">
                  <path fill-rule="evenodd"
                        d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                        clip-rule="evenodd"/>
                </svg>
              </span>
              <span class="text-sm sm:text-base">{{ loadingLogin ? 'Signing In...' : 'Continue' }}</span>
            </button>
          </form>

          <!-- Sign Up Link -->
          <div class="text-center pt-2">
            <p class="text-sm text-base-content/70">
              Don't have an account?
              <router-link to="/signup" class="link text-orange-400 font-medium hover:link-hover transition-colors active:scale-95">
                Sign up
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Forgot Password Modal -->
  <div v-if="showForgotPasswordModal" class="modal modal-open">
    <div class="modal-box relative max-w-md mx-3 sm:mx-auto">
      <button
          @click="closeForgotPasswordModal"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-base-200 active:scale-95"
          aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
          <path
              d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"/>
        </svg>
      </button>

      <div class="space-y-4 pt-2">
        <div class="text-center space-y-3">
          <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                 class="w-6 h-6 text-primary">
              <path fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold">Reset Password</h3>
            <p class="text-sm text-base-content/70 leading-relaxed mt-1">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
        </div>

        <form @submit.prevent="requestPasswordReset" class="space-y-4">
          <div class="form-control">
            <label
                class="input input-sm sm:input-md input-bordered flex items-center gap-2 focus-within:input-primary transition-all duration-200"
                :class="{'input-error': v$.forgotPasswordEmail.$error}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                   class="w-4 h-4 opacity-70 flex-shrink-0">
                <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
              </svg>
              <input
                  type="email"
                  class="grow text-sm sm:text-base min-w-0"
                  placeholder="your@email.com"
                  v-model="v$.forgotPasswordEmail.$model"
                  autocomplete="email"
              />
            </label>
            <label v-if="v$.forgotPasswordEmail.$error" class="label pt-1">
              <span v-for="error of v$.forgotPasswordEmail.$errors" :key="error.$uid"
                    class="label-text-alt text-error text-xs">
                {{ error.$message }}
              </span>
            </label>
          </div>

          <!-- Success/Error Message -->
          <div v-if="forgotPasswordMessage"
               class="alert py-2 px-3 text-sm rounded-lg"
               :class="{'alert-success': forgotPasswordSuccess, 'alert-error': !forgotPasswordSuccess}">
            <svg v-if="forgotPasswordSuccess" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4"
                 fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-xs sm:text-sm">{{ forgotPasswordMessage }}</span>
          </div>

          <div class="modal-action pt-2 gap-2">
            <button
                type="button"
                @click="closeForgotPasswordModal"
                class="btn btn-sm sm:btn-md btn-ghost flex-1 sm:flex-none active:scale-95"
            >
              Cancel
            </button>
            <button
                type="submit"
                :disabled="v$.forgotPasswordEmail.$invalid || loadingForgotPassword"
                class="btn btn-sm sm:btn-md btn-primary gap-2 flex-1 sm:flex-none active:scale-95"
            >
              <span v-if="loadingForgotPassword" class="loading loading-spinner loading-sm"></span>
              <span v-else class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 flex-shrink-0">
                  <path
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                  <path
                      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                </svg>
              </span>
              <span class="text-sm">{{ loadingForgotPassword ? 'Sending...' : 'Send Reset Link' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch, nextTick, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 1. Pinia Imports
import { useAuthStore } from '@/stores/authStore'; // 👈 Use the Pinia store
import { User } from '../types/User'; // 👈 Import the User type for safety

// 2. Composable and Vuelidate Imports (unchanged)
import { useAuthFlags } from '@/composables/useAuthFlags';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

// 3. Initialize Stores and Router
const authStore = useAuthStore(); // 👈 Pinia store instance
const router = useRouter();
const route = useRoute();

// 4. Use the Pinia-compatible composable
const {
    isLoggedIn, // This is a ComputedRef<boolean>
    isProvider,
    isSeeker,
    currentUser: currentUserRef, // This is a ComputedRef<User | null>
} = useAuthFlags();

// --- Login Form State (Typed) ---
interface LoginForm {
    email: string;
    password: string;
}
const form = reactive<LoginForm>({
    email: '',
    password: '',
});
const loginError = ref<string>('');
const loadingLogin = ref<boolean>(false);

// --- Forgot Password Modal State (Typed) ---
const showForgotPasswordModal = ref<boolean>(false);
const forgotPasswordEmail = ref<string>('');
const forgotPasswordMessage = ref<string>('');
const forgotPasswordSuccess = ref<boolean>(false);
const loadingForgotPassword = ref<boolean>(false);

// --- Vuelidate Rules (Unchanged logic, Vuelidate handles types) ---
const loginRules = computed(() => {
    return {
        form: {
            email: {
                required: helpers.withMessage('Email is required', required),
                email: helpers.withMessage('Must be a valid email address', email),
            },
            password: {
                required: helpers.withMessage('Password is required', required),
                minLength: helpers.withMessage(({ $params }: any) => `Password must be at least ${$params.min} characters long`, minLength(8)),
            },
        },
    };
});

const forgotPasswordRules = computed(() => {
    return {
        forgotPasswordEmail: {
            required: helpers.withMessage('Email is required', required),
            email: helpers.withMessage('Must be a valid email address', email),
        },
    };
});

// Initialize Vuelidate for both forms (Unchanged)
const v$ = useVuelidate(
    { ...loginRules.value, ...forgotPasswordRules.value },
    { form, forgotPasswordEmail }
);


// --- Watch for changes in isLoggedIn to handle post-login redirects ---
watch(isLoggedIn, async (newVal) => {
    if (newVal) {
        console.log('Login successful. Handling redirection...');
        await nextTick();

        const query = route.query;
        // All redirection logic remains exactly the same as it relies on Vue Router and browser storage.

        // 1. Redirect to specific query route (e.g., service booking)
        if (query.redirectName) {
            const routeObj = {
                name: String(query.redirectName), // Cast to String for type safety
                query: {
                    serviceId: query.serviceId,
                    providerId: query.providerId,
                }
            };
            await router.replace(routeObj);
            return;
        }

        // 2. Redirect via standard router query param
        const redirectPath = query.redirect;
        if (redirectPath && typeof redirectPath === 'string') {
            await router.replace(redirectPath);
            return;
        }

        // 3. Redirect via localStorage (complex route object)
        const postLoginRedirect = localStorage.getItem('postLoginRedirect');
        if (postLoginRedirect) {
            try {
                const storedRoute = JSON.parse(postLoginRedirect);
                localStorage.removeItem('postLoginRedirect');
                await router.replace({ name: storedRoute.name, params: storedRoute.params, query: storedRoute.query });
                return;
            } catch (e) {
                console.error("Failed to parse postLoginRedirect from localStorage.", e);
                localStorage.removeItem('postLoginRedirect');
            }
        }

        // 4. Default redirect
        await router.replace({ name: 'onboarding-choice' });
    }
}, { immediate: true });


// --- onMounted hook to handle direct URL access when already authenticated ---
onMounted(async () => {
    // Access isLoggedIn from the composable (which gets its value from Pinia)
    if (isLoggedIn.value) {
        console.log('User already authenticated on mount of Login page. Redirecting based on role.');

        // Access the reactive value of the Pinia store's user getter via the composable
        const user = currentUserRef.value;

        if (user?.roles?.includes('provider')) {
            await router.replace({ name: 'ProviderDashboard' });
        } else {
            await router.replace({ name: 'SeekerDashboard' });
        }
    }

    // Handle pre-filling email from query
    if (route.query.email && typeof route.query.email === 'string') {
        form.email = route.query.email; // Pre-fill email field
    }
});


// --- Login Action ---
const submitLogin = async () => {
    const isFormValid = await v$.value.form.$validate();

    if (!isFormValid) {
        loginError.value = 'Please correct the errors in the form.';
        return;
    }

    loginError.value = '';
    loadingLogin.value = true;

    try {
        const credentials: LoginForm = {
            email: form.email,
            password: form.password,
        };

        // 🎯 Pinia Change: Call the action directly on the store instance
        await authStore.logIn(credentials);

    } catch (error: any) { // Use 'any' to handle the custom error structure
        console.error('Login failed:', error);

        if (error.message === "OAUTH_NEEDS_PASSWORD_SETUP") {
            loginError.value = 'Your account was created with a social login. Please set a new password.';
            openForgotPasswordModal();
        } else {
            // For all other errors, display the message to the user
            loginError.value = error.message;
        }

    } finally {
        loadingLogin.value = false;
    }
};

// --- Social Login Actions ---
const googleLogin = async () => {
    try {
        const query = route.query;
        if (Object.keys(query).length > 0) {
            // Store the entire query object for post-OAuth redirection
            localStorage.setItem('postGoogleOAuthRedirect', JSON.stringify(query));
        }

        // 🎯 Pinia Change: Call the action directly on the store instance
        await authStore.googleLogin();

    } catch (error) {
        console.error('Google login initiation failed:', error);
        loginError.value = 'Google login failed to start. Please try again.';
    }
};

const facebookLogin = async () => {
    try {
        const query = route.query;
        if (Object.keys(query).length > 0) {
            // Store the entire query object for post-OAuth redirection
            localStorage.setItem('postFacebookOAuthRedirect', JSON.stringify(query));
        }

        // 🎯 Pinia Change: Call the action directly on the store instance
        await authStore.facebookLogin();

    } catch (error) {
        console.error('Facebook login initiation failed:', error);
        loginError.value = 'Facebook login failed to start. Please try again.';
    }
};

// --- Forgot Password Methods ---
const openForgotPasswordModal = () => {
    // ... (logic remains the same)
    showForgotPasswordModal.value = true;
    forgotPasswordEmail.value = form.email;
    forgotPasswordMessage.value = '';
    forgotPasswordSuccess.value = false;
    v$.value.forgotPasswordEmail.$reset();
};

const closeForgotPasswordModal = () => {
    // ... (logic remains the same)
    showForgotPasswordModal.value = false;
    forgotPasswordEmail.value = '';
    forgotPasswordMessage.value = '';
    forgotPasswordSuccess.value = false;
    loadingForgotPassword.value = false;
    v$.value.forgotPasswordEmail.$reset();
};

const requestPasswordReset = async () => {
    const isFormValid = await v$.value.forgotPasswordEmail.$validate();

    if (!isFormValid) {
        forgotPasswordMessage.value = 'Please enter a valid email address.';
        forgotPasswordSuccess.value = false;
        return;
    }

    forgotPasswordMessage.value = '';
    forgotPasswordSuccess.value = false;
    loadingForgotPassword.value = true;

    try {
        // 🎯 Pinia Change: Call the action directly on the store instance
        await authStore.requestPasswordReset(forgotPasswordEmail.value);

        forgotPasswordSuccess.value = true;
        forgotPasswordMessage.value = 'If an account with that email exists, a password reset link has been sent.';
    } catch (error: any) { // Use 'any' to handle the axios/custom error structure
        forgotPasswordSuccess.value = false;
        forgotPasswordMessage.value = error.response?.data?.detail || 'Failed to send password reset link. Please try again.';
        console.error('Forgot password request failed:', error);
    } finally {
        loadingForgotPassword.value = false;
    }
};
</script>