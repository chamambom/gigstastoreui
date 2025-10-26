<template>
  <div class="container mx-auto p-4 md:p-8">
    <div class="card bg-base-100 shadow-xl rounded-box border border-base-200">
      <div class="card-body">
        <!-- Header Section -->
        <div class="flex flex-col items-center text-center mb-6">
          <div class="avatar placeholder mb-4">
            <div class="bg-orange-400 text-white rounded-full w-16 h-16">
              <span class="text-2xl">💳</span>
            </div>
          </div>
          <h2 class="text-3xl font-bold text-base-content mb-2">Final Step: Billing Setup</h2>
          <p class="text-lg text-base-content/60 max-w-md">
            You're almost ready to offer your services and start earning!
          </p>

          <!-- Progress Indicator -->
          <div class="steps steps-horizontal mt-6">
            <div class="step step-primary">Provider Setup</div>
            <div class="step step-primary">Business Details</div>
            <div class="step step-primary">Billing Setup</div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Main Content Section -->
        <div class="max-w-2xl mx-auto w-full">
          <div class="flex items-center mb-6">
            <div class="flex-shrink-0 w-10 h-10 bg-orange-400 text-white rounded-full flex items-center justify-center mr-4">
              <span class="font-semibold">2</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-base-content">Billing Configuration</h3>
              <p class="text-base-content/70">Set up your payment processing and plan selection</p>
            </div>
          </div>

          <!-- Plan Information Card -->
          <div class="card bg-base-200/30 shadow-sm border border-base-300 mb-6">
            <div class="card-body p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="avatar placeholder mr-3">
                    <div class="bg-purple-600 text-white rounded-full w-10 h-10">
                      <span class="text-sm">🎯</span>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-base-content">Solo Hustle Free Plan</h4>
                    <p class="text-sm text-base-content/60">Perfect for getting started</p>
                  </div>
                </div>
                <div class="badge badge-success bg-green-500 border-green-500 text-white">
                  AUTO-ENROLLED
                </div>
              </div>

              <div class="bg-base-100 rounded-lg p-4 border border-base-300">
                <p class="text-base-content leading-relaxed">
                  To start accepting payments from customers, we need to set up your billing account.
                  You will automatically be enrolled in the <span class="font-semibold text-purple-600">Solo Hustle Free Plan</span>,
                  which gives you everything you need to start offering services.
                </p>
              </div>

              <!-- Plan Features -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-sm text-base-content">Create unlimited services</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-sm text-base-content">Accept online bookings</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-sm text-base-content">Secure payment processing</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-sm text-base-content">Customer management tools</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Approval Process Information -->
          <div class="card bg-base-100 shadow-sm border border-base-300 mb-6">
            <div class="card-body p-6">
              <div class="flex items-center mb-4">
                <div class="avatar placeholder mr-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8">
                    <span class="text-sm">🔍</span>
                  </div>
                </div>
                <h4 class="text-lg font-semibold text-base-content">What Happens Next?</h4>
              </div>

              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <span class="text-sm font-semibold text-orange-600">1</span>
                  </div>
                  <div>
                    <p class="font-medium text-base-content">Application Submitted</p>
                    <p class="text-sm text-base-content/60">Your provider application will be submitted for manual review</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <span class="text-sm font-semibold text-orange-600">2</span>
                  </div>
                  <div>
                    <p class="font-medium text-base-content">Review Process</p>
                    <p class="text-sm text-base-content/60">Our team will verify your information and business details</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <span class="text-sm font-semibold text-orange-600">3</span>
                  </div>
                  <div>
                    <p class="font-medium text-base-content">Account Activation</p>
                    <p class="text-sm text-base-content/60">You'll receive access to the provider dashboard after approval</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="alert alert-success bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <h3 class="font-bold text-green-700 dark:text-green-300">Application Submitted Successfully!</h3>
              <div class="text-sm text-green-600 dark:text-green-300">
                🎉 Thank you! Your provider application is under review. You'll be notified once approved.
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="alert alert-error bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <h3 class="font-bold text-red-700 dark:text-red-300">Submission Error</h3>
              <div class="text-sm text-red-600 dark:text-red-300">{{ error }}</div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="card-actions justify-center pt-6">
            <button
                @click="finalizeProviderOnboarding"
                :disabled="isProcessing || success"
                class="btn bg-orange-400 hover:bg-orange-500 border-orange-400 text-white shadow-lg px-8"
                :class="{ 'btn-disabled': isProcessing || success }"
            >
              <span v-if="isProcessing" class="loading loading-spinner loading-sm mr-2"></span>
              <svg v-else-if="success" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              {{ isProcessing ? 'Submitting Application...' : success ? 'Application Submitted' : 'Submit for Approval' }}
            </button>
          </div>

          <!-- Additional Help -->
          <div class="text-center mt-6">
            <p class="text-sm text-base-content/60">
              Need help? Contact our support team at
              <a href="mailto:support@gigsta.co.nz" class="link link-primary">support@gigsta.co.nz</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const isProcessing = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const finalizeProviderOnboarding = async () => {
  isProcessing.value = true
  error.value = null
  success.value = false

  try {
    // 1. Finish billing setup (if needed)
    await authStore.initiateBillingSetup()

    // 2. Set provider_status to "pending"
    await authStore.setProviderPending()

    // 3. Redirect to awaiting verification screen
    await router.push('/awaiting-verification')
    success.value = true
  } catch (err: any) {
    console.error('Error finalizing provider onboarding:', err)
    error.value = err.response?.data?.detail || 'Something went wrong. Please try again.'
  } finally {
    isProcessing.value = false
  }
}
</script>

