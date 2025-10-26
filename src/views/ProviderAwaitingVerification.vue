<template>
    <div class="card bg-base-100 shadow-xl rounded-box border border-base-200 max-w-2xl mx-auto">
      <div class="card-body">
        <!-- Header Section -->
        <div class="flex flex-col items-center text-center mb-6">
          <!-- Logo/Brand -->
          <div class="avatar placeholder mb-4">
            <div class="bg-orange-400 text-white rounded-full w-20 h-20">
              <img src="@/assets/images/banner.png" alt="GigSta Logo" class="w-12 h-12" />
            </div>
          </div>

          <h2 class="text-3xl font-bold text-base-content mb-2">You're Almost There!</h2>
          <p class="text-lg text-base-content/60 max-w-md leading-relaxed">
            Your provider account is currently under manual review by our team.
          </p>
        </div>

        <div class="divider"></div>

        <!-- Status Card -->
        <div class="card bg-base-200/30 shadow-sm border border-base-300 mb-6">
          <div class="card-body p-6 text-center">
            <div class="flex flex-col items-center space-y-4">
              <!-- Status Icon -->
              <div class="relative">
                <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 flex items-center justify-center">
                  <svg v-if="!checkingStatus" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span v-else class="loading loading-spinner loading-md text-orange-400"></span>
                </div>
                <div class="absolute -top-1 -right-1 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>

              <!-- Status Badge -->
              <div class="flex items-center gap-2">
                <span v-if="checkingStatus" class="badge badge-primary bg-orange-400 border-orange-400 text-white">
                  <span class="loading loading-spinner loading-xs mr-2"></span>
                  Checking Status...
                </span>
                <span v-else class="badge badge-outline badge-info border-blue-400 text-blue-600">
                  Awaiting Approval
                </span>
              </div>

              <!-- Main Message -->
              <div class="max-w-md">
                <h3 class="text-xl font-semibold text-base-content mb-2">Review in Progress</h3>
                <p class="text-base-content/70 text-sm leading-relaxed">
                  We're carefully reviewing your profile and business information.
                  You'll be notified once it's approved, usually within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Review Process Timeline -->
        <div class="card bg-base-100 shadow-sm border border-base-300 mb-6">
          <div class="card-body p-6">
            <h4 class="text-lg font-semibold text-base-content mb-4 text-center">What We're Reviewing</h4>

            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-medium text-base-content">Business Information</p>
                  <p class="text-sm text-base-content/60">Verifying your trading name and contact details</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-medium text-base-content">Location & Service Area</p>
                  <p class="text-sm text-base-content/60">Confirming your business address and coverage area</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <span class="loading loading-spinner loading-xs text-orange-600"></span>
                </div>
                <div class="flex-1">
                  <p class="font-medium text-base-content">Account Compliance</p>
                  <p class="text-sm text-base-content/60">Final compliance and quality checks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fallback Warning -->
        <div v-if="fallbackTriggered" class="alert alert-warning bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <div>
            <h3 class="font-bold text-yellow-700 dark:text-yellow-300">Taking Longer Than Expected?</h3>
            <div class="text-sm text-yellow-600 dark:text-yellow-300">
              If your approval is taking longer than 24 hours, please contact our support team for assistance.
            </div>
          </div>
        </div>

        <!-- Action Section -->
        <div class="text-center space-y-4">
          <!-- Check Status Button -->
          <button
              class="btn bg-orange-400 hover:bg-orange-500 border-orange-400 text-white shadow-lg px-8"
              :disabled="checkingStatus"
              @click="checkApproval"
          >
            <span v-if="checkingStatus" class="loading loading-spinner loading-sm mr-2"></span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            {{ checkingStatus ? 'Checking Status...' : 'Check Approval Status' }}
          </button>

          <!-- Support Information -->
          <div class="divider">Need Help?</div>

          <div class="card bg-base-200/30 shadow-sm border border-base-300">
            <div class="card-body p-4 text-center">
              <div class="flex items-center justify-center gap-3 mb-2">
                <div class="avatar placeholder">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>
                <span class="text-sm font-medium text-base-content">Contact Support</span>
              </div>
              <p class="text-xs text-base-content/60">
                Questions about your application? Email us at
                <a href="mailto:support@gigsta.co.nz" class="link link-primary font-medium">support@gigsta.co.nz</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast toast-top toast-center z-50" v-if="showToast">
      <div class="alert alert-success border border-green-200 bg-green-50 dark:bg-green-950/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-green-700 dark:text-green-300">Your account is approved! Redirecting...</span>
      </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const checkingStatus = ref(false)
const showToast = ref(false)
const fallbackTriggered = ref(false)

let intervalId: number | null = null
let fallbackTimer: number | null = null

const checkApproval = async () => {
  checkingStatus.value = true
  try {
    // Fetch the latest user data from the Pinia store
    await authStore.viewUser()
    const currentUser = authStore.user
    const isApproved = currentUser?.provider_status === 'approved'

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

onMounted(() => {
  // Poll every 30 seconds
  intervalId = window.setInterval(checkApproval, 30000)

  // Show fallback message after 5 minutes
  fallbackTimer = window.setTimeout(() => {
    fallbackTriggered.value = true
  }, 5 * 60 * 1000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
  if (fallbackTimer) clearTimeout(fallbackTimer)
})
</script>

