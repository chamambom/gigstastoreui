<template>
  <div class="min-h-screen flex items-center justify-center p-3 sm:p-4">
    <div class="w-full max-w-sm">
      <!-- Main Card -->
      <div class="card bg-base-300">
        <div class="card-body p-4 sm:p-6 space-y-4">

          <!-- Header Section -->
          <div class="text-center space-y-3">
            <div class="avatar">
              <div class="w-14 sm:w-16 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
                <img
                    src="@/assets/images/banner.png"
                    alt="GigSta community"
                    class="w-full h-full rounded-full object-contain bg-base-100"
                />
              </div>
            </div>
            <div class="space-y-1">
              <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Create Account
              </h1>
              <p class="text-orange-400 text-sm leading-relaxed">
                Start your journey with us today
              </p>
            </div>
          </div>

          <!-- Social Login Section -->
          <!--          <div class="space-y-3">-->
          <!--            <button-->
          <!--              @click="googleLogin"-->
          <!--              class="btn btn-sm sm:btn-md border-gray-300 rounded-full w-full gap-2 sm:gap-3 group hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950/20 transition-all duration-200 min-h-10 sm:min-h-12"-->
          <!--            >-->
          <!--              <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" viewBox="0 0 24 24">-->
          <!--                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>-->
          <!--                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>-->
          <!--                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>-->
          <!--                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>-->
          <!--              </svg>-->
          <!--              <span class="font-medium text-sm sm:text-base-content truncate">Continue with Google</span>-->
          <!--            </button>-->

          <!--            <button-->
          <!--              @click="facebookLogin"-->
          <!--              class="btn btn-sm sm:btn-md border-gray-300 rounded-full w-full gap-2 sm:gap-3 group hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 transition-all duration-200 min-h-10 sm:min-h-12"-->
          <!--            >-->
          <!--              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#1877f2] group-hover:scale-110 transition-transform flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">-->
          <!--                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>-->
          <!--              </svg>-->
          <!--              <span class="font-medium text-sm sm:text-base-content truncate">Continue with Facebook</span>-->
          <!--            </button>-->
          <!--          </div>-->

          <!-- Divider -->
          <div class="divider text-xs font-medium my-3">OR</div>

          <!-- Error Message -->
          <div v-if="registrationError" class="alert alert-error py-2 px-3 text-sm rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-xs sm:text-sm">{{ registrationError }}</span>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Email Field -->
            <div class="form-control">
              <label class="label pb-1 px-0">
                <span class="label-text font-medium text-sm">
                  Email <span class="text-error">*</span>
                </span>
              </label>
              <label
                  class="input input-sm sm:input-md input-bordered rounded-full flex items-center gap-2 focus-within:input-primary transition-all duration-200"
                  :class="{'input-error': v$.user.email.$error}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     class="w-4 h-4 opacity-70 flex-shrink-0">
                  <path
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                  <path
                      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                </svg>
                <input
                    type="email"
                    class="grow text-sm sm:text-base min-w-0"
                    placeholder="your@email.com"
                    v-model="v$.user.email.$model"
                    autocomplete="email"
                />
              </label>
              <label v-if="v$.user.email.$error" class="label pt-1 px-0">
                <span v-for="error of v$.user.email.$errors" :key="error.$uid"
                      class="label-text-alt text-error text-xs">
                  {{ error.$message }}
                </span>
              </label>
            </div>

            <!-- Password Field -->
            <div class="form-control">
              <label class="label pb-1 px-0">
                <span class="label-text font-medium text-sm">
                  Password <span class="text-error">*</span>
                </span>
              </label>
              <label
                  class="input input-sm sm:input-md input-bordered rounded-full flex items-center gap-2 focus-within:input-primary transition-all duration-200"
                  :class="{'input-error': v$.user.password.$error}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     class="w-4 h-4 opacity-70 flex-shrink-0">
                  <path fill-rule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clip-rule="evenodd"/>
                </svg>
                <input
                    type="password"
                    class="grow text-sm sm:text-base min-w-0"
                    placeholder="Create a password"
                    v-model="v$.user.password.$model"
                    autocomplete="new-password"
                />
              </label>
              <label v-if="v$.user.password.$error" class="label pt-1 px-0">
                <span v-for="error of v$.user.password.$errors" :key="error.$uid"
                      class="label-text-alt text-error text-xs">
                  {{ error.$message }}
                </span>
              </label>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                :disabled="v$.user.$invalid || loading"
                class="btn btn-sm sm:btn-md
                       bg-primary/90 text-white
                       hover:bg-orange-400
                       disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
                       rounded-full w-full gap-2 font-medium
                       shadow-md hover:shadow-lg
                       transition-all duration-200
                       min-h-10 sm:min-h-12"
            >
              <span v-if="loading" class="loading loading-spinner loading-sm"></span>
              <span v-else class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     class="w-4 h-4 flex-shrink-0">
                  <path fill-rule="evenodd"
                        d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                        clip-rule="evenodd"/>
                </svg>
              </span>
              <span class="text-sm sm:text-base">{{ loading ? 'Creating Account...' : 'Continue' }}</span>
            </button>
          </form>

          <!-- Sign In Link -->
          <div class="text-center pt-2">
            <p class="text-sm text-base-content/70">
              Already have an account?
              <router-link to="/login"
                           class="link text-orange-400 font-medium hover:link-hover transition-colors active:scale-95">
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
import {reactive, ref, computed} from 'vue';
import {useRouter} from 'vue-router';
// 1. Pinia Import
import {useAuthStore} from '@/stores/authStore';
// import { User } from '@/types/User'; // Import User type for safety (though not strictly needed here)

// Vuelidate imports
import useVuelidate from '@vuelidate/core';
import {required, email, minLength, helpers} from '@vuelidate/validators';

// 2. Initialize Pinia Store and Router
const authStore = useAuthStore(); // 👈 Pinia store instance
const router = useRouter();

// --- State (Typed) ---
interface RegistrationForm {
  email: string;
  password: string;
}

const registrationError = ref<string>('');
const loading = ref<boolean>(false);

const user = reactive<RegistrationForm>({
  email: '',
  password: '',
});

// --- Vuelidate Rules (Unchanged logic) ---
const rules = computed(() => {
  return {
    user: {
      email: {
        required: helpers.withMessage('Email is required.', required),
        email: helpers.withMessage('Please enter a valid email address.', email),
      },
      password: {
        required: helpers.withMessage('Password is required.', required),
        minLength: helpers.withMessage(
            ({$params}: any) => `Password must be at least ${$params.min} characters long.`,
            minLength(8)
        ),
      },
    },
  };
});

// Initialize Vuelidate
const v$ = useVuelidate(rules, {user});

// --- Actions (Pinia Direct Call) ---

const handleSubmit = async () => {
  const isFormValid = await v$.value.user.$validate();

  if (!isFormValid) {
    registrationError.value = 'Please correct the errors in the form.';
    return;
  }

  registrationError.value = '';
  loading.value = true;

  try {
    // 🎯 Pinia Change: Call the action directly on the store instance
    await authStore.register({
      email: user.email,
      password: user.password,
    });

    // Success: Redirect to check email page
    router.push({path: '/check-email', query: {email: user.email}});
  } catch (error: any) {
    // Handle error from the store action
    registrationError.value = error.response?.data?.detail || 'Registration failed';
  } finally {
    loading.value = false;
  }
};

const googleLogin = async () => {
  // 🎯 Pinia Change: Call the action directly on the store instance
  await authStore.googleLogin();
  router.push('/onboarding/continue');
};

const facebookLogin = async () => {
  // 🎯 Pinia Change: Call the action directly on the store instance
  await authStore.facebookLogin();
  router.push('/onboarding/continue');
};
</script>