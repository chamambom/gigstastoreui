<template>
  <aside v-if="isLoggedIn && currentUser"
         class="w-80 min-h-full bg-base-100 relative overflow-hidden border-r border-base-300">

    <div class="relative z-10 p-4 space-y-0">

      <!-- Dashboard -->
      <router-link to="/provider-dashboard"
                   class="group flex items-center gap-2 p-2 rounded-md bg-base-100 hover:bg-purple-800/5 transition-all duration-300 border border-transparent hover:border-purple-800/10">
        <div
            class="w-8 h-8 bg-base-300 rounded-xl flex items-center justify-center group-hover:bg-purple-800/10 transition-colors duration-200">
          <i class="fas fa-chart-line text-base-content/70 text-sm group-hover:text-purple-800"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-sm text-base-content group-hover:text-purple-800 transition-colors">
            Dashboard</h3>
          <p class="text-xs text-base-content/60">Analytics & Overview</p>
        </div>
      </router-link>

      <!-- Divider -->
      <div class="h-px bg-base-300 my-2"></div>

      <!-- Products Section -->
      <div class="space-y-2">
        <details open class="group">
          <summary
              class="list-none cursor-pointer flex items-center gap-2 p-2 rounded-md bg-base-100 hover:bg-orange-400/5 transition-all duration-300 border border-transparent hover:border-orange-400/10">
            <div
                class="w-8 h-8 bg-base-300 rounded-xl flex items-center justify-center group-hover:bg-orange-400/10 transition-colors duration-200">
              <i class="fas fa-briefcase text-base-content/70 text-sm group-hover:text-orange-400"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-sm text-base-content  group-hover:text-orange-400 transition-colors">
                  Products</h3>
                <span v-if="(currentUserPlan?.services_used ?? 0) > 0"
                      class="px-3 py-1 bg-orange-400/10 text-orange-400 rounded-full text-xs font-medium border border-orange-400/20">
                  {{ currentUserPlan?.services_used }}
                </span>
              </div>
            </div>
            <i class="fas fa-chevron-down group-open:rotate-180 text-base-content/40 transition-transform duration-300"></i>
          </summary>

          <!-- Products Submenu -->
          <div class="mt-2 ml-12 mr-2 space-y-0">
            <router-link to="/seller/products"
                         class="flex items-center gap-2 p-2 rounded-md text-sm text-base-content/60 hover:text-base-content hover:bg-base-200/70 transition-all duration-200">
              <div class="w-6 h-6 bg-base-300 rounded-lg flex items-center justify-center">
                <i class="fas fa-list text-base-content/70 text-xs"></i>
              </div>
              <div>
                <span class="font-medium">Products List</span>
                <p class="text-xs text-base-content/50">View all products</p>
              </div>
            </router-link>

            <div v-if="currentUserPlan?.can_add_more">
              <router-link to="/seller/products/create"
                           class="flex items-center gap-2 p-2 rounded-md text-sm text-orange-400 hover:text-orange-400 hover:bg-orange-400/5 transition-all duration-200 border border-transparent hover:border-orange-400/20">
                <div class="w-6 h-6 bg-orange-400/10 rounded-lg flex items-center justify-center">
                  <i class="fas fa-plus text-orange-400 text-xs"></i>
                </div>
                <div>
                  <span class="font-medium">Add Product</span>
                  <p class="text-xs text-orange-400/70">Create new product</p>
                </div>
              </router-link>
            </div>

            <!-- Upgrade Notice -->
            <div v-else
                 class="mt-4 p-2 bg-base-300 rounded-md border border-base-300 text-xs">
              <div class="flex items-start gap-3 mb-4">
                <div class="w-8 h-8 bg-orange-400/10 rounded-xl flex items-center justify-center mt-0.5">
                  <i class="fas fa-exclamation-triangle text-orange-400 text-sm"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-sm text-base-content mb-1">Limit Reached</h4>
                  <p class="text-sm text-base-content/60">{{
                      currentUserPlan.services_used ?? 0
                    }}/{{ currentUserPlan?.limit ?? 'N/A' }} products used</p>
                </div>
              </div>

              <div class="space-y-2">
                <h5 class="font-semibold text-base-content flex items-center gap-2">
                  <i class="fas fa-rocket text-purple-800 text-xs"></i>
                  Upgrade Plans
                </h5>

                <div class="space-y-3">
                  <div v-for="plan in upgradeOptions" :key="plan._id"
                       class="bg-base-100 rounded-xl p-2 border border-base-300 hover:border-purple-800/20 hover:bg-purple-800/2 transition-all duration-200">

                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div class="w-6 h-6 bg-purple-800/10 rounded-lg flex items-center justify-center">
                          <i class="fas fa-crown text-purple-800 text-xs"></i>
                        </div>
                        <div>
                          <h6 class="font-medium text-base-content">{{ plan.name }}</h6>
                          <p class="text-sm text-base-content/60">{{ plan.limit }} products</p>
                        </div>
                      </div>
                      <div class="text-right">
                        <span class="text-xl font-bold text-purple-800">
                          ${{ plan.plan_price }}
                        </span>
                        <span class="text-sm text-base-content/60">/mo</span>
                      </div>
                    </div>

                    <button @click="upgradePlan(plan.stripe_price_id ?? '')"
                            class="w-full bg-gray-400 hover:bg-gray-700 text-white py-2 px-2 rounded-full transition-all duration-200 flex items-center justify-center gap-2">
                      <i class="fas fa-arrow-up text-xs"></i>
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </details>
      </div>

      <!-- Divider -->
      <div class="h-px bg-base-300 my-2"></div>

      <!-- Billing Section (Subscription & Invoices) -->
      <div class="space-y-2">
        <details class="group">
          <summary
              class="list-none cursor-pointer flex items-center gap-2 p-2 rounded-md bg-base-100 hover:bg-purple-800/5 transition-all duration-300 border border-transparent hover:border-purple-800/10">
            <div
                class="w-8 h-8 bg-base-300 rounded-xl flex items-center justify-center group-hover:bg-purple-800/10 transition-colors duration-200">
              <i class="fas fa-credit-card text-base-content/70 text-sm group-hover:text-purple-800"></i>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-sm text-base-content group-hover:text-purple-800 transition-colors">
                Billing</h3>
              <p class="text-xs text-base-content/60">Subscription & Payments</p>
            </div>
            <i class="fas fa-chevron-down group-open:rotate-180 text-base-content/40 transition-transform duration-300"></i>
          </summary>

          <!-- Billing Submenu -->
          <div class="mt-2 ml-12 mr-2 space-y-0">
            <router-link to="/subscription"
                         class="flex items-center gap-2 p-2 rounded-md text-sm text-base-content/60 hover:text-purple-800 hover:bg-purple-800/5 transition-all duration-200 border border-transparent hover:border-purple-800/10">
              <div class="w-6 h-6 bg-base-300 rounded-lg flex items-center justify-center">
                <i class="fas fa-crown text-base-content/70 text-xs"></i>
              </div>
              <div>
                <span class="font-medium">Subscription</span>
                <p class="text-xs text-base-content/50">Manage plan</p>
              </div>
            </router-link>

            <router-link to="/invoice"
                         class="flex items-center gap-2 p-2 rounded-md text-sm text-base-content/60 hover:text-base-content hover:bg-base-200/70 transition-all duration-200">
              <div class="w-6 h-6 bg-base-300 rounded-lg flex items-center justify-center">
                <i class="fas fa-receipt text-base-content/70 text-xs"></i>
              </div>
              <div>
                <span class="font-medium">Invoices</span>
                <p class="text-xs text-base-content/50">Payment history</p>
              </div>
            </router-link>
          </div>
        </details>
      </div>

      <!-- Divider -->
      <div class="h-px bg-base-300 my-2"></div>

      <!-- Main Navigation -->
      <div class="space-y-2">
        <!-- Reviews -->
        <router-link to="/listratings"
                     class="group flex items-center gap-2 p-2 rounded-md bg-base-100 hover:bg-base-200 transition-all duration-300 border border-transparent hover:border-base-300">
          <div
              class="w-8 h-8 bg-base-300 rounded-xl flex items-center justify-center group-hover:bg-base-content/10 transition-colors duration-200">
            <i class="fas fa-star text-base-content/70 text-sm group-hover:text-base-content"></i>
          </div>
          <div>
            <h3 class="font-semibold text-sm text-base-content group-hover:text-base-content transition-colors">
              Reviews</h3>
            <p class="text-xs text-base-content/60">Customer feedback</p>
          </div>
        </router-link>

        <!-- Account -->
        <router-link to="/account"
                     class="group flex items-center gap-2 p-2 rounded-md bg-base-100 hover:bg-base-200 transition-all duration-300 border border-transparent hover:border-base-300">
          <div
              class="w-8 h-8 bg-base-300 rounded-xl flex items-center justify-center group-hover:bg-base-content/10 transition-colors duration-200">
            <i class="fas fa-user text-base-content/70 text-sm group-hover:text-base-content"></i>
          </div>
          <div>
            <h3 class="font-semibold text-sm text-base-content  group-hover:text-base-content transition-colors">
              Account</h3>
            <p class="text-xs text-base-content/60">Profile settings</p>
          </div>
        </router-link>
      </div>

      <router-link v-if="isSuper"
                   to="/admin-dashboard"
                   class="group flex items-center gap-2 p-2 rounded-md bg-base-100 hover:bg-base-200 transition-all duration-300 border border-transparent hover:border-base-300">
        <div
            class="w-8 h-8 bg-base-300 rounded-xl flex items-center justify-center group-hover:bg-base-content/10 transition-colors duration-200">
          <i class="fas fa-user text-base-content/70 text-sm group-hover:text-base-content"></i>
        </div>
        <div>
          <h3 class="font-semibold text-sm text-red-400 group-hover:text-base-content transition-colors">
            GigSta Admin</h3>
          <p class="text-xs text-base-content/60">admin tasks</p>
        </div>
      </router-link>


      <!-- Bottom Section -->
      <div class="pt-2 mt-2 border-t border-base-300">
        <button @click="logout"
                class="group w-full flex items-center gap-2 p-2 rounded-md bg-base-100 hover:bg-error/5 transition-all duration-300 border border-transparent hover:border-error/10">
          <div
              class="w-8 h-8 bg-base-300 rounded-xl flex items-center justify-center group-hover:bg-error/10 transition-colors duration-200">
            <i class="fas fa-sign-out-alt text-base-content/70 text-sm group-hover:text-error"></i>
          </div>
          <div>
            <h3 class="font-semibold text-sm text-red-400 group-hover:text-error transition-colors">
              Log Out</h3>
            <p class="text-xs text-base-content/60">Sign out of account</p>
          </div>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthFlags} from '@/composables/useAuthFlags'
import {storeToRefs} from 'pinia';

// ✅ Import your Pinia stores
// import { useBookingStore } from '@/stores/bookingStore'
import {useAuthStore} from '@/stores/authStore'
import {useStripeStore} from "@/stores/stripeStore";

const router = useRouter()

// Auth composable
const {
  isLoggedIn,
  isVerified,
  isProvider,
  isSuper,
  isSeeker,
  isProvisional,
  canAccessProviderDashboard,
  currentUser,
  isProviderApproved,
  isProviderPending,
  isProviderRejected,
  showBecomeProviderCTA,
  providerStatus,
  needsEmailVerification,
} = useAuthFlags()

// ✅ Pinia stores
const authStore = useAuthStore()
// const bookingStore = useBookingStore()
const stripeStore = useStripeStore()

// Computed data from stores
// const currentUserPlan = computed(() => stripeStore.currentPlan)

const { getCurrentPlan } = storeToRefs(stripeStore);
const currentUserPlan = getCurrentPlan; // This is a ComputedRef<Plan>

const upgradeOptions = computed(() => stripeStore.upgradeOptions)
const downgradeOptions = computed(() => stripeStore.downgradeOptions)
// const providerCount = computed(() => bookingStore.providerBookingCount)
//
// // Lifecycle
onMounted(async () => {
  if (isLoggedIn.value && currentUser.value) {
    // await bookingStore.fetchProviderBookingsCount()
    await stripeStore.fetchUserSubscription()
  }
})

// Logout
const logout = async () => {
  try {
    await authStore.logOut()
    router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

// Upgrade handler
const upgradePlan = (stripePriceId: string) => {
  console.log('Upgrade logic for:', stripePriceId)
}
</script>
