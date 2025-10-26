import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'

// Lazy imports (cleaner + faster build)
const Home = () => import('../views/Home.vue')
const Product = () => import('../views/Product.vue')
const Cart = () => import('../views/Cart.vue')
const SignInPageView = () => import('../views/AuthPages/SignInPageView.vue')
const SignUpPageView = () => import('../views/AuthPages/SignUpPageView.vue')

// Seller (lazy)
const SellerProducts = () => import('../views/SellerProducts.vue')
const ProductForm = () => import('../components/ProductForm.vue')

// Onboarding / dashboards
const ProviderDashboard = () => import('../views/ProviderDashboardPageView.vue')
const SeekerDashboard = () => import('../views/SeekerDashboard.vue')
const ProviderOnboarding = () => import('../views/ProviderOnboarding.vue')
const BillingSetup = () => import('../views/BillingSetup.vue')
const ProviderAwaitingVerification = () => import('../views/ProviderAwaitingVerification.vue')
const OnboardingRouter = () => import('../views/OnboardingRouter.vue')

// Shared named views
const TopNavBar = () => import('../components/Nav.vue')
const SiteMapBar = () => import('../components/SiteMapBar.vue')
const FooterPage = () => import('../components/Footer.vue')
const LoggedInLeftSideBarMenu = () => import('../components/LoggedInLeftSideBarMenu.vue')

const routes: RouteRecordRaw[] = [
    // =================================================================================
    // Public pages
    // =================================================================================
    {
        path: '/',
        name: 'Home',
        components: {
            default: Home,
            TopNavBar,
            FooterPage,
        },
    },
    {
        path: '/product/:productId',
        name: 'ProductDetail',
        components: {
            default: Product,
            TopNavBar,
            FooterPage,
        },
    },
    {
        path: '/cart',
        name: 'Cart',
        components: {
            default: Cart,
            TopNavBar,
            FooterPage,
        },
    },
    // =================================================================================
    // Account routes (auth protected)
    // =================================================================================
    {
        path: '/login',
        name: 'Login',
        components: {
            default: SignInPageView,
            TopNavBar,
            FooterPage,
        },
    },
    {
        path: '/signup',
        name: 'Signup',
        components: {
            default: SignUpPageView,
            TopNavBar,
            FooterPage,
        },
    },
    {
        path: '/google-oauth-callback',
        name: 'GoogleOAuthCallback',
        meta: {requiresAuth: false},
        components: {
            default: () => import('../components/GoogleOAuthCallback.vue'),
            TopNavBar: () => import('../components/Nav.vue'),
        },

    },
    {
        path: '/facebook-oauth-callback',
        name: 'FacebookOAuthCallback',
        meta: {requiresAuth: false},
        components: {
            default: () => import('@/components/FacebookOAuthCallback.vue'),
            TopNavBar: () => import('../components/Nav.vue'),
        },
    },
    {
        path: '/account',
        name: 'ListAccount',
        meta: {requiresAuth: true, requiredRoles: ['user', 'provider']},
        components: {
            default: () => import('../views/AccountPages/AccountPageView.vue'),
            TopNavBar: () => import('../components/Nav.vue'),
            SiteMapBar: () => import('../components/SiteMapBar.vue'),
            LoggedInLeftSideBarMenu: () => import('../components/LoggedInLeftSideBarMenu.vue'),


        },
    },
    {
        path: '/check-email',
        name: 'CheckEmail',
        meta: {requiresAuth: false},
        components: {
            default: () => import('../views/AuthPages/CheckEmailPage.vue'),
            TopNavBar: () => import('../components/Nav.vue'),
            // FooterPage: () => import('../components/Footer.vue'),
        },
    },
    {
        path: '/verify-email',
        name: 'VerifyEmail',
        // meta: {requiresAuth: false},
        components: {
            default: () => import('../views/AuthPages/VerifyEmailPage.vue'),
            TopNavBar: () => import('../components/Nav.vue'),
            FooterPage: () => import('../components/Footer.vue'),
        },
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        meta: {requiresAuth: false},
        components: {
            default: () => import('../views/AuthPages/ResetPasswordPage.vue'),
            TopNavBar: () => import('../components/Nav.vue'),
            FooterPage: () => import('../components/Footer.vue'),
        },
    },


    // =================================================================================
    // Seller routes (auth protected)
    // =================================================================================
    {
        path: '/seller/products',
        name: 'SellerProducts',
        meta: {requiresAuth: true},
        components: {
            default: SellerProducts,
            TopNavBar,
            FooterPage,
            LoggedInLeftSideBarMenu,
        },
    },
    {
        path: '/seller/products/my-products',  // New route
        name: 'MyProducts',
        meta: {requiresAuth: true, requiredRoles: ['provider'], isProviderOnly: true},
        components: {
            default: SellerProducts,  // Can reuse SellerProducts component or create new one
            TopNavBar,
            FooterPage,
            LoggedInLeftSideBarMenu,
        },
    },
    {
        path: '/seller/products/create',
        name: 'CreateProduct',
        meta: {requiresAuth: true, requiredRoles: ['provider'], isProviderOnly: true},
        components: {
            default: ProductForm,
            TopNavBar,
            FooterPage,
            LoggedInLeftSideBarMenu,
        },
    },
    {
        path: '/seller/products/edit/:productId',
        name: 'EditProduct',
        meta: {requiresAuth: true, requiredRoles: ['provider'], isProviderOnly: true},
        props: {
            default: route => ({
                productId: route.params.productId,
                isEdit: true,
            }),
        },
        components: {
            default: ProductForm,
            TopNavBar,
            FooterPage,
            LoggedInLeftSideBarMenu,
        },
    },

    // =================================================================================
    // Dashboards / Onboarding
    // =================================================================================
    {
        path: '/provider-dashboard',
        name: 'ProviderDashboard',
        meta: {requiresAuth: true, requiredRoles: ['provider'], isProviderOnly: true},
        components: {
            default: ProviderDashboard,
            TopNavBar,
            SiteMapBar,
            FooterPage,
            LoggedInLeftSideBarMenu,
        },
    },
    {
        path: '/seeker-dashboard',
        name: 'SeekerDashboard',
        meta: {requiresAuth: true, requiredRoles: ['user']},
        components: {
            default: SeekerDashboard,
            TopNavBar,
            SiteMapBar,
            FooterPage,
        },
    },
    {
        path: '/onboarding/continue',
        name: 'onboarding-choice',
        meta: {requiresAuth: true},
        components: {
            default: OnboardingRouter,
            TopNavBar,
            FooterPage,
        },
    },
    {
        path: '/onboarding/provider-details',
        name: 'provider-onboarding-details',
        meta: {requiresAuth: true, requiredRoles: ['user']},
        components: {
            default: ProviderOnboarding,
            TopNavBar,
            FooterPage,
        },
    },
    {
        path: '/onboarding/complete-profile',
        name: 'complete-profile',
        meta: {requiresAuth: true, requiredRoles: ['user']},
        components: {
            // default: () => import('../components/BasicProfileCompletionPageView.vue'),
            TopNavBar,
            FooterPage,
        },
    },
    {
        path: '/onboarding/billing-setup',
        name: 'billing-setup',
        meta: {requiresAuth: true, requiredRoles: ['provider'], isProviderOnly: true},
        components: {
            default: BillingSetup,
            TopNavBar,
            FooterPage,
        },
    },
    {
        path: '/awaiting-verification',
        name: 'awaiting-verification',
        meta: {requiresAuth: true, requiredRoles: ['provider'], isProviderOnly: true},
        components: {
            default: ProviderAwaitingVerification,
            TopNavBar,
            FooterPage,
        },
    },

    //##########################################################################################
    // Subscription Page Routes                                                                #
    //##########################################################################################
    {
        path: '/subscription',
        name: 'ListSubscriptions',
        meta: {requiresAuth: true, requiredRoles: ['provider'], isProviderOnly: true},
        components: {
            default: () => import('../views/StripePages/SubscriptionPlansPageView.vue'),
            TopNavBar: () => import('../components/Nav.vue'),
            SiteMapBar: () => import('../components/SiteMapBar.vue'),
            LoggedInLeftSideBarMenu: () => import('../components/LoggedInLeftSideBarMenu.vue'),
            FooterPage: () => import('../components/Footer.vue'),

        },
    },
    {
        path: '/invoice',
        name: 'ListInvoices',
        meta: {requiresAuth: true},
        components: {
            default: () => import('../views/StripePages/SubscriptionInvoicesPageView.vue'),
            TopNavBar: () => import('../components/Nav.vue'),
            SiteMapBar: () => import('../components/SiteMapBar.vue'),
            LoggedInLeftSideBarMenu: () => import('../components/LoggedInLeftSideBarMenu.vue'),
            FooterPage: () => import('../components/Footer.vue'),

        },
    },


    // =================================================================================
    // 404 fallback
    // =================================================================================
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


import type {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {useAuthStore} from '@/stores/authStore';
// import ProductForm from "@/components/ProductForm.vue";
// import SellerProducts from "@/views/SellerProducts.vue"; // Adjust path to your auth store

// Define types for your route meta
declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean;
        requiredRoles?: string[];
        isProviderOnly?: boolean;
        isSeekerOnly?: boolean;
    }
}

// Define user type for better type safety
interface User {
    email?: string;
    is_verified?: boolean;
    is_provisional?: boolean;
    roles?: string[];
    provider_status?: string;
    onboarding_status?: {
        basic_complete?: boolean;
        provider_onboarding_complete?: boolean;
        billing_setup_complete?: boolean;
    };
}

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    console.group('Router Guard Check');
    console.log(`Navigating from: ${from.fullPath} to: ${to.fullPath}`);

    // Get Pinia store instance
    const authStore = useAuthStore();

    // Debugging current token and user state
    const tokenFromGetterCheck = !!localStorage.getItem('token');
    const userFromGetterCheck = !!authStore.user; // Direct access to store state
    console.log(`DEBUG: Getter component 1 (token): ${tokenFromGetterCheck}`);
    console.log(`DEBUG: Getter component 2 (state.user): ${userFromGetterCheck}`);

    const isAuthenticated = authStore.isAuthenticated; // Assuming you have this getter in Pinia
    let currentUser: User | null = authStore.user; // Direct access
    const tokenInLocalStorage = localStorage.getItem('token');

    console.log(`Guard sees - isAuthenticated: ${isAuthenticated}`);
    console.log(`Guard sees - state.user is present: ${!!currentUser}`);

    // Define public routes for easier checks
    const AUTH_ROUTES = ['Login', 'Signup', 'GoogleOAuthCallback', 'FacebookOAuthCallback', 'ResetPassword'];
    const PUBLIC_ROUTES = ['VerifyEmail', 'ForgotPassword', 'ResetPassword', ...AUTH_ROUTES];

    const UNVERIFIED_EMAIL_ROUTE_NAME = 'CheckEmail';
    const BASIC_PROFILE_ROUTE_NAME = 'complete-profile';
    const PROVIDER_ONBOARDING_ROUTE_NAME = 'provider-onboarding-details';
    const BILLING_SETUP_ROUTE_NAME = 'billing-setup';
    const ONBOARDING_CHOICE_ROUTE_NAME = 'onboarding-choice';
    const PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME = 'awaiting-verification';

    // --- IMPORTANT: Initial User Data Fetching/Re-authentication ---
    if (tokenInLocalStorage && !currentUser) {
        try {
            console.log("Guard: Token found, but store.user is null. Dispatching 'viewUser'.");
            await authStore.viewUser(); // Direct store action call
            currentUser = authStore.user; // Update currentUser after successful fetch
            console.log("Guard: 'viewUser' successful. New currentUser state:", currentUser);
        } catch (error) {
            console.warn("Guard: 'viewUser' failed. Clearing user and redirecting to login:", error);
            await authStore.clearUser(); // Direct store action call
            if (to.meta.requiresAuth && !PUBLIC_ROUTES.includes(to.name as string)) {
                console.groupEnd();
                return next({name: 'Login', query: {redirect: to.fullPath}});
            }
            console.groupEnd();
            return next();
        }
    }

    // --- Get Fresh State After Potential Re-authentication ---
    const currentIsLoggedIn = authStore.isAuthenticated;
    const isEmailVerified = currentUser?.is_verified === true;
    const isProvisional = currentUser?.is_provisional === true;
    const isBasicProfileComplete = currentUser?.onboarding_status?.basic_complete === true;
    const isProviderOnboardingComplete = currentUser?.onboarding_status?.provider_onboarding_complete === true;
    const isBillingSetupComplete = currentUser?.onboarding_status?.billing_setup_complete === true;
    const userRoles = currentUser?.roles || [];
    const isUserSeeker = userRoles.includes('user');
    const isUserProvider = userRoles.includes('provider');
    const providerStatus = currentUser?.provider_status;
    const isProviderApproved = providerStatus === 'approved';

    console.log(`Guard (Post-viewUser) - currentIsLoggedIn: ${currentIsLoggedIn}`);
    console.log(`Guard (Post-viewUser) - isEmailVerified: ${isEmailVerified}`);
    console.log(`Guard (Post-viewUser) - isProvisional: ${isProvisional}`);
    console.log(`Guard (Post-viewUser) - isBasicProfileComplete: ${isBasicProfileComplete}`);
    console.log(`Guard (Post-viewUser) - isUserSeeker: ${isUserSeeker}`);
    console.log(`Guard (Post-viewUser) - isUserProvider: ${isUserProvider}`);
    console.log(`Guard (Post-viewUser) - isProviderApproved: ${isProviderApproved}`);

    // --- Core Logic for Redirection ---

    // A. If the route requires authentication but the user is not logged in.
    if (to.meta.requiresAuth && !currentIsLoggedIn) {
        if (!PUBLIC_ROUTES.includes(to.name as string)) {
            console.log(`Guard: Route ${to.fullPath} requires auth, but user not logged in. Redirecting to Login.`);
            console.groupEnd();
            return next({name: 'Login', query: {redirect: to.fullPath}});
        }
        console.groupEnd();
        return next();
    }

    // B. If the user is logged in and trying to access login/signup pages directly.
    if (currentIsLoggedIn && AUTH_ROUTES.includes(to.name as string)) {
        if (to.name === 'Login' || to.name === 'Signup' || to.name === 'ResetPassword') {
            console.log(`Guard: Logged in user trying to access auth page directly. Redirecting based on onboarding state.`);
            if (isProvisional) {
                console.groupEnd();
                return next({name: ONBOARDING_CHOICE_ROUTE_NAME});
            } else {
                console.groupEnd();
                return next({name: isUserProvider ? 'ProviderDashboard' : 'SeekerDashboard'});
            }
        }
        if (to.name === 'GoogleOAuthCallback' || to.name === 'FacebookOAuthCallback') {
            console.log(`Guard: Allowing OAuth callback for ${to.name}, component will handle redirect.`);
            console.groupEnd();
            return next();
        }
    }

    // C & D. Email Verification and Provisional Status Onboarding
    if (currentIsLoggedIn && currentUser) {
        // C. Email Verification
        if (!isEmailVerified && to.name !== UNVERIFIED_EMAIL_ROUTE_NAME) {
            console.log(`Guard: User ${currentUser.email} not email verified. Redirecting to ${UNVERIFIED_EMAIL_ROUTE_NAME}.`);
            console.groupEnd();
            return next({name: UNVERIFIED_EMAIL_ROUTE_NAME});
        }
        if (isEmailVerified && to.name === UNVERIFIED_EMAIL_ROUTE_NAME) {
            console.log(`Guard: User ${currentUser.email} email verified, trying to access CheckEmail. Redirecting to appropriate next step.`);
            if (isProvisional) return next({name: ONBOARDING_CHOICE_ROUTE_NAME});
            if (isUserProvider) {
                if (!isBasicProfileComplete) return next({name: BASIC_PROFILE_ROUTE_NAME});
                if (!isProviderOnboardingComplete) return next({name: PROVIDER_ONBOARDING_ROUTE_NAME});
                if (!isBillingSetupComplete) return next({name: BILLING_SETUP_ROUTE_NAME});
                if (providerStatus === 'pending') return next({name: PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME});
                if (isProviderApproved) return next({name: 'ProviderDashboard'});
            }
            console.groupEnd();
            return next({name: 'SeekerDashboard'});
        }

        // D. Provisional Status / Onboarding Choice Gate
        if (isEmailVerified && isProvisional) {
            if (to.name !== ONBOARDING_CHOICE_ROUTE_NAME) {
                console.log(`Guard: User ${currentUser.email} is email verified and provisional. Redirecting to ${ONBOARDING_CHOICE_ROUTE_NAME}.`);
                console.groupEnd();
                return next({name: ONBOARDING_CHOICE_ROUTE_NAME});
            }
            console.log(`Guard: User ${currentUser.email} is provisional and navigating to ${ONBOARDING_CHOICE_ROUTE_NAME}. Allowing.`);
            console.groupEnd();
            return next();
        }
        if (isEmailVerified && !isProvisional && to.name === ONBOARDING_CHOICE_ROUTE_NAME) {
            console.log(`Guard: User ${currentUser.email} is no longer provisional, trying to access ${ONBOARDING_CHOICE_ROUTE_NAME}. Redirecting.`);
            if (isUserProvider) {
                if (!isBasicProfileComplete) return next({name: BASIC_PROFILE_ROUTE_NAME});
                if (!isProviderOnboardingComplete) return next({name: PROVIDER_ONBOARDING_ROUTE_NAME});
                if (!isBillingSetupComplete) return next({name: BILLING_SETUP_ROUTE_NAME});
                if (providerStatus === 'pending') return next({name: PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME});
                if (isProviderApproved) return next({name: 'ProviderDashboard'});
            }
            console.groupEnd();
            return next({name: 'SeekerDashboard'});
        }

        // --- Role-Specific Onboarding Funnels ---
        if (isEmailVerified && !isProvisional) {
            // F. Provider-Specific Onboarding Steps
            if (isUserProvider) {
                const isProviderRouteAttempt = to.meta.isProviderOnly === true;

                // Onboarding Check 1: Basic Profile Completion
                if (!isBasicProfileComplete) {
                    if (to.name !== BASIC_PROFILE_ROUTE_NAME) {
                        console.log(`Guard: Provider ${currentUser.email} needs to complete basic profile. Redirecting to ${BASIC_PROFILE_ROUTE_NAME}.`);
                        console.groupEnd();
                        return next({name: BASIC_PROFILE_ROUTE_NAME});
                    }
                    console.log(`Guard: Provider ${currentUser.email} is on basic profile page and it's incomplete. Allowing.`);
                    console.groupEnd();
                    return next();
                }

                // Onboarding Check 2: Provider Onboarding Details
                if (isBasicProfileComplete && !isProviderOnboardingComplete) {
                    if (to.name !== PROVIDER_ONBOARDING_ROUTE_NAME) {
                        console.log(`Guard: Provider ${currentUser.email} basic profile complete but missing provider details. Redirecting to ${PROVIDER_ONBOARDING_ROUTE_NAME}.`);
                        console.groupEnd();
                        return next({name: PROVIDER_ONBOARDING_ROUTE_NAME});
                    }
                    console.log(`Guard: Provider ${currentUser.email} is on provider onboarding page and it's incomplete. Allowing.`);
                    console.groupEnd();
                    return next();
                }

                // Onboarding Check 3: Billing Setup
                if (isProviderOnboardingComplete && !isBillingSetupComplete) {
                    if (to.name !== BILLING_SETUP_ROUTE_NAME) {
                        console.log(`Guard: Provider ${currentUser.email} provider onboarding complete but billing incomplete. Redirecting to ${BILLING_SETUP_ROUTE_NAME}.`);
                        console.groupEnd();
                        return next({name: BILLING_SETUP_ROUTE_NAME});
                    }
                    console.log(`Guard: Provider ${currentUser.email} is on billing setup page and it's incomplete. Allowing.`);
                    console.groupEnd();
                    return next();
                }

                // Onboarding Check 4: Awaiting Admin Approval
                if (isBillingSetupComplete && providerStatus === 'pending') {
                    if (isProviderRouteAttempt && to.name !== PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME) {
                        console.log(`Guard: Pending Provider ${currentUser.email} trying to access provider-only route. Redirecting to awaiting verification.`);
                        console.groupEnd();
                        return next({name: PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME});
                    }
                    if (to.name === PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME) {
                        console.log(`Guard: Pending Provider ${currentUser.email} on awaiting verification page. Allowing.`);
                        console.groupEnd();
                        return next();
                    }
                    console.log(`Guard: Pending Provider ${currentUser.email} attempting a non-provider route. Allowing navigation.`);
                    console.groupEnd();
                    return next();
                }

                // G. Handle Approved Providers
                if (isProviderApproved) {
                    if (to.name === BASIC_PROFILE_ROUTE_NAME ||
                        to.name === PROVIDER_ONBOARDING_ROUTE_NAME ||
                        to.name === BILLING_SETUP_ROUTE_NAME ||
                        to.name === PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME ||
                        to.name === 'SeekerDashboard') {
                        console.log(`Guard: Approved Provider ${currentUser.email} trying to access completed onboarding/seeker pages. Redirecting to ProviderDashboard.`);
                        console.groupEnd();
                        return next({name: 'ProviderDashboard'});
                    }
                    console.log(`Guard: User ${currentUser.email} is an approved provider. Allowing navigation to ${to.fullPath}.`);
                    console.groupEnd();
                    return next();
                }

                console.log(`Guard: Provider ${currentUser.email} is on correct onboarding step or accessing a non-provider-only route. Allowing navigation.`);
                console.groupEnd();
                return next();
            }

            // E. Seeker-Specific Logic
            if (isUserSeeker && !isUserProvider) {
                if (isBasicProfileComplete && to.name === BASIC_PROFILE_ROUTE_NAME) {
                    console.log(`Guard: Seeker already completed basic profile, redirecting to SeekerDashboard.`);
                    console.groupEnd();
                    return next({name: 'SeekerDashboard'});
                }

                if (to.meta.isProviderOnly === true) {
                    console.log(`Guard: Seeker ${currentUser.email} cannot access provider-only route ${to.fullPath}. Redirecting to SeekerDashboard.`);
                    console.groupEnd();
                    return next({name: 'SeekerDashboard'});
                }

                if (to.meta.requiredRoles) {
                    const hasRequiredRole = to.meta.requiredRoles.some(role => userRoles.includes(role));
                    if (!hasRequiredRole) {
                        console.log(`Guard: Seeker ${currentUser.email} lacks required roles for ${to.fullPath}. Redirecting to SeekerDashboard.`);
                        console.groupEnd();
                        return next({name: 'SeekerDashboard'});
                    }
                }

                console.log(`Guard: User ${currentUser.email} is a seeker accessing allowed route. Allowing navigation.`);
                console.groupEnd();
                return next();
            }
        }
    }

    // --- Role-Based Access Control (RBAC) ---
    if (to.meta.requiredRoles && currentIsLoggedIn && currentUser) {
        const requiredRoles = to.meta.requiredRoles;
        const userRoles = currentUser.roles || [];
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRequiredRole) {
            console.log(`Guard: User ${currentUser.email} lacks required roles ${requiredRoles} for ${to.fullPath}. Redirecting.`);
            console.groupEnd();
            return next({name: isUserProvider ? 'ProviderDashboard' : 'SeekerDashboard'});
        }
    }

    // --- Final Fallback: Allow Navigation ---
    console.log(`Guard: Allowing final navigation to ${to.fullPath}`);
    console.groupEnd();
    next();
});

export default router