<!-- ActivateStripeConnect.vue - UPDATED with refresh detection -->
<template>
  <div class="container mx-auto p-4 md:p-8">
    <div class="card bg-base-100 shadow-xl rounded-box border border-base-200">
      <div class="card-body">
        <!-- Header Section -->
        <div class="flex flex-col items-center text-center mb-6">
          <div class="avatar placeholder mb-4">
            <div class="bg-orange-400 text-white rounded-full w-16 h-16" aria-hidden="true">
              <span class="text-2xl">💳</span>
            </div>
          </div>
          <h2 class="text-3xl font-bold text-base-content mb-2">Payment Account Setup</h2>
          <p class="text-lg text-base-content/60 max-w-md">
            Connect your bank account to receive payments from customers
          </p>

          <!-- Progress Indicator -->
          <div class="steps steps-horizontal mt-6">
            <div class="step step-primary">1. Seller Setup</div>
            <div class="step step-primary">2. Stripe Subscription</div>
            <div class="step step-primary">3. Stripe Connect Payout Setup</div>
            <div class="step">4. Awaiting Verification</div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Main Content -->
        <div class="max-w-4xl mx-auto w-full">
          <div class="flex items-center mb-6">
            <div
                class="flex-shrink-0 w-10 h-10 bg-orange-400 text-white rounded-full flex items-center justify-center mr-4"
                aria-hidden="true"
            >
              <span class="font-semibold">3</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-base-content">Connect Your Bank Account</h3>
              <p class="text-base-content/70">Securely powered by Stripe - your information is encrypted</p>
            </div>
          </div>

          <!-- Info Card -->
          <div class="card bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 mb-6">
            <div class="card-body p-6">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-blue-900 dark:text-blue-300 mb-2">What you will need:</h4>
                  <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                    <li class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"/>
                      </svg>
                      Your business details (already provided ✓)
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"/>
                      </svg>
                      Personal identification (Driver License or Passport)
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"/>
                      </svg>
                      Bank account details (BSB and Account Number)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- ✅ Already Started Alert (shows if user returns after starting) -->
          <div v-if="hasExistingAccount && !isLoading"
               class="alert alert-info bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 text-blue-600" fill="none"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <h3 class="font-bold text-blue-700 dark:text-blue-300">Setup In Progress</h3>
              <div class="text-sm text-blue-600 dark:text-blue-300">
                You have already started your Stripe Connect setup. The form below will continue where you left off.
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="card bg-base-200/30 shadow-sm border border-base-300">
            <div class="card-body p-12 text-center">
              <span class="loading loading-spinner loading-lg text-orange-400 mx-auto" aria-hidden="true"></span>
              <p class="text-base-content/60 mt-4">Loading secure payment setup...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="space-y-4">
            <div class="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                   viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <h3 class="font-bold">Setup Error</h3>
                <div class="text-sm">{{ error }}</div>
              </div>
            </div>
            <div class="flex gap-3 justify-center">
              <button @click="initializeStripe" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Try Again
              </button>
              <button @click="skipToAwaiting" class="btn btn-ghost">Complete Later</button>
            </div>
          </div>

          <!-- ✅ Embedded Stripe Connect Container -->
          <div v-else id="stripe-connect-container"
               class="card bg-base-100 shadow-sm border border-base-300 overflow-hidden"
               style="min-height: 600px;">
            <!-- Stripe will mount itself as a child of this element -->
          </div>

          <!-- Help Section -->
          <div class="card bg-base-200/30 shadow-sm border border-base-300 mt-6">
            <div class="card-body p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span class="text-sm font-medium text-base-content">Your information is encrypted and secure</span>
                </div>
                <a href="mailto:support@gigsta.co.nz" class="text-sm text-orange-400 hover:text-orange-500 font-medium">
                  Need help? Contact support →
                </a>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="card-actions justify-between pt-6">
            <button type="button" @click="goBack" class="btn btn-ghost text-base-content">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back
            </button>

            <button type="button" @click="skipToAwaiting" class="btn btn-outline border-base-300 hover:bg-base-200">
              Complete Later
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick, onBeforeUnmount} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/authStore'
import {loadConnectAndInitialize} from '@stripe/connect-js'
import type {StripeConnectInstance} from '@stripe/connect-js'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(true)
const error = ref<string | null>(null)
const hasExistingAccount = ref(false)

// Keep top-level refs so cleanup can access them
let stripeInstance: StripeConnectInstance | any = null
let accountOnboarding: any = null
let hasSubmitted = ref(false) // Track if form was submitted


onMounted(async () => {
  const user = authStore.user

  // ✅ Safety check: If already verified, redirect to dashboard
  if (user?.stripe_provider_status === 'active') {
    router.push('/provider-dashboard')
    return
  }

  // ✅ Check if user has existing Connect account
  hasExistingAccount.value = !!user?.stripe_connect_account_id

  await initializeStripe()
})

onBeforeUnmount(() => {
  cleanup()
})

const initializeStripe = async () => {
  try {
    isLoading.value = true
    error.value = null

    const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/onboarding/initiate-payouts-embedded`,
        {}
    )
    console.log('✅ Received Stripe config')

    if (!res?.data?.publishable_key || !res?.data?.client_secret) {
      throw new Error('Missing Stripe publishable key or client secret from backend')
    }

    // Initialize Stripe Connect (assign to top-level stripeInstance)
    stripeInstance = await loadConnectAndInitialize({
      publishableKey: res.data.publishable_key,
      fetchClientSecret: async () => res.data.client_secret,
      appearance: {
        variables: {
          colorPrimary: '#fb923c',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          borderRadius: '12px',
          spacingUnit: '12px'
        }
      }
    })

    console.log('✅ Stripe Connect initialized')

    isLoading.value = false
    // Ensure DOM is updated so v-else container is present
    await nextTick()

    const container = document.getElementById('stripe-connect-container')
    if (!container) throw new Error('Stripe Connect container not found')

    // Keep reference for cleanup
    accountOnboarding = stripeInstance.create('account-onboarding')

// ✅ FIX: Attach ALL event handlers
    if (typeof accountOnboarding.on === 'function') {
      accountOnboarding.on('complete', handleComplete)
      accountOnboarding.on('exit', handleExit)

      // ✅ NEW: Listen for submission events (when user clicks submit)
      accountOnboarding.on('submit', handleSubmit)
    }

    container.innerHTML = '' // Clear any stale content
    container.appendChild(accountOnboarding)

    console.log('✅ Embedded onboarding mounted')
  } catch (err: any) {
    console.error('❌ Failed to initialize Stripe:', err)
    error.value = err?.response?.data?.detail || err?.message || 'Failed to initialize Stripe onboarding'
    isLoading.value = false
  } finally {
    // Make sure spinner hides once we attempted initialization
    isLoading.value = false
  }
}

// ✅ NEW: Handle form submission (when they click "Submit" in Stripe form)
const handleSubmit = () => {
  console.log('📝 User submitted Stripe Connect form')
  hasSubmitted.value = true

  // Give Stripe a moment to process, then redirect
  setTimeout(async () => {
    console.log('✅ Redirecting to awaiting verification after submission')
    await authStore.viewUser()
    router.push('/awaiting-verification')
  }, 2000)
}

const handleComplete = async () => {
  console.log('✅ Stripe Connect onboarding completed')
  await authStore.viewUser()
  router.push('/awaiting-verification')
}

const handleExit = async () => {
  console.log('⚠️ User exited Stripe onboarding')
  // ✅ FIX: Always redirect to awaiting verification page
  // whether they completed, exited, or submitted
  await authStore.viewUser()
  router.push('/awaiting-verification')
}

const skipToAwaiting = () => {
  router.push('/awaiting-verification')
}

const goBack = () => {
  router.push('/activate-stripe-subscription')
}

const cleanup = () => {
  try {
    if (accountOnboarding) {
      accountOnboarding.off?.('complete', handleComplete)
      accountOnboarding.off?.('exit', handleExit)
      accountOnboarding.off?.('submit', handleSubmit)
      accountOnboarding.unmount?.()
      accountOnboarding = null
    }
    stripeInstance = null
  } catch (err) {
    console.warn('Cleanup error:', err)
  }
}
</script>