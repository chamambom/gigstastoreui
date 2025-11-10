<template>
  <div class="container mx-auto p-4 md:p-8">
    <div class="card bg-base-100 shadow-xl rounded-box border border-base-200">
      <div class="card-body">
        <div class="flex flex-col items-center text-center mb-6">
          <div class="avatar placeholder mb-4">
            <div class="bg-orange-400 text-white rounded-full w-16 h-16">
              <span class="text-2xl">💳</span>
            </div>
          </div>
          <h2 class="text-3xl font-bold text-base-content mb-2">Set Up Stripe Subscription</h2>
          <p class="text-lg text-base-content/60 max-w-md">
            Activate your Stripe Subscription Plan to securely connect your bank account for payouts.
          </p>

          <div class="steps steps-horizontal mt-6">
            <div class="step step-primary">1. Business Profile</div>
            <div class="step step-primary">2. Stripe Subscription Activation</div>
            <div class="step">3. Stripe Connect Activation</div>
            <div class="step">4. Awaiting Verification</div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="max-w-2xl mx-auto w-full">
          <div class="flex items-center mb-6">
            <div
                class="flex-shrink-0 w-10 h-10 bg-orange-400 text-white rounded-full flex items-center justify-center mr-4">
              <span class="font-semibold">2</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-base-content">Ready to Connect Your Payout Account?</h3>
              <p class="text-base-content/70">We'll redirect you to Stripe to securely enter your bank details and
                complete verification.</p>
            </div>
          </div>

          <div class="card bg-base-100 shadow-sm border border-base-300 mb-6">
            <div class="card-body p-6">
              <div class="flex items-center mb-4">
                <div class="avatar placeholder mr-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8">
                    <span class="text-sm">🔍</span>
                  </div>
                </div>
                <h4 class="text-lg font-semibold text-base-content">Secure Payout Connection</h4>
              </div>

              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div
                      class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span class="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <p class="font-medium text-base-content">Free Plan Activated</p>
                    <p class="text-sm text-base-content/60">Your plan is active, and your profile is ready for payout
                      linking.</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                      class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span class="text-sm font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <p class="font-medium text-base-content">Secure Redirect to Stripe</p>
                    <p class="text-sm text-base-content/60">You will be taken to a secure Stripe portal to verify your
                      identity and link your bank.</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                      class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span class="text-sm font-semibold text-blue-600">3</span>
                  </div>
                  <div>
                    <p class="font-medium text-base-content">Payouts Ready</p>
                    <p class="text-sm text-base-content/60">After linking your account, you can create your first
                      product and start earning immediately.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-actions justify-center pt-6">
            <button
                @click="finalizeProviderOnboarding"
                :disabled="isProcessing || success"
                class="btn bg-orange-400 hover:bg-orange-500 border-orange-400 text-white shadow-lg px-8"
                :class="{ 'btn-disabled': isProcessing || success }"
            >
              <span v-if="isProcessing" class="loading loading-spinner loading-sm mr-2"></span>
              <svg v-else-if="success" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              {{
                isProcessing ? 'Connecting to Stripe...' : success ? 'Redirecting...' : 'Connect to Stripe & Activate Payouts'
              }}
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/authStore.ts'
import axios from "axios";

const router = useRouter()
const authStore = useAuthStore()

const isProcessing = ref(false)
const processingStep = ref('Initializing...')
const processingMessage = ref('Please wait while we set up your account.')
const error = ref<string | null>(null)
const success = ref(false)


const finalizeProviderOnboarding = async () => {
  isProcessing.value = true
  error.value = null
  success.value = false

  try {
    // Step 1: Billing Setup
    processingStep.value = 'Creating Stripe Customer...'
    processingMessage.value = 'Setting up your billing account and free subscription.'
    await authStore.activateStripeSubscription()

    // ✅ Step 2: Redirect to embedded Stripe Connect page
    processingStep.value = 'Redirecting to payment setup...'
    processingMessage.value = 'Almost there! One more step to complete.'

    success.value = true

    setTimeout(() => {
      router.push('/activate-stripe-connect') // ✅ New route
    }, 1000)

  } catch (err: any) {
    console.error('Error finalizing provider onboarding:', err)
    error.value = err.response?.data?.detail || 'Could not finalize application. Please try again.'
  } finally {
    isProcessing.value = false
  }
}

</script>