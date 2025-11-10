<template>
  <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-4">
    <div class="w-full max-w-sm">
      <!-- Main Card -->
      <div class="card bg-base-100/90 backdrop-blur-xl shadow-2xl border border-base-200/50">
        <div class="card-body p-6 space-y-4">

          <!-- Header Section -->
          <div class="text-center space-y-2">
            <div
                class="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                   class="w-8 h-8 text-white">
                <path fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd"/>
              </svg>
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p class="text-base-content/70 text-sm">
              Create a new secure password for your account
            </p>
          </div>

          <!-- Error/Success Messages -->
          <div v-if="errorMessage" class="alert alert-error py-2 px-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ errorMessage }}</span>
          </div>

          <div v-if="successMessage" class="alert alert-success py-2 px-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ successMessage }}</span>
          </div>

          <!-- Form -->
          <form @submit.prevent="submitResetPassword" class="space-y-4">
            <!-- Email Field -->
            <div class="form-control">
              <label class="label pb-1">
                <span class="label-text font-medium text-sm">
                  Email Address <span class="text-error">*</span>
                </span>
              </label>
              <label
                  class="input input-bordered flex items-center gap-2 focus-within:input-primary transition-all duration-200"
                  :class="{'input-error': v$.email.$error}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     class="w-4 h-4 opacity-70">
                  <path
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                  <path
                      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                </svg>
                <input
                    type="email"
                    class="grow"
                    placeholder="your@email.com"
                    v-model="v$.email.$model"
                    autocomplete="email"
                />
              </label>
              <label v-if="v$.email.$error" class="label pt-1">
                <span v-for="error of v$.email.$errors" :key="error.$uid" class="label-text-alt text-error text-xs">
                  {{ error.$message }}
                </span>
              </label>
            </div>

            <!-- New Password Field -->
            <div class="form-control">
              <label class="label pb-1">
                <span class="label-text font-medium text-sm">
                  New Password <span class="text-error">*</span>
                </span>
              </label>
              <label
                  class="input input-bordered flex items-center gap-2 focus-within:input-primary transition-all duration-200"
                  :class="{'input-error': v$.newPassword.$error}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     class="w-4 h-4 opacity-70">
                  <path fill-rule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clip-rule="evenodd"/>
                </svg>
                <input
                    type="password"
                    class="grow"
                    placeholder="Create new password"
                    v-model="v$.newPassword.$model"
                    autocomplete="new-password"
                />
              </label>
              <label v-if="v$.newPassword.$error" class="label pt-1">
                <span v-for="error of v$.newPassword.$errors" :key="error.$uid"
                      class="label-text-alt text-error text-xs">
                  {{ error.$message }}
                </span>
              </label>
            </div>

            <!-- Confirm Password Field -->
            <div class="form-control">
              <label class="label pb-1">
                <span class="label-text font-medium text-sm">
                  Confirm New Password <span class="text-error">*</span>
                </span>
              </label>
              <label
                  class="input input-bordered flex items-center gap-2 focus-within:input-primary transition-all duration-200"
                  :class="{'input-error': v$.confirmPassword.$error}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     class="w-4 h-4 opacity-70">
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
                  <path fill-rule="evenodd"
                        d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        clip-rule="evenodd"/>
                </svg>
                <input
                    type="password"
                    class="grow"
                    placeholder="Confirm new password"
                    v-model="v$.confirmPassword.$model"
                    autocomplete="new-password"
                />
              </label>
              <label v-if="v$.confirmPassword.$error" class="label pt-1">
                <span v-for="error of v$.confirmPassword.$errors" :key="error.$uid"
                      class="label-text-alt text-error text-xs">
                  {{ error.$message }}
                </span>
              </label>
            </div>

            <!-- Password Requirements Info -->
            <div class="bg-info/10 border border-info/20 rounded-lg p-3">
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     class="w-4 h-4 text-info mt-0.5 shrink-0">
                  <path fill-rule="evenodd"
                        d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
                        clip-rule="evenodd"/>
                </svg>
                <div class="text-xs text-base-content/70">
                  <p class="font-medium text-info mb-1">Password Requirements:</p>
                  <ul class="space-y-0.5">
                    <li class="flex items-center gap-1">
                      <div class="w-1 h-1 bg-base-content/40 rounded-full"></div>
                      At least 8 characters long
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                :disabled="v$.$invalid || loading"
                class="btn btn-primary w-full gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60"
            >
              <span v-if="loading" class="loading loading-spinner loading-sm"></span>
              <span v-else>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z"
                        clip-rule="evenodd"/>
                </svg>
              </span>
              {{ loading ? 'Resetting Password...' : 'Reset Password' }}
            </button>
          </form>

          <!-- Back to Sign In Link -->
          <div class="text-center pt-2">
            <p class="text-sm text-base-content/70">
              Remembered your password?
              <router-link to="/login" class="link link-primary font-medium hover:link-hover transition-colors">
                Sign In
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email as emailValidator, minLength, sameAs, helpers } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/authStore' // ✅ Pinia store

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// --- Reactive State ---
const state = reactive({
  email: '',
  newPassword: '',
  confirmPassword: '',
})

const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)
const resetToken = ref<string | null>(null)

// --- Lifecycle ---
onMounted(() => {
  resetToken.value = (route.query.token as string) || null

  if (!resetToken.value) {
    errorMessage.value = 'Invalid or missing password reset token. Please request a new one.'
    setTimeout(() => {
      router.push('/forgot-password')
    }, 3000)
  }
})

// --- Validation Rules ---
const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Must be a valid email address', emailValidator),
  },
  newPassword: {
    required: helpers.withMessage('New password is required', required),
    minLength: helpers.withMessage(
      ({ $params }) => `Password must be at least ${$params.min} characters long`,
      minLength(8)
    ),
  },
  confirmPassword: {
    required: helpers.withMessage('Password confirmation is required', required),
    // ✅ CORRECTED LINE: Pass a computed function that returns the value
    sameAsPassword: helpers.withMessage('Passwords do not match', sameAs(computed(() => state.newPassword))),
  },
}))

// --- Initialize Vuelidate ---
const v$ = useVuelidate(rules, state)

// --- Form Submit ---
const submitResetPassword = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) {
    errorMessage.value = 'Please correct the errors in the form.'
    return
  }

  if (!resetToken.value) {
    errorMessage.value = 'Password reset token is missing. Please try again from the email link.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // ✅ Call Pinia action instead of Vuex dispatch
    const result = await authStore.resetPassword({
      token: resetToken.value,
      password: state.newPassword,
      // email: state.email,
    })

    successMessage.value = result?.message || 'Your password has been successfully reset!'

    // Redirect after short delay
    setTimeout(() => {
      router.push({
        name: 'Login',
        query: {
          message: 'Password reset successful. Please log in with your new password.',
          email: state.email,
        },
      })
    }, 3000)
  } catch (error: any) {
    console.error('Password reset failed:', error)
    errorMessage.value =
      error?.message || 'Failed to reset password. The link may be expired or invalid.'
  } finally {
    loading.value = false
  }
}
</script>
