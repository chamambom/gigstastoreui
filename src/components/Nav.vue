<template>
  <section
      class="navbar min-h-20 px-6 sm:px-25 text-base-content relative z-50 bg-base-100 border-b border-base-300"
  >
    <div class="relative z-10 flex w-full items-center justify-between max-w-screen-2xl mx-auto">

      <div class="navbar-start flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
        <div class="flex-none lg:hidden">
          <label for="left-sidebar-drawer" class="btn btn-square btn-ghost hover:bg-base-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-5 h-5 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </label>
        </div>

        <div class="flex items-center space-x-3 flex-shrink-0">
          <div class="avatar">
            <div class="w-10 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
              <img src="../assets/images/banner.png" alt="GigStaStore community"
                   class="w-full h-full rounded-full object-contain bg-base-100"/>
            </div>
          </div>
          <router-link to="/" class="flex items-center">
            <div class="font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight">
              <span class="text-primary/90">GigSta</span><span class="text-orange-400">Store</span>
            </div>
          </router-link>
        </div>

        <div
            class="divider divider-horizontal before:bg-base-300 after:bg-base-300 mx-2 sm:mx-3 opacity-50 flex-shrink-0 hidden sm:block">
        </div>

        <!-- Fixed width container for conditional links -->
        <div class="hidden xl:flex items-center space-x-2">
          <router-link v-if="isProvider" class="btn btn-ghost btn-sm sm:btn-md rounded-btn flex-shrink-0"
                       to="/seller/products">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            My Products
          </router-link>

          <router-link v-if="isLoggedIn && !isProvisional"
                       :to="canAccessProviderDashboard ? '/provider-dashboard' : '/seeker-dashboard'"
                       class="btn btn-ghost btn-sm sm:btn-md rounded-btn font-semibold hover:bg-base-200 transition-all duration-200 relative z-30 flex-shrink-0">
            <i class="fas fa-tachometer-alt text-base-content/70 text-sm w-4"></i>
            {{ canAccessProviderDashboard ? 'Seller Dashboard' : 'Dashboard' }}
          </router-link>
        </div>
      </div>

      <!--      <div v-if="!isLoggedIn || isSeeker" class="navbar-center absolute left-1/2 -translate-x-1/2 hidden md:flex max-w-xl px-4">-->
      <!--        <div class="w-full">-->
      <!--          <Search/>-->
      <!--        </div>-->
      <!--      </div>-->


      <div class="navbar-end flex items-center space-x-2 sm:space-x-3 flex-shrink-0">

        <router-link to="/cart"
                     class="btn btn-ghost btn-sm sm:btn-md rounded-btn font-semibold hover:bg-base-200 transition-all duration-200 relative z-30 flex-shrink-0">
          Cart
          <div class="badge ml-2 badge-outline" v-text="count"/>
        </router-link>

        <div v-show="isLoggedIn && needsEmailVerification" class="flex items-center space-x-2 flex-shrink-0">
          <span
              class="badge bg-orange-400/10 text-orange-400 border text-base-content border-orange-400/20 text-xs px-3 py-2 rounded-lg relative z-30">Email Unverified</span>
          <router-link to="/check-email"
                       class="btn btn-sm bg-orange-400 text-base-100 border-none hover:bg-orange-500 rounded-lg relative z-30">
            Verify Email
          </router-link>
        </div>


        <div v-if="!isLoggedIn" class="flex items-center space-x-2 sm:space-x-3">
          <router-link
              to="/login"
              class="btn btn-sm sm:btn-md bg-base-100 rounded-md text-base-content font-semibold border-none hover:bg-base-300 font-medium transition-all duration-200 relative z-50"
          >
            Sign In
          </router-link>

          <router-link
              to="/signup"
              class="btn btn-sm sm:btn-md bg-primary/90 text-white font-semibold rounded-md border-none hover:bg-purple-900 font-medium transition-all duration-200 relative z-50"
          >
            Sign up to Start Selling
          </router-link>
        </div>

        <div v-else class="dropdown dropdown-end relative z-50">
          <div
              tabindex="0"
              role="button"
              class="flex items-center gap-2 cursor-pointer p-2 hover:bg-base-200/50 rounded-xl transition-all duration-200 relative z-50"
          >
            <div
                class="w-8 h-8 bg-base-300 rounded-lg flex items-center justify-center"
            >
              <i class="fas fa-user text-base-content/70 text-sm"></i>
            </div>
            <i class="fas fa-chevron-down text-xs text-base-content/60"></i>
          </div>
          <ul
              tabindex="0"
              class="menu dropdown-content mt-2 p-4 bg-base-100 border border-base-300 text-base-content rounded-xl w-56 shadow-lg z-[9999] focus:outline-none"
          >
            <li class="mb-2">
              <div
                  class="flex items-center gap-3 p-2 bg-base-200/50 rounded-lg pointer-events-none"
              >
                <div
                    class="w-8 h-8 bg-purple-800/10 rounded-lg flex items-center justify-center"
                >
                  <i class="fas fa-user text-purple-800 text-sm"></i>
                </div>
                <div>
                  <p class="font-medium text-sm text-base-content">Kia Ora!</p>
                  <p class="text-xs text-base-content/60 truncate">
                    {{ currentUser?.email || 'currentUser' }}
                  </p>
                </div>
              </div>
            </li>

            <li v-if="!isProvisional">
              <router-link
                  :to="canAccessProviderDashboard ? '/provider-dashboard' : '/seeker-dashboard'"
                  class="flex items-center gap-3 p-2 hover:bg-purple-800/10 hover:text-purple-800 rounded-lg transition-colors">
                <i class="fas fa-tachometer-alt text-base-content/70 text-sm w-4"></i>
                {{ canAccessProviderDashboard ? 'Seller Dashboard' : 'Dashboard' }}
              </router-link>
            </li>

            <li v-show="!(isProvider && (isProviderActive || isProviderPendingConnectVerification))">
              <router-link to="/bookings"
                           class="flex items-center gap-3 p-2 hover:bg-base-200/70 rounded-lg transition-colors">
                <i class="fas fa-calendar-alt text-base-content/70 text-sm w-4"></i> Orders
              </router-link>
            </li>
            <li v-show="!(isProvider && (isProviderActive || isProviderPendingConnectVerification))">
              <router-link to="/listratings"
                           class="flex items-center gap-3 p-2 hover:bg-base-200/70 rounded-lg transition-colors">
                <i class="fas fa-star text-base-content/70 text-sm w-4"></i> Ratings
              </router-link>
            </li>

            <div class="divider my-2"></div>

            <li>
              <router-link
                  to="/account"
                  class="flex items-center gap-3 p-2 hover:bg-base-200/70 rounded-lg transition-colors"
              >
                <i class="fas fa-user-cog text-base-content/70 text-sm w-4"></i>
                Account Settings
              </router-link>
            </li>
            <li v-if="canAccessProviderDashboard">
              <router-link
                  to="/subscription"
                  class="flex items-center gap-3 p-2 hover:bg-orange-400/10 hover:text-orange-400 rounded-lg transition-colors"
              >
                <i class="fas fa-crown text-base-content/70 text-sm w-4"></i>
                Upgrade Plan
              </router-link>
            </li>

            <div class="divider my-2"></div>

            <li>
              <button
                  @click="logout"
                  class="flex items-center gap-3 p-2 hover:bg-error/10 hover:text-error rounded-lg transition-colors w-full text-left"
              >
                <i
                    class="fas fa-sign-out-alt text-base-content/70 text-sm w-4"
                ></i>
                Log Out
              </button>
            </li>
          </ul>
        </div>


        <button
            class="btn btn-sm sm:btn-md btn-ghost text-base-content bg-base-200/70 hover:bg-base-300 border-none rounded-md transition-all duration-200 relative z-50"
            @click="toggleTheme"
        >
          {{ currentTheme === 'light' ? '🌙' : '☀️' }}
        </button>
      </div>

    </div>
  </section>
</template>


<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {storeToRefs} from 'pinia'; // 👈 🔑 Import storeToRefs for state properties

import Search from './Search.vue'
import {useCartStore} from '../stores/cartStore'


// 1. Import individual Pinia stores
import {useAuthStore} from '../stores/authStore';
import {useThemeStore} from '../stores/themeStore';
// import { useSubscriptionStore } from '@/stores/subscription';
// import { useCategoryStore } from '@/stores/category';

import {useAuthFlags} from '../composables/useAuthFlags';

const cartStore = useCartStore()
// Initialize the Pinia stores and router
const authStore = useAuthStore();
const themeStore = useThemeStore();
// const subscriptionStore = useSubscriptionStore();
// const categoryStore = useCategoryStore();


const router = useRouter();
const count = computed(() => cartStore.count)


const {
  isLoggedIn,
  isVerified,
  isProvider,
  isSeeker,
  isProvisional,
  canAccessProviderDashboard,
  currentUser,
  isProviderActive,
  isProviderPendingConnectVerification,
  isProviderRejected,
  showBecomeProviderCTA,
  needsEmailVerification,
} = useAuthFlags();


// const serviceCategory = ref("");
// const categories = computed(() => store.getters.stateCategories);
//
// // Ensure currentUserPlan is properly computed from store
// const currentUserPlan = computed(() => store.getters.getCurrentPlan);
//
// // Service limit exponent mapping for display (e.g., Solo¹, Basic², Pro³)
// const exponentMap = {1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵"};
// const serviceLimitExponent = computed(() => exponentMap[currentUserPlan.value.limit] || "");


// Fetch user subscription data when component mounts and user is logged in
// onMounted(async () => {
//   if (isLoggedIn.value && currentUser.value && isProvider.value) {
//     await store.dispatch("fetchUserSubscription");
//     await store.dispatch("getRatings");
//     //await store.dispatch("fetchAllSubscriptions"); // Assuming this is not needed here
//   }
// });


// --- Theme Switcher functionality ---

// 🎯 FIX 3: Accessing Theme Store State
// Pinia state properties must be extracted using storeToRefs() to retain reactivity in the component.
// Assuming 'currentTheme' is a STATE property in the theme store.
const {currentTheme} = storeToRefs(themeStore); // 👈 Correct way to extract reactive state

function toggleTheme() {
  themeStore.toggleTheme() // Action call is correct
}

// --- Logout functionality ---
const logout = async () => {
  try {
    await authStore.logOut();
    await router.push('/');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>

