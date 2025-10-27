<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Main Card -->
      <div class="card bg-base-100/90 backdrop-blur-xl shadow-2xl border border-base-200/50">
        <div class="card-body p-8 space-y-6">

          <!-- Header Section -->
          <div class="text-center space-y-3">
            <div class="relative mx-auto w-20 h-20">
              <!-- Animated Background Rings -->
              <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 animate-ping"></div>
              <div class="absolute inset-2 bg-gradient-to-r from-secondary to-accent rounded-full opacity-30 animate-pulse"></div>
              <!-- Main Icon Container -->
              <div class="relative w-full h-full bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-xl">
                <!-- Welcome Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-white">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <!-- Sparkle Effects -->
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-secondary rounded-full animate-bounce" style="animation-delay: 0.3s;"></div>
              </div>
            </div>

            <div class="space-y-2">
              <h1 class="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Welcome to GigStaStore!
              </h1>
              <div class="flex items-center justify-center gap-2">
                <div class="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                <span class="text-2xl">✨</span>
                <div class="w-12 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full"></div>
              </div>
              <p class="text-base-content/70 text-sm">
                What would you like to do?
              </p>
            </div>
          </div>

          <!-- Choice Buttons Section -->
          <div v-if="isLoggedIn && needsToChooseOnboardingPath" class="space-y-4">
            <!-- Find Services Button -->
            <button
              @click="proceedAsSeeker"
              class="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/25"
            >
              <div class="relative bg-base-100/10 backdrop-blur-sm rounded-xl p-6 text-center space-y-3 transition-all duration-300 group-hover:bg-base-100/20">
                <!-- Icon Container -->
                <div class="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-white">
                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
                  </svg>
                </div>

                <div class="text-white space-y-2">
                  <h3 class="text-xl font-bold">Find Products</h3>
                  <p class="text-white/80 text-sm font-normal leading-relaxed">
                    Explore products from your favourite providers
                  </p>
                </div>

                <!-- Hover Arrow -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-5 h-5 text-white">
                    <path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </button>

            <!-- Become Provider Button -->
            <button
              @click="proceedAsProvider"
              class="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-secondary to-accent p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-secondary/25"
            >
              <div class="relative bg-base-100/10 backdrop-blur-sm rounded-xl p-6 text-center space-y-3 transition-all duration-300 group-hover:bg-base-100/20">
                <!-- Icon Container -->
                <div class="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-white">
                    <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.641l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd" />
                  </svg>
                </div>

                <div class="text-white space-y-2">
                  <h3 class="text-xl font-bold">Become a Seller & Add Virtual Shop</h3>
                  <p class="text-white/80 text-sm font-normal leading-relaxed">
                    Complete your profile to list your products and start earning
                  </p>
                </div>

                <!-- Hover Arrow -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-5 h-5 text-white">
                    <path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <!-- Loading State -->
          <div v-else-if="isLoggedIn && !currentUser" class="text-center space-y-4">
            <div class="flex justify-center">
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
            <div class="space-y-2">
              <p class="text-base-content font-medium">Loading your profile...</p>
              <p class="text-base-content/60 text-sm">Please wait while we prepare your experience</p>
            </div>
          </div>

          <!-- Not Logged In State -->
          <div v-else-if="!isLoggedIn" class="text-center space-y-6">
            <div class="space-y-3">
              <div class="w-12 h-12 mx-auto bg-warning/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-warning">
                  <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="space-y-2">
                <p class="text-base-content font-medium">Authentication Required</p>
                <p class="text-base-content/60 text-sm">Please log in to continue your onboarding journey</p>
              </div>
            </div>

            <router-link to="/login" class="btn btn-primary w-full gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd" />
              </svg>
              Go to Login
            </router-link>
          </div>

          <!-- Redirecting State -->
          <div v-else class="text-center space-y-4">
            <div class="flex justify-center">
              <span class="loading loading-spinner loading-lg text-secondary"></span>
            </div>
            <div class="space-y-2">
              <p class="text-base-content font-medium">Almost there!</p>
              <p class="text-base-content/60 text-sm">Redirecting you to your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthFlags } from '@/composables/useAuthFlags'
import { useAuthStore } from '@/stores/authStore'



const router = useRouter()
const authStore = useAuthStore()

const {
  isLoggedIn,
  isProvisional,
  isProvider,
  isSeeker,
  needsEmailVerification,
  currentUser
} = useAuthFlags()

const needsToChooseOnboardingPath = computed(() => isProvisional.value)

watch(
  [isLoggedIn, needsEmailVerification, isProvisional, isProvider, isSeeker],
  async () => {
    if (!isLoggedIn.value) return

    if (needsEmailVerification.value) {
      console.log('User logged in but email unverified → redirecting to verification page')
      await router.replace({ name: 'CheckEmail' })
      return
    }

    if (!isProvisional.value) {
      console.log('User is no longer provisional → redirecting to dashboard')
      if (isProvider.value) {
        await router.replace({ name: 'ProviderDashboard' })
      } else if (isSeeker.value) {
        await router.replace({ name: 'SeekerDashboard' })
      } else {
        await router.replace({ name: 'SeekerDashboard' })
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  console.log('OnboardingRouter mounted → waiting for user choice or auto redirect')
})

const proceedAsSeeker = async () => {
  try {
    await authStore.updateUserOnboardingStatus({
      is_provisional: false,
      roles: ['user']
    })
    router.push({ name: 'SeekerDashboard' })
  } catch (error) {
    console.error('Failed to set user as seeker or update status:', error)
  }
}

const proceedAsProvider = async () => {
  try {
    await authStore.updateUserOnboardingStatus({
      is_provisional: false,
      onboarding_status: {
        provider_onboarding_complete: false
      },
      roles: ['provider']
    })
    router.push({ name: 'provider-onboarding-details' })
  } catch (error) {
    console.error('Failed to set user as provider or update status:', error)
  }
}
</script>
