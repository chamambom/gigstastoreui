<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <!-- Main Card -->
      <div class="card bg-base-100/90 backdrop-blur-xl shadow-2xl border border-base-200/50">
        <div class="card-body p-8 space-y-6 text-center">

          <!-- Icon and Animation -->
          <div class="space-y-4">
            <div class="relative mx-auto w-20 h-20">
              <!-- Animated Background Circle -->
              <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 animate-pulse"></div>
              <!-- Main Icon Container -->
              <div class="relative w-full h-full bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <!-- Email Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-white">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                <!-- Success Checkmark (animated) -->
                <div class="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 text-white">
                    <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Header Text -->
            <div class="space-y-2">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Check Your Email
              </h1>
              <div class="flex items-center justify-center gap-2 text-base-content/70">
                <div class="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
                <span class="text-2xl">📧</span>
                <div class="w-8 h-0.5 bg-gradient-to-l from-transparent to-secondary rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- Main Message -->
          <div class="space-y-4">
            <div class="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p class="text-base-content text-sm leading-relaxed">
                We've sent you a verification link. Please check your inbox and follow the link to activate your account.
              </p>
            </div>

            <!-- Additional Info -->
            <div class="space-y-3">
              <div class="alert alert-info py-3 px-4 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="text-left">
                  <p class="font-medium">Didn't receive the email?</p>
                  <p class="text-xs opacity-80 mt-1">Check your spam folder or contact support</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-3 pt-2">
                <button
                  @click="resendEmail"
                  :disabled="isResending"
                  class="btn btn-outline btn-primary w-full gap-2 font-medium transition-all duration-200 hover:shadow-md"
                >
                  <span v-if="isResending" class="loading loading-spinner loading-sm"></span>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 10a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V8.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clip-rule="evenodd" />
                  </svg>
                  {{ isResending ? 'Sending...' : 'Resend Email' }}
                </button>

                <button
                  @click="goBack"
                  class="btn btn-ghost w-full gap-2 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                  </svg>
                  Back to Sign In
                </button>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="resendSuccess" class="alert alert-success py-2 px-3 text-sm animate-in slide-in-from-bottom-4 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Email sent successfully! Check your inbox.</span>
          </div>

          <!-- Error Message -->
          <div v-if="resendError" class="alert alert-error py-2 px-3 text-sm animate-in slide-in-from-bottom-4 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ resendError }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' // <-- your new Pinia store

const router = useRouter()
const authStore = useAuthStore()

// Reactive state
const isResending = ref(false)
const resendSuccess = ref(false)
const resendError = ref('')

// Function to resend verification email
const resendEmail = async () => {
  isResending.value = true
  resendSuccess.value = false
  resendError.value = ''

  try {
    // --- KEY CHANGE ---
    // Call Pinia action instead of Vuex dispatch
    await authStore.resendVerificationEmail()

    resendSuccess.value = true

    // Hide success message after 3 seconds
    setTimeout(() => {
      resendSuccess.value = false
    }, 3000)
  } catch (error: any) {
    // Catch API or logic errors from store
    resendError.value = error?.message || 'Failed to resend email. Please try again.'

    // Hide error after 5 seconds
    setTimeout(() => {
      resendError.value = ''
    }, 5000)
  } finally {
    isResending.value = false
  }
}

// Navigation
const goBack = () => {
  router.push('/login')
}
</script>
