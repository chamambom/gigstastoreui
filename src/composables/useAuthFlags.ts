// src/composables/useAuthFlags.ts

import {computed} from 'vue';
import type {ComputedRef} from 'vue';
import {storeToRefs} from 'pinia';
import {useAuthStore} from '../stores/authStore'; // 👈 Import your new Pinia store
import type {User, OnboardingStatus} from '../types/User';

/**
 * Custom composable to derive comprehensive authentication and user status flags from the Pinia store.
 * @returns An object containing reactive computed references to various user flags.
 */
export function useAuthFlags() {
    // 1. Initialize the Pinia store instance
    const authStore = useAuthStore();

    // 2. Extract necessary state properties and getters using storeToRefs for reactivity.
    // NOTE: This extracts state properties as refs (e.g., user is a ref)
    // and getters as computed properties (e.g., isAuthenticated is a computed ref).
    const {
        currentUser: userRef, // Store getter 'currentUser' is extracted as a ref
        isAuthenticated,
        isVerified,
        isSuper,
        isProvider,
        isSeeker,
        isStripeProviderStatus,
        isProvisional,
    } = storeToRefs(authStore);


    // Use a simpler name for the currentUser reference
    const currentUser: ComputedRef<User | null> = userRef as ComputedRef<User | null>;


    // === Derived Properties for Clarity/Type Safety ===

    // Get the onboarding status object, correctly typed.
    const onboarding: ComputedRef<OnboardingStatus> = computed(
        () => authStore.onboardingStatus // Access the getter directly on the store instance
    );


    // === Onboarding Status Flags ===

    const hasBasicProfile = computed(() => onboarding.value?.basic_complete || false);
    const hasProviderOnboarding = computed(() => onboarding.value?.provider_onboarding_complete || false);
    const hasStripeSubscription = computed(() => onboarding.value?.stripe_activate_subscription_complete || false);
    const hasStripeConnect = computed(() => onboarding.value?.stripe_activate_connect_complete || false);



    // === Provider Status (admin approval & connect readiness) ===

    // The new primary flag for final readiness
    const isProviderActive = computed(() => isProvider.value && isStripeProviderStatus.value === 'active');
    const isProviderPendingConnectVerification = computed(() => isProvider.value && isStripeProviderStatus.value === 'connect_verification_pending');
    const isProviderRejected = computed(() => isProvider.value && isStripeProviderStatus.value === 'rejected');


    // --- ADD NEW FLAG for unverified users ---
    const needsEmailVerification = computed(() => isAuthenticated.value && !isVerified.value);


    // === Dashboard Access Logic ===

    const canAccessProviderDashboard = computed(() =>
        currentUser.value &&
        isAuthenticated.value &&
        isVerified.value &&
        isProvider.value &&
        hasBasicProfile.value &&
        hasProviderOnboarding.value &&
        hasStripeSubscription.value &&
        isProviderActive.value
    );


    const canAccessSeekerDashboard = computed(() =>
        isSeeker.value &&
        isVerified.value &&
        !needsEmailVerification.value
    );

    // === Show “Become a Provider” ===
    const showBecomeProviderCTA = computed(() =>
        currentUser.value &&
        isAuthenticated.value &&
        isSeeker.value &&
        !isProvider.value &&
        !needsEmailVerification.value &&
        !isProvisional.value
    );

    const isAwaitingProviderApproval = computed(() =>
        currentUser.value &&
        isAuthenticated.value &&
        isProvider.value
        // // (providerStatus.value === 'pending' || providerStatus.value === 'rejected')
        // (isProviderPendingConnectVerificationAdmin.value || isProviderRejected.value || isProviderPendingConnectVerificationConnectVerification.value)
    );


    // === Flags to help in route guards or conditionals ===
    const needsBasicProfile = computed(() => isAuthenticated.value && !hasBasicProfile.value);
    const needsProviderOnboarding = computed(() => isProvider.value && !hasProviderOnboarding.value);
    const needsBillingSetup = computed(() => isProvider.value && !hasStripeSubscription.value);


    return {
        // Core User State
        currentUser,
        isLoggedIn: isAuthenticated, // Rename isAuthenticated back to isLoggedIn for component consistency

        // Role Flags
        isProvider,
        isSeeker,
        isProvisional,
        isSuper,
        isVerified,

        // Onboarding Flags
        hasBasicProfile,
        hasProviderOnboarding,
        hasStripeSubscription,

        // Provider Status Flags (UPDATED)
        isProviderActive,         // New/Replaced primary check
        isProviderPendingConnectVerification,     // New check for Connect progress
        isProviderRejected,

        // Access Control
        canAccessProviderDashboard,
        canAccessSeekerDashboard,

        // Conditional UI
        showBecomeProviderCTA,


        // Onboarding Flow Helpers
        needsBasicProfile,
        needsProviderOnboarding,
        needsBillingSetup,
        isAwaitingProviderApproval,

        needsEmailVerification,
    };
}