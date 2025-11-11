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
const ProviderOnboarding = () => import('../views/OnboardingPages/ProviderOnboarding.vue')
const ActivateStripeSubscription = () => import('../views/OnboardingPages/StripeSubscriptionOnboarding.vue')
const ProviderAwaitingVerification = () => import('../views/OnboardingPages/ProviderAwaitingVerification.vue')
const OnboardingRouter = () => import('../views/OnboardingPages/OnboardingRouter.vue')
const ActivateStripeConnect = () => import('../views/OnboardingPages/StripeConnectOnboarding.vue')

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
            default: () => import('../components/FacebookOAuthCallback.vue'),
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
    {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('@/views/EmbeddedCheckOut.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/checkout/success',
        name: 'CheckoutSuccess',
        meta: {requiresAuth: true},
        component: () => import('../views/CheckOutSuccess.vue')
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
        path: '/onboarding/activate-stripe-subscription',
        name: 'activate-stripe-subscription',
        meta: {requiresAuth: true, requiredRoles: ['provider'], isProviderOnly: true},
        components: {
            default: ActivateStripeSubscription,
            TopNavBar,
            FooterPage,
        },
    },
    {
        path: '/activate-stripe-connect',
        name: 'activate-stripe-connect',
        meta: {requiresAuth: true, isProviderOnly: true},
        components: {
            default: ActivateStripeConnect,
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
    {
    path: '/coming-soon',
    name: 'ComingSoon',
    components: {
        default: () => import('../views/ComingSoonPage.vue'),
        TopNavBar,
        // FooterPage,
    },
    meta: { requiresAuth: false },
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


import type {User} from '@/types/User'
import type {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {useAuthStore} from '@/stores/authStore';

// Define types for your route meta
declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean;
        requiredRoles?: string[];
        isProviderOnly?: boolean;
        isSeekerOnly?: boolean;
    }
}

// router/index.ts - UPDATED Router Guard Logic

// router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//     console.group('Router Guard Check');
//     console.log(`Navigating from: ${from.fullPath} to: ${to.fullPath}`);
//
//     // Get Pinia store instance
//     const authStore = useAuthStore();
//
//     // Debugging current token and user state
//     const tokenFromGetterCheck = !!localStorage.getItem('token');
//     const userFromGetterCheck = !!authStore.user;
//     console.log(`DEBUG: Token exists: ${tokenFromGetterCheck}`);
//     console.log(`DEBUG: User in store: ${userFromGetterCheck}`);
//
//     const isAuthenticated = authStore.isAuthenticated;
//     let currentUser: User | null = authStore.user;
//     const tokenInLocalStorage = localStorage.getItem('token');
//
//     console.log(`Guard sees - isAuthenticated: ${isAuthenticated}`);
//     console.log(`Guard sees - state.user is present: ${!!currentUser}`);
//
//     // Define public routes for easier checks
//     const AUTH_ROUTES = ['Login', 'Signup', 'GoogleOAuthCallback', 'FacebookOAuthCallback', 'ResetPassword'];
//     const PUBLIC_ROUTES = ['VerifyEmail', 'ForgotPassword', 'ResetPassword', ...AUTH_ROUTES];
//
//     const UNVERIFIED_EMAIL_ROUTE_NAME = 'CheckEmail';
//     const BASIC_PROFILE_ROUTE_NAME = 'complete-profile';
//     const PROVIDER_ONBOARDING_ROUTE_NAME = 'provider-onboarding-details';
//     const ACTIVATE_STRIPE_SUBSCRIPTION_ROUTE_NAME = 'activate-stripe-subscription';
//     const ACTIVATE_STRIPE_CONNECT_ROUTE_NAME = 'activate-stripe-connect';
//     const ONBOARDING_CHOICE_ROUTE_NAME = 'onboarding-choice';
//     const PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME = 'awaiting-verification';
//
//     // --- IMPORTANT: Initial User Data Fetching/Re-authentication ---
//     if (tokenInLocalStorage && !currentUser) {
//         try {
//             console.log("Guard: Token found, but store.user is null. Dispatching 'viewUser'.");
//             await authStore.viewUser();
//             currentUser = authStore.user;
//             console.log("Guard: 'viewUser' successful. New currentUser state:", currentUser);
//         } catch (error) {
//             console.warn("Guard: 'viewUser' failed. Clearing user and redirecting to login:", error);
//             await authStore.clearUser();
//             if (to.meta.requiresAuth && !PUBLIC_ROUTES.includes(to.name as string)) {
//                 console.groupEnd();
//                 return next({name: 'Login', query: {redirect: to.fullPath}});
//             }
//             console.groupEnd();
//             return next();
//         }
//     }
//
//     // --- Get Fresh State After Potential Re-authentication ---
//     const currentIsLoggedIn = authStore.isAuthenticated;
//     const isEmailVerified = currentUser?.is_verified === true;
//     const isProvisional = currentUser?.is_provisional === true;
//     const isBasicProfileComplete = currentUser?.onboarding_status?.basic_complete === true;
//     const isProviderOnboardingComplete = currentUser?.onboarding_status?.provider_onboarding_complete === true;
//     const isStripeActivateSubscriptionComplete = currentUser?.onboarding_status?.stripe_activate_subscription_complete === true;
//     const isStripeActivateConnectComplete = currentUser?.onboarding_status?.stripe_activate_connect_complete === true;
//     const hasStripeConnectAccount = !!currentUser?.stripe_connect_account_id;
//     const userRoles = currentUser?.roles || [];
//     const isUserSeeker = userRoles.includes('user');
//     const isUserProvider = userRoles.includes('provider');
//
//     // --- Status Checks ---
//     const stripeProviderStatus = currentUser?.stripe_provider_status;
//
//     const isProviderActive = stripeProviderStatus === 'active';
//     const isProviderConnectVerificationPending = stripeProviderStatus === 'connect_verification_pending';
//     const isProviderRejected = stripeProviderStatus === 'rejected';
//
//     console.log(`Guard (Post-viewUser) - currentIsLoggedIn: ${currentIsLoggedIn}`);
//     console.log(`Guard (Post-viewUser) - isEmailVerified: ${isEmailVerified}`);
//     console.log(`Guard (Post-viewUser) - isProvisional: ${isProvisional}`);
//     console.log(`Guard (Post-viewUser) - isBasicProfileComplete: ${isBasicProfileComplete}`);
//     console.log(`Guard (Post-viewUser) - isProviderOnboardingComplete: ${isProviderOnboardingComplete}`);
//     console.log(`Guard (Post-viewUser) - isStripeActivateSubscriptionComplete: ${isStripeActivateSubscriptionComplete}`);
//     console.log(`Guard (Post-viewUser) - hasStripeConnectAccount: ${hasStripeConnectAccount}`);
//     console.log(`Guard (Post-viewUser) - isStripeActivateConnectComplete: ${isStripeActivateConnectComplete}`);
//     console.log(`Guard (Post-viewUser) - isUserSeeker: ${isUserSeeker}`);
//     console.log(`Guard (Post-viewUser) - isUserProvider: ${isUserProvider}`);
//     console.log(`Guard (Post-viewUser) - stripeProviderStatus: ${stripeProviderStatus}`);
//     console.log(`Guard (Post-viewUser) - isProviderActive: ${isProviderActive}`);
//     console.log(`Guard (Post-viewUser) - isProviderConnectVerificationPending: ${isProviderConnectVerificationPending}`);
//     console.log(`Guard (Post-viewUser) - isProviderRejected: ${isProviderRejected}`);
//
//     // --- Core Logic for Redirection ---
//
//     // A. If the route requires authentication but the user is not logged in.
//     if (to.meta.requiresAuth && !currentIsLoggedIn) {
//         if (!PUBLIC_ROUTES.includes(to.name as string)) {
//             console.log(`Guard: Route ${to.fullPath} requires auth, but user not logged in. Redirecting to Login.`);
//             console.groupEnd();
//             return next({name: 'Login', query: {redirect: to.fullPath}});
//         }
//         console.groupEnd();
//         return next();
//     }
//
//     // B. If the user is logged in and trying to access login/signup pages directly.
//     if (currentIsLoggedIn && AUTH_ROUTES.includes(to.name as string)) {
//         if (to.name === 'Login' || to.name === 'Signup' || to.name === 'ResetPassword') {
//             console.log(`Guard: Logged in user trying to access auth page directly. Redirecting based on onboarding state.`);
//             if (isProvisional) {
//                 console.groupEnd();
//                 return next({name: ONBOARDING_CHOICE_ROUTE_NAME});
//             } else {
//                 console.groupEnd();
//                 return next({name: isUserProvider ? 'ProviderDashboard' : 'SeekerDashboard'});
//             }
//         }
//         if (to.name === 'GoogleOAuthCallback' || to.name === 'FacebookOAuthCallback') {
//             console.log(`Guard: Allowing OAuth callback for ${to.name}, component will handle redirect.`);
//             console.groupEnd();
//             return next();
//         }
//     }
//
//     // C & D. Email Verification and Provisional Status Onboarding
//     if (currentIsLoggedIn && currentUser) {
//         // C. Email Verification
//         if (!isEmailVerified && to.name !== UNVERIFIED_EMAIL_ROUTE_NAME) {
//             console.log(`Guard: User ${currentUser.email} not email verified. Redirecting to ${UNVERIFIED_EMAIL_ROUTE_NAME}.`);
//             console.groupEnd();
//             return next({name: UNVERIFIED_EMAIL_ROUTE_NAME});
//         }
//
//         if (isEmailVerified && to.name === UNVERIFIED_EMAIL_ROUTE_NAME) {
//             console.log(`Guard: User ${currentUser.email} email verified, trying to access CheckEmail. Redirecting to appropriate next step.`);
//             if (isProvisional) {
//                 console.groupEnd();
//                 return next({name: ONBOARDING_CHOICE_ROUTE_NAME});
//             }
//             if (isUserProvider) {
//                 if (!isBasicProfileComplete) {
//                     console.groupEnd();
//                     return next({name: BASIC_PROFILE_ROUTE_NAME});
//                 }
//                 if (!isProviderOnboardingComplete) {
//                     console.groupEnd();
//                     return next({name: PROVIDER_ONBOARDING_ROUTE_NAME});
//                 }
//                 if (!isStripeActivateSubscriptionComplete) {
//                     console.groupEnd();
//                     return next({name: ACTIVATE_STRIPE_SUBSCRIPTION_ROUTE_NAME});
//                 }
//                 // ✅ NEW: If they have Connect account + pending status, send to awaiting page
//                 if (hasStripeConnectAccount && isProviderConnectVerificationPending) {
//                     console.groupEnd();
//                     return next({name: PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME});
//                 }
//                 // ✅ NEW: If subscription complete but no Connect account, send to Connect setup
//                 if (!hasStripeConnectAccount) {
//                     console.groupEnd();
//                     return next({name: ACTIVATE_STRIPE_CONNECT_ROUTE_NAME});
//                 }
//                 if (isProviderActive) {
//                     console.groupEnd();
//                     return next({name: 'ProviderDashboard'});
//                 }
//             }
//             console.groupEnd();
//             return next({name: 'SeekerDashboard'});
//         }
//
//         // D. Provisional Status / Onboarding Choice Gate
//         if (isEmailVerified && isProvisional) {
//             if (to.name !== ONBOARDING_CHOICE_ROUTE_NAME) {
//                 console.log(`Guard: User ${currentUser.email} is email verified and provisional. Redirecting to ${ONBOARDING_CHOICE_ROUTE_NAME}.`);
//                 console.groupEnd();
//                 return next({name: ONBOARDING_CHOICE_ROUTE_NAME});
//             }
//             console.log(`Guard: User ${currentUser.email} is provisional and navigating to ${ONBOARDING_CHOICE_ROUTE_NAME}. Allowing.`);
//             console.groupEnd();
//             return next();
//         }
//
//         if (isEmailVerified && !isProvisional && to.name === ONBOARDING_CHOICE_ROUTE_NAME) {
//             console.log(`Guard: User ${currentUser.email} is no longer provisional, trying to access ${ONBOARDING_CHOICE_ROUTE_NAME}. Redirecting.`);
//             if (isUserProvider) {
//                 if (!isBasicProfileComplete) {
//                     console.groupEnd();
//                     return next({name: BASIC_PROFILE_ROUTE_NAME});
//                 }
//                 if (!isProviderOnboardingComplete) {
//                     console.groupEnd();
//                     return next({name: PROVIDER_ONBOARDING_ROUTE_NAME});
//                 }
//                 if (!isStripeActivateSubscriptionComplete) {
//                     console.groupEnd();
//                     return next({name: ACTIVATE_STRIPE_SUBSCRIPTION_ROUTE_NAME});
//                 }
//                 // ✅ NEW: Check for Connect account status
//                 if (hasStripeConnectAccount && isProviderConnectVerificationPending) {
//                     console.groupEnd();
//                     return next({name: PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME});
//                 }
//                 if (!hasStripeConnectAccount) {
//                     console.groupEnd();
//                     return next({name: ACTIVATE_STRIPE_CONNECT_ROUTE_NAME});
//                 }
//                 if (isProviderActive) {
//                     console.groupEnd();
//                     return next({name: 'ProviderDashboard'});
//                 }
//             }
//             console.groupEnd();
//             return next({name: 'SeekerDashboard'});
//         }
//
//         // --- Role-Specific Onboarding Funnels ---
//         if (isEmailVerified && !isProvisional) {
//             // F. Provider-Specific Onboarding Steps
//             if (isUserProvider) {
//                 const isProviderRouteAttempt = to.meta.isProviderOnly === true;
//
//                 // Onboarding Check 1: Basic Profile Completion
//                 if (!isBasicProfileComplete) {
//                     if (to.name !== BASIC_PROFILE_ROUTE_NAME) {
//                         console.log(`Guard: Provider ${currentUser.email} needs to complete basic profile. Redirecting to ${BASIC_PROFILE_ROUTE_NAME}.`);
//                         console.groupEnd();
//                         return next({name: BASIC_PROFILE_ROUTE_NAME});
//                     }
//                     console.log(`Guard: Provider ${currentUser.email} is on basic profile page and it's incomplete. Allowing.`);
//                     console.groupEnd();
//                     return next();
//                 }
//
//                 // Onboarding Check 2: Provider Onboarding Details
//                 if (isBasicProfileComplete && !isProviderOnboardingComplete) {
//                     if (to.name !== PROVIDER_ONBOARDING_ROUTE_NAME) {
//                         console.log(`Guard: Provider ${currentUser.email} basic profile complete but missing provider details. Redirecting to ${PROVIDER_ONBOARDING_ROUTE_NAME}.`);
//                         console.groupEnd();
//                         return next({name: PROVIDER_ONBOARDING_ROUTE_NAME});
//                     }
//                     console.log(`Guard: Provider ${currentUser.email} is on provider onboarding page and it's incomplete. Allowing.`);
//                     console.groupEnd();
//                     return next();
//                 }
//
//                 // Onboarding Check 3: Stripe Subscription Activation
//                 if (isProviderOnboardingComplete && !isStripeActivateSubscriptionComplete) {
//                     if (to.name !== ACTIVATE_STRIPE_SUBSCRIPTION_ROUTE_NAME) {
//                         console.log(`Guard: Provider ${currentUser.email} provider onboarding complete but subscription incomplete. Redirecting to ${ACTIVATE_STRIPE_SUBSCRIPTION_ROUTE_NAME}.`);
//                         console.groupEnd();
//                         return next({name: ACTIVATE_STRIPE_SUBSCRIPTION_ROUTE_NAME});
//                     }
//                     console.log(`Guard: Provider ${currentUser.email} is on subscription setup page. Allowing.`);
//                     console.groupEnd();
//                     return next();
//                 }
//
//                 // ✅ Onboarding Check 4: Stripe Connect Setup (NEW LOGIC)
//                 if (isStripeActivateSubscriptionComplete) {
//
//                     // 4a. No Connect account exists yet - send to Connect setup page
//                     if (!hasStripeConnectAccount) {
//                         if (to.name !== ACTIVATE_STRIPE_CONNECT_ROUTE_NAME) {
//                             console.log(`Guard: Provider ${currentUser.email} needs to initiate Stripe Connect. Redirecting to ${ACTIVATE_STRIPE_CONNECT_ROUTE_NAME}.`);
//                             console.groupEnd();
//                             return next({name: ACTIVATE_STRIPE_CONNECT_ROUTE_NAME});
//                         }
//                         console.log(`Guard: Provider ${currentUser.email} on Stripe Connect setup page. Allowing.`);
//                         console.groupEnd();
//                         return next();
//                     }
//
//                     // 4b. Connect account exists + verification pending - send to awaiting page
//                     if (hasStripeConnectAccount && isProviderConnectVerificationPending) {
//                         // Allow them to stay on awaiting verification page
//                         if (to.name === PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME) {
//                             console.log(`Guard: Provider ${currentUser.email} on awaiting verification page. Allowing.`);
//                             console.groupEnd();
//                             return next();
//                         }
//
//                         // Block access to provider-only routes until verified
//                         if (isProviderRouteAttempt) {
//                             console.log(`Guard: Provider ${currentUser.email} awaiting verification. Cannot access provider routes. Redirecting to ${PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME}.`);
//                             console.groupEnd();
//                             return next({name: PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME});
//                         }
//
//                         // Redirect away from earlier onboarding steps
//                         if (to.name === BASIC_PROFILE_ROUTE_NAME ||
//                             to.name === PROVIDER_ONBOARDING_ROUTE_NAME ||
//                             to.name === ACTIVATE_STRIPE_SUBSCRIPTION_ROUTE_NAME ||
//                             to.name === ACTIVATE_STRIPE_CONNECT_ROUTE_NAME) {
//                             console.log(`Guard: Provider ${currentUser.email} trying to access completed steps. Redirecting to ${PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME}.`);
//                             console.groupEnd();
//                             return next({name: PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME});
//                         }
//
//                         // Allow non-provider routes (e.g., seeker dashboard)
//                         console.log(`Guard: Pending Provider ${currentUser.email} accessing non-provider route. Allowing.`);
//                         console.groupEnd();
//                         return next();
//                     }
//
//                     // 4c. Handle rejected status
//                     if (isProviderRejected) {
//                         if (to.name !== PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME) {
//                             console.log(`Guard: Provider ${currentUser.email} is rejected. Redirecting to awaiting page.`);
//                             console.groupEnd();
//                             return next({name: PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME});
//                         }
//                         console.log(`Guard: Rejected Provider ${currentUser.email} on awaiting page. Allowing.`);
//                         console.groupEnd();
//                         return next();
//                     }
//                 }
//
//                 // Onboarding Check 5: Active Provider (Final Success State)
//                 if (isProviderActive) {
//                     // Redirect away from onboarding pages to provider dashboard
//                     if (to.name === BASIC_PROFILE_ROUTE_NAME ||
//                         to.name === PROVIDER_ONBOARDING_ROUTE_NAME ||
//                         to.name === ACTIVATE_STRIPE_SUBSCRIPTION_ROUTE_NAME ||
//                         to.name === ACTIVATE_STRIPE_CONNECT_ROUTE_NAME ||
//                         to.name === PROVIDER_AWAITING_VERIFICATION_ROUTE_NAME ||
//                         to.name === 'SeekerDashboard') {
//                         console.log(`Guard: Active Provider ${currentUser.email} trying to access completed onboarding/seeker pages. Redirecting to ProviderDashboard.`);
//                         console.groupEnd();
//                         return next({name: 'ProviderDashboard'});
//                     }
//                     console.log(`Guard: Provider ${currentUser.email} is ACTIVE. Allowing navigation to ${to.fullPath}.`);
//                     console.groupEnd();
//                     return next();
//                 }
//
//                 // Fallback: Allow navigation if no specific condition matched
//                 console.log(`Guard: Provider ${currentUser.email} passed all checks. Allowing navigation.`);
//                 console.groupEnd();
//                 return next();
//             }
//
//             // E. Seeker-Specific Logic
//             if (isUserSeeker && !isUserProvider) {
//                 if (isBasicProfileComplete && to.name === BASIC_PROFILE_ROUTE_NAME) {
//                     console.log(`Guard: Seeker already completed basic profile, redirecting to SeekerDashboard.`);
//                     console.groupEnd();
//                     return next({name: 'SeekerDashboard'});
//                 }
//
//                 if (to.meta.isProviderOnly === true) {
//                     console.log(`Guard: Seeker ${currentUser.email} cannot access provider-only route ${to.fullPath}. Redirecting to SeekerDashboard.`);
//                     console.groupEnd();
//                     return next({name: 'SeekerDashboard'});
//                 }
//
//                 if (to.meta.requiredRoles) {
//                     const hasRequiredRole = to.meta.requiredRoles.some(role => (userRoles as string[]).includes(role));
//                     if (!hasRequiredRole) {
//                         console.log(`Guard: Seeker ${currentUser.email} lacks required roles for ${to.fullPath}. Redirecting to SeekerDashboard.`);
//                         console.groupEnd();
//                         return next({name: 'SeekerDashboard'});
//                     }
//                 }
//
//                 console.log(`Guard: User ${currentUser.email} is a seeker accessing allowed route. Allowing navigation.`);
//                 console.groupEnd();
//                 return next();
//             }
//         }
//     }
//
//     // --- Role-Based Access Control (RBAC) ---
//     if (to.meta.requiredRoles && currentIsLoggedIn && currentUser) {
//         const requiredRoles = to.meta.requiredRoles;
//         const userRoles = currentUser.roles || [];
//         const hasRequiredRole = requiredRoles.some(role => (userRoles as string[]).includes(role));
//
//         if (!hasRequiredRole) {
//             console.log(`Guard: User ${currentUser.email} lacks required roles ${requiredRoles} for ${to.fullPath}. Redirecting.`);
//             console.groupEnd();
//             return next({name: isUserProvider ? 'ProviderDashboard' : 'SeekerDashboard'});
//         }
//     }
//
//     // --- Final Fallback: Allow Navigation ---
//     console.log(`Guard: Allowing final navigation to ${to.fullPath}`);
//     console.groupEnd();
//     next();
// });

router.beforeEach((to, from, next) => {
  // Allow access to the /coming-soon route itself to avoid infinite loops
  if (to.path === '/coming-soon') {
    return next();
  }

  // Redirect everything else
  return next({ path: '/coming-soon' });
});


export default router;