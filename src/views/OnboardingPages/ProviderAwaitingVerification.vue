<!-- AwaitingVerification.vue - FIXED: Modal z-index, button state, cleanup -->
<template>
  <div class="card bg-base-100 shadow-xl rounded-box border border-base-200 max-w-2xl mx-auto">
    <div class="card-body">
      <div class="flex flex-col items-center text-center mb-6">
        <div class="avatar placeholder mb-4">
          <div class="bg-orange-400 text-white rounded-full w-20 h-20">
            <img src="../../assets/images/banner.png" alt="GigSta Logo" class="w-12 h-12" />
          </div>
        </div>

        <h2 class="text-3xl font-bold text-base-content mb-2">Verification in Progress</h2>
        <p class="text-lg text-base-content/60 max-w-md leading-relaxed">
          Your setup is complete. We are now awaiting final compliance verification from Stripe.
        </p>
      </div>

      <div class="divider"></div>

      <div class="card bg-base-200/30 shadow-sm border border-base-300 mb-6">
        <div class="card-body p-6 text-center">
          <div class="flex flex-col items-center space-y-4">
            <div class="flex items-center gap-2">
              <span v-if="checkingStatus" class="badge badge-primary bg-orange-400 border-orange-400 text-white">
                <span class="loading loading-spinner loading-xs mr-2"></span>
                Checking Status...
              </span>
              <span v-else class="badge badge-outline badge-info border-blue-400 text-blue-600">
                Verification Pending
              </span>
            </div>

            <div v-if="timeWaitingMinutes > 0" class="text-sm text-base-content/60">
              Verification initiated {{ timeWaitingMinutes }} minute{{ timeWaitingMinutes !== 1 ? 's' : '' }} ago
            </div>

            <div class="max-w-md">
              <h3 class="text-xl font-semibold text-base-content mb-2">Compliance Check in Progress</h3>
              <p class="text-base-content/70 text-sm leading-relaxed">
                Stripe is currently verifying your account details (KYC, bank information) for compliance.
                This usually takes a few minutes, but can take longer if additional details are required.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ✅ Show Resume Button if verification is taking too long -->
      <div v-if="shouldShowResumeButton" class="alert alert-warning bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <h3 class="font-bold text-yellow-700 dark:text-yellow-300">Additional Information Needed?</h3>
          <div class="text-sm text-yellow-600 dark:text-yellow-300">
            If you closed the Stripe setup before completing it, or if Stripe needs more information, click below to resume.
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-sm border border-base-300 mb-6">
        <div class="card-body p-6">
          <h4 class="text-lg font-semibold text-base-content mb-4 text-center">Verification Steps</h4>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <span class="loading loading-spinner loading-xs text-orange-600"></span>
              </div>
              <div class="flex-1">
                <p class="font-medium text-base-content">KYC & Identity Verification</p>
                <p class="text-sm text-base-content/60">Stripe confirming legal identity and Know Your Customer (KYC) details.</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <span class="loading loading-spinner loading-xs text-orange-600"></span>
              </div>
              <div class="flex-1">
                <p class="font-medium text-base-content">Bank Account Link & Payouts</p>
                <p class="text-sm text-base-content/60">Final check on bank account link to enable payouts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center space-y-4">
        <button
          class="btn bg-orange-400 hover:bg-orange-500 border-orange-400 text-white shadow-lg px-8"
          :disabled="checkingStatus"
          @click="checkApproval"
        >
          <span v-if="checkingStatus" class="loading loading-spinner loading-sm mr-2"></span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          {{ checkingStatus ? 'Checking Status...' : 'Refresh Status' }}
        </button>

        <!-- ✅ Resume Button (conditionally shown) -->
        <button
          v-if="shouldShowResumeButton"
          class="btn btn-outline border-orange-400 text-orange-600 hover:bg-orange-50 px-8"
          :disabled="isResumingStripe || isLoadingResume"
          @click="openResumeModal"
        >
          <span v-if="isResumingStripe || isLoadingResume" class="loading loading-spinner loading-sm mr-2"></span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ (isResumingStripe || isLoadingResume) ? 'Loading...' : 'Resume Stripe Setup' }}
        </button>

        <button
          class="btn btn-ghost border-base-300 text-blue-600 hover:bg-base-200 px-8"
          :disabled="isForcingCheck"
          @click="forceStatusCheck"
        >
          <span v-if="isForcingCheck" class="loading loading-spinner loading-sm mr-2"></span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          {{ isForcingCheck ? 'Syncing with Stripe...' : 'Force Stripe Status Update' }}
        </button>

        <div class="text-xs text-gray-500 max-w-md mx-auto">
          <i class="fas fa-info-circle mr-1"></i>
          Use "Force Stripe Status Update" if verification is taking longer than expected.
        </div>
      </div>
    </div>

    <!-- ✅ RESUME MODAL - FIXED: Higher z-index, proper cleanup, submit handler -->
    <dialog ref="resumeModal" class="modal" style="z-index: 9999;">
      <div class="modal-box max-w-4xl w-full" style="z-index: 10000;">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-lg text-base-content">Resume Stripe Connect Setup</h3>
          <button
            class="btn btn-sm btn-circle btn-ghost"
            @click="closeResumeModal"
            :disabled="isLoadingResume"
          >✕</button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoadingResume" class="flex flex-col items-center justify-center py-12">
          <span class="loading loading-spinner loading-lg text-orange-400"></span>
          <p class="text-base-content/60 mt-4">Loading Stripe onboarding...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="resumeError" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <h3 class="font-bold">Failed to load Stripe</h3>
            <div class="text-sm">{{ resumeError }}</div>
          </div>
        </div>

        <!-- ✅ Embedded Stripe Connect Container -->
        <div v-else id="stripe-resume-container" class="min-h-[500px] rounded-lg border border-base-300" style="position: relative; z-index: 10001;"></div>

        <div class="modal-action">
          <button
            class="btn btn-ghost"
            @click="closeResumeModal"
            :disabled="isLoadingResume"
          >Close</button>
        </div>
      </div>
      <!-- ✅ FIX: Remove backdrop click to close - prevents accidental closure -->
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.ts'
import { loadConnectAndInitialize } from '@stripe/connect-js'
import type { StripeConnectInstance } from '@stripe/connect-js'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const checkingStatus = ref(false)
const showToast = ref(false)
const fallbackTriggered = ref(false)
const isResumingStripe = ref(false)
const isForcingCheck = ref(false)
const isLoadingResume = ref(false)
const resumeError = ref<string | null>(null)
const modalIsOpen = ref(false) // ✅ Track modal open state

const resumeModal = ref<HTMLDialogElement | null>(null)

let intervalId: number | null = null
let fallbackTimer: number | null = null
let stripeResumeInstance: StripeConnectInstance | any = null
let accountOnboardingResume: any = null

// Calculate time waiting in minutes
const timeWaitingMinutes = computed(() => {
  const user = authStore.user
  if (!user?.onboarding_status?.stripe_connect_initiated_at) return 0

  const initiatedAt = new Date(user.onboarding_status.stripe_connect_initiated_at)
  const now = new Date()
  return Math.floor((now.getTime() - initiatedAt.getTime()) / 1000 / 60)
})

// Check if user needs to complete Stripe onboarding
const needsStripeCompletion = computed(() => {
  const user = authStore.user
  return user?.stripe_provider_status === 'connect_verification_pending' &&
         user?.stripe_connect_account_id
})

// Show resume button after 1 minute (changed from 5 for testing)
const shouldShowResumeButton = computed(() => {
  return needsStripeCompletion.value && timeWaitingMinutes.value >= 1
})

// Check approval status (refreshes user from store)
const checkApproval = async () => {
  checkingStatus.value = true
  try {
    await authStore.viewUser()
    const currentUser = authStore.user
    const isApproved = currentUser?.stripe_provider_status === 'active'

    if (isApproved) {
      showToast.value = true
      if (intervalId) clearInterval(intervalId)
      if (fallbackTimer) clearTimeout(fallbackTimer)

      setTimeout(() => {
        router.push('/provider-dashboard')
      }, 1500)
    }
  } catch (err) {
    console.error('Failed to check approval status:', err)
  } finally {
    checkingStatus.value = false
  }
}

// Force Stripe status check
const forceStatusCheck = async () => {
  isForcingCheck.value = true
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const token = localStorage.getItem('token')

    const res = await axios.post(
      `${API_BASE_URL}/api/v1/user/onboarding/check-connect-status`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    authStore.setUser(res.data)

    if (res.data.stripe_provider_status === 'active') {
      showToast.value = true
      if (intervalId) clearInterval(intervalId)
      if (fallbackTimer) clearTimeout(fallbackTimer)

      setTimeout(() => {
        router.push('/provider-dashboard')
      }, 1500)
    } else {
      alert('Status checked! Your account is still being verified by Stripe. We will notify you once it is ready.')
    }
  } catch (error: any) {
    console.error('Failed to force status check:', error)
    const errorMsg = error.response?.data?.detail || 'Failed to check Stripe status. Please try again.'
    alert(errorMsg)
  } finally {
    isForcingCheck.value = false
  }
}

// ✅ FIXED: Open Resume Modal with proper cleanup first
const openResumeModal = async () => {
  if (!resumeModal.value) {
    console.error('Resume modal ref not found')
    return
  }

  // ✅ FIX #1: Clean up any existing Stripe instance BEFORE opening modal
  if (stripeResumeInstance || accountOnboardingResume) {
    console.log('🧹 Cleaning up previous Stripe instance before opening modal')
    cleanupStripeInstance()
  }

  // Reset all state
  isLoadingResume.value = true
  resumeError.value = null
  isResumingStripe.value = true
  modalIsOpen.value = true

  // Open modal
  resumeModal.value.showModal()

  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const token = localStorage.getItem('token')

    console.log('📞 Calling resume-stripe-connect-embedded endpoint')

    // Call new embedded resume endpoint
    const res = await axios.post(
      `${API_BASE_URL}/api/v1/user/onboarding/resume-stripe-connect-embedded`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    // Handle already verified case
    if (res.data.status === 'already_verified') {
      alert('Great news! Your account is already verified.')
      await authStore.viewUser()
      closeResumeModal()
      router.push('/provider-dashboard')
      return
    }

    console.log('✅ Received resume client_secret')

    // Initialize Stripe with new client_secret
    stripeResumeInstance = await loadConnectAndInitialize({
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

    console.log('✅ Stripe Connect instance created')

    isLoadingResume.value = false
    await nextTick()

    const container = document.getElementById('stripe-resume-container')
    if (!container) {
      throw new Error('Resume container not found in DOM')
    }

    accountOnboardingResume = stripeResumeInstance.create('account-onboarding')

    // ✅ FIX #2: Attach ALL event handlers including submit
    if (typeof accountOnboardingResume.on === 'function') {
      accountOnboardingResume.on('complete', handleResumeComplete)
      accountOnboardingResume.on('exit', handleResumeExit)
      accountOnboardingResume.on('submit', handleResumeSubmit) // ✅ NEW
      console.log('✅ Event handlers attached')
    }

    container.innerHTML = ''
    container.appendChild(accountOnboardingResume)

    console.log('✅ Resume embedded onboarding mounted in modal')
  } catch (error: any) {
    console.error('❌ Failed to load resume Stripe:', error)
    resumeError.value = error.response?.data?.detail || error.message || 'Failed to load Stripe. Please try again.'
    isLoadingResume.value = false
  } finally {
    isResumingStripe.value = false
  }
}

// ✅ NEW: Handle form submission in resume modal
const handleResumeSubmit = () => {
  console.log('📝 User submitted form in resume modal')
  // Don't close modal yet - let them complete document verification
}

// ✅ Handle Resume Complete
const handleResumeComplete = async () => {
  console.log('✅ Stripe Connect resumed and completed')
  await authStore.viewUser()
  closeResumeModal()

  // Trigger immediate status check
  setTimeout(async () => {
    await checkApproval()
  }, 1000)
}

// ✅ Handle Resume Exit
const handleResumeExit = async () => {
  console.log('⚠️ User exited resume onboarding')
  await authStore.viewUser()
  closeResumeModal()
}

// ✅ FIX #3: Separate cleanup function
const cleanupStripeInstance = () => {
  try {
    console.log('🧹 Starting Stripe instance cleanup')

    if (accountOnboardingResume) {
      // Remove all event listeners
      accountOnboardingResume.off?.('complete', handleResumeComplete)
      accountOnboardingResume.off?.('exit', handleResumeExit)
      accountOnboardingResume.off?.('submit', handleResumeSubmit)

      // Unmount the component
      accountOnboardingResume.unmount?.()
      accountOnboardingResume = null
      console.log('✅ Account onboarding cleaned up')
    }

    stripeResumeInstance = null
    console.log('✅ Stripe instance nullified')
  } catch (err) {
    console.warn('⚠️ Cleanup error (non-fatal):', err)
  }
}

// ✅ FIX #4: Enhanced modal close with proper cleanup
const closeResumeModal = () => {
  console.log('🚪 Closing resume modal')

  if (resumeModal.value) {
    resumeModal.value.close()
  }

  // Cleanup Stripe instance
  cleanupStripeInstance()

  // Reset all state
  modalIsOpen.value = false
  isLoadingResume.value = false
  resumeError.value = null
  isResumingStripe.value = false

  // Clear the container
  const container = document.getElementById('stripe-resume-container')
  if (container) {
    container.innerHTML = ''
  }

  console.log('✅ Modal closed and state reset')
}

onMounted(() => {
  // Poll every 30 seconds
  intervalId = window.setInterval(checkApproval, 30000)

  // Show fallback message after 15 minutes
  fallbackTimer = window.setTimeout(() => {
    fallbackTriggered.value = true
  }, 15 * 60 * 1000)
})

onBeforeUnmount(() => {
  console.log('🔄 Component unmounting - cleaning up')

  if (intervalId) clearInterval(intervalId)
  if (fallbackTimer) clearTimeout(fallbackTimer)

  // Force cleanup on unmount
  cleanupStripeInstance()

  if (resumeModal.value) {
    resumeModal.value.close()
  }
})
</script>

<style scoped>
/* ✅ FIX #5: Ensure Stripe overlays appear above modal */
:deep(.stripe-connect-overlay) {
  z-index: 10002 !important;
}

/* Ensure modal and its contents have proper stacking */
.modal {
  z-index: 9999 !important;
}

.modal-box {
  z-index: 10000 !important;
  position: relative;
}

#stripe-resume-container {
  position: relative;
  z-index: 10001 !important;
}
</style>