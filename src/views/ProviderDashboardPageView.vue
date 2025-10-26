<template>
  <section class="mr-3" v-if="isLoggedIn && currentUser">
    <!-- Background Elements -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-purple-800/2 via-transparent to-orange-400/2 pointer-events-none"></div>

    <!-------------------------------------------------------------------------------->
    <!--                        Dashboard Header                                    -->
    <!-------------------------------------------------------------------------------->

    <div class="mb-6 relative">
      <h2 class="text-lg font-semibold text-base-content ">Dashboard</h2>
      <p class="text-sm text-base-content/60">Quick access to your account sections</p>
    </div>

    <!-------------------------------------------------------------------------------->
    <!--                        Dashboard Card Navigation                           -->
    <!-------------------------------------------------------------------------------->

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      <!-- Products Card -->
      <router-link
          :to="{ name: 'MyProducts' }"
          class="group bg-base-100 rounded-xl p-4 border border-base-300 hover:border-purple-800/20 hover:bg-purple-800/2 transition-all duration-300 cursor-pointer relative overflow-hidden"
      >
        <div class="absolute top-0 right-0 w-16 h-16 bg-purple-800/3 rounded-full -translate-y-8 translate-x-8"></div>
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <div
                class="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center group-hover:bg-purple-800/10 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-5 w-5 text-base-content/70 group-hover:text-purple-800 transition-colors" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <!-- Icon: Shopping Bag/Products -->
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-sm text-base-content group-hover:text-purple-800 transition-colors">Products</h3>
          </div>
          <p class="text-sm text-base-content/60">Manage your product catalog</p>
        </div>
      </router-link>

      <!-- Reviews Card -->
<!--      <router-link-->
<!--          :to="{ name: 'ListRatings' }"-->
<!--          class="group bg-base-100 rounded-xl p-4 border border-base-300 hover:border-orange-400/20 hover:bg-orange-400/2 transition-all duration-300 cursor-pointer relative overflow-hidden"-->
<!--      >-->
<!--        <div class="absolute top-0 right-0 w-16 h-16 bg-orange-400/3 rounded-full -translate-y-8 translate-x-8"></div>-->
<!--        <div class="relative">-->
<!--          <div class="flex items-center gap-3 mb-3">-->
<!--            <div-->
<!--                class="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center group-hover:bg-orange-400/10 transition-colors duration-200">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg"-->
<!--                   class="h-5 w-5 text-base-content/70 group-hover:text-orange-400 transition-colors" fill="none"-->
<!--                   viewBox="0 0 24 24" stroke="currentColor">-->
<!--                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>-->
<!--              </svg>-->
<!--            </div>-->
<!--            <h3 class="font-semibold text-sm text-base-content group-hover:text-orange-400 transition-colors">Reviews</h3>-->
<!--          </div>-->
<!--          <p class="text-sm text-base-content/60">View and manage customer feedback</p>-->
<!--        </div>-->
<!--      </router-link>-->

      <!-- Orders Card (Replaced Bookings) -->
<!--      <router-link-->
<!--          :to="{ name: 'ListOrders' }"-->
<!--          class="group bg-base-100 rounded-xl p-4 border border-base-300 hover:border-base-content/20 hover:bg-base-200/50 transition-all duration-300 cursor-pointer relative overflow-hidden"-->
<!--      >-->
<!--        <div class="absolute top-0 right-0 w-16 h-16 bg-base-content/3 rounded-full -translate-y-8 translate-x-8"></div>-->
<!--        <div class="relative">-->
<!--          <div class="flex items-center gap-3 mb-3">-->
<!--            <div-->
<!--                class="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center group-hover:bg-base-content/10 transition-colors duration-200">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg"-->
<!--                   class="h-5 w-5 text-base-content/70 group-hover:text-base-content transition-colors" fill="none"-->
<!--                   viewBox="0 0 24 24" stroke="currentColor">-->
<!--                &lt;!&ndash; Icon: Clipboard/Orders &ndash;&gt;-->
<!--                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M13 16h.01"/>-->
<!--              </svg>-->
<!--            </div>-->
<!--            <h3 class="font-semibold text-sm text-base-content group-hover:text-base-content transition-colors">Orders</h3>-->
<!--          </div>-->
<!--          <p class="text-sm text-base-content/60">Track and manage customer orders</p>-->
<!--        </div>-->
<!--      </router-link>-->

      <!-- Inventory Card (Replaced Schedule) -->
<!--      <router-link-->
<!--          :to="{ name: 'ProductInventory' }"-->
<!--          class="group bg-base-100 rounded-xl p-4 border border-base-300 hover:border-purple-800/20 hover:bg-purple-800/2 transition-all duration-300 cursor-pointer relative overflow-hidden"-->
<!--      >-->
<!--        <div class="absolute top-0 right-0 w-16 h-16 bg-purple-800/3 rounded-full -translate-y-8 translate-x-8"></div>-->
<!--        <div class="relative">-->
<!--          <div class="flex items-center gap-3 mb-3">-->
<!--            <div-->
<!--                class="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center group-hover:bg-purple-800/10 transition-colors duration-200">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg"-->
<!--                     class="h-5 w-5 text-base-content/70 group-hover:text-purple-800 transition-colors" fill="none"-->
<!--                     viewBox="0 0 24 24" stroke="currentColor">-->
<!--                  &lt;!&ndash; Icon: Box/Inventory &ndash;&gt;-->
<!--                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m-8 4L4 17l4-2.5V7"/>-->
<!--                </svg>-->
<!--            </div>-->
<!--            <h3 class="font-semibold text-sm text-base-content group-hover:text-purple-800 transition-colors">Inventory</h3>-->
<!--          </div>-->
<!--          <p class="text-sm text-base-content/60">Manage stock levels and warehousing</p>-->
<!--        </div>-->
<!--      </router-link>-->

      <!-- Account Card -->
<!--      <router-link-->
<!--          :to="{ name: 'ListAccount' }"-->
<!--          class="group bg-base-100 rounded-xl p-4 border border-base-300 hover:border-base-content/20 hover:bg-base-200/50 transition-all duration-300 cursor-pointer relative overflow-hidden"-->
<!--      >-->
<!--        <div class="absolute top-0 right-0 w-16 h-16 bg-base-content/3 rounded-full -translate-y-8 translate-x-8"></div>-->
<!--        <div class="relative">-->
<!--          <div class="flex items-center gap-3 mb-3">-->
<!--            <div-->
<!--                class="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center group-hover:bg-base-content/10 transition-colors duration-200">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg"-->
<!--                   class="h-5 w-5 text-base-content/70 group-hover:text-base-content transition-colors" fill="none"-->
<!--                   viewBox="0 0 24 24" stroke="currentColor">-->
<!--                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>-->
<!--              </svg>-->
<!--            </div>-->
<!--            <h3 class="font-semibold text-sm text-base-content group-hover:text-base-content transition-colors">Profile</h3>-->
<!--          </div>-->
<!--          <p class="text-sm text-base-content/60">Update your account information</p>-->
<!--        </div>-->
<!--      </router-link>-->

      <!-- Subscriptions Card -->
      <router-link
          :to="{ name: 'ListSubscriptions' }"
          class="group bg-base-100 rounded-xl p-4 border border-base-300 hover:border-orange-400/20 hover:bg-orange-400/2 transition-all duration-300 cursor-pointer relative overflow-hidden"
      >
        <div class="absolute top-0 right-0 w-16 h-16 bg-orange-400/3 rounded-full -translate-y-8 translate-x-8"></div>
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <div
                class="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center group-hover:bg-orange-400/10 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-5 w-5 text-base-content/70 group-hover:text-orange-400 transition-colors" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </div>
            <h3 class="font-semibold text-sm text-base-content group-hover:text-orange-400 transition-colors">Subscription</h3>
          </div>
          <p class="text-sm text-base-content/60">Manage your subscription plan</p>
        </div>
      </router-link>

      <!-- Invoices Card -->
      <router-link
          :to="{ name: 'ListInvoices' }"
          class="group bg-base-100 rounded-xl p-4 border border-base-300 hover:border-base-content/20 hover:bg-base-200/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
      >
        <div class="absolute top-0 right-0 w-16 h-16 bg-base-content/3 rounded-full -translate-y-8 translate-x-8"></div>
        <div class="relative">
          <div class="flex items-center gap-3 mb-3">
            <div
                class="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center group-hover:bg-base-content/10 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-5 w-5 text-base-content/70 group-hover:text-base-content transition-colors" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-sm text-base-content group-hover:text-base-content transition-colors">Invoices</h3>
          </div>
          <p class="text-sm text-base-content/60">View billing history and invoices</p>
        </div>
      </router-link>

      <!-- Add Product Card (Replaced Add Service) -->
      <router-link
          :to="{ name: 'CreateProduct' }"
          class="group bg-base-100 rounded-xl p-4 border-2 border-dashed border-base-300 hover:border-purple-800/30 hover:bg-purple-800/2 transition-all duration-300 cursor-pointer relative overflow-hidden"
      >
        <div class="absolute top-0 right-0 w-16 h-16 bg-purple-800/3 rounded-full -translate-y-8 translate-x-8"></div>
        <div class="relative flex flex-col items-center justify-center text-center h-full min-h-[100px]">
          <div
              class="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-800/10 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-5 w-5 text-base-content/40 group-hover:text-purple-800 transition-colors" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <h3 class="font-semibold text-sm text-base-content/70 group-hover:text-purple-800 transition-colors mb-1">Add New
            Product</h3>
          <p class="text-sm text-base-content/50">List a new item for sale</p>
        </div>
      </router-link>
    </div>

    <!-------------------------------------------------------------------------------->
    <!--                        Performance Overview Section                        -->
    <!-------------------------------------------------------------------------------->

    <div class="mt-8">
      <h3 class="text-lg font-semibold mb-4 text-base-content/60 ">Performance Overview</h3>

      <!-- Main Stats Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <!-- Products Overview -->
        <div class="bg-base-100 p-5 rounded-xl border border-base-300 relative overflow-hidden">
          <div
              class="absolute top-0 right-0 w-20 h-20 bg-purple-800/3 rounded-full -translate-y-10 translate-x-10"></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-semibold text-sm text-base-content">Products Overview</h4>
              <div class="w-8 h-8 bg-purple-800/10 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-800" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4m11 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3"/>
                </svg>
              </div>
            </div>

            <div class="flex items-end justify-between">
              <div>
<!--                <p class="text-3xl font-bold text-base-content">{{ userProducts.length }}</p>-->
                <p class="text-base-content/60 mt-1">Active Products</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Ratings Summary -->
        <div class="bg-base-100 p-5 rounded-xl border border-base-300 relative overflow-hidden">
          <div
              class="absolute top-0 right-0 w-20 h-20 bg-orange-400/3 rounded-full -translate-y-10 translate-x-10"></div>
          <div class="relative">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-semibold text-sm text-base-content">Ratings Summary</h4>
              <div class="w-8 h-8 bg-orange-400/10 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="bg-orange-400/5 p-3 rounded-lg border border-orange-400/10">
                <div class="flex items-center mb-2">
                  <span class="text-sm font-medium text-base-content">Provider</span>
                </div>
                <div class="flex items-end">
                  <span class="text-2xl font-bold text-base-content">{{ currentUser.overallProviderRating }}</span>
                  <span class="text-base-content/60 ml-1 mb-1">/3</span>
                </div>
                <p class="text-xs text-base-content/50 mt-1">Based on {{ currentUser.totalProviderReviews }} reviews</p>
              </div>

              <div class="bg-purple-800/5 p-3 rounded-lg border border-purple-800/10">
                <div class="flex items-center mb-2">
                  <span class="text-sm font-medium text-base-content">Products</span>
                </div>
                <!-- NOTE: Assuming userProducts and aggregatedRatings are defined in the script -->
                <div class="flex items-end">
<!--                  <span class="text-2xl font-bold text-base-content">{{ aggregatedRatings.averageProductRating }}</span>-->
                  <span class="text-base-content/60 ml-1 mb-1">/3</span>
                </div>
<!--                <p class="text-xs text-base-content/50 mt-1">Based on {{ aggregatedRatings.productReviewsCount }}-->
<!--                  reviews</p>-->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Orders (Replaced Bookings) -->
        <div class="bg-base-100 p-4 rounded-xl border border-base-300 flex items-center relative overflow-hidden">
          <div
              class="absolute top-0 right-0 w-16 h-16 bg-base-content/3 rounded-full -translate-y-8 translate-x-8"></div>
          <div class="relative flex items-center w-full">
            <div class="w-10 h-10 bg-base-200 rounded-lg flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-base-content/70" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M13 16h.01"/>
              </svg>
            </div>
            <div>
              <h5 class="font-semibold text-sm text-base-content">Orders</h5>
<!--              <p class="text-xl font-bold text-base-content">{{ totalOrdersCount }}</p>-->
              <p class="text-xs text-base-content/60">Total customer orders</p>
            </div>
          </div>
        </div>

        <!-- Total Provider Reviews (Kept) -->
        <div class="bg-base-100 p-4 rounded-xl border border-base-300 flex items-center relative overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-orange-400/3 rounded-full -translate-y-8 translate-x-8"></div>
          <div class="relative flex items-center w-full">
            <div class="w-10 h-10 bg-orange-400/10 rounded-lg flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
            </div>
            <div>
              <h5 class="font-semibold text-sm text-base-content">Total Store Reviews</h5>
              <p class="text-xl font-bold text-base-content">{{ currentUser.totalProviderReviews }}</p>
              <p class="text-xs text-base-content/60">Overall customer feedback</p>
            </div>
          </div>
        </div>

        <!-- Total Product Reviews (Replaced Total Service Reviews) -->
        <div class="bg-base-100 p-4 rounded-xl border border-base-300 flex items-center relative overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-purple-800/3 rounded-full -translate-y-8 translate-x-8"></div>
          <div class="relative flex items-center w-full">
            <div class="w-10 h-10 bg-purple-800/10 rounded-lg flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-800" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </div>
            <div>
              <h5 class="font-semibold text-sm text-base-content">Total Product Reviews</h5>
<!--              <p class="text-xl font-bold text-base-content">{{ aggregatedRatings.productReviewsCount }}</p>-->
              <p class="text-xs text-base-content/60">Product-specific feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthFlags } from '@/composables/useAuthFlags'
import {useStripeStore} from "@/stores/stripeStore.ts";
// import { useRatingStore } from '@/stores/ratingStore'

const route = useRoute()
const router = useRouter()

// Auth state flags
const {
  isLoggedIn,
  isVerified,
  isProvider,
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

// Pinia stores
// const serviceStore = useServiceStore()
// const bookingStore = useBookingStore()
// const ratingStore = useRatingStore()

// Reactive data
// const form = ref({
//   serviceDescription: '',
//   serviceCategory: '',
//   serviceLocation: '',
// })

// On mount: fetch data
onMounted(async () => {
  // await ratingStore.getAggregateRatings()

  if (isLoggedIn.value) {
    // await serviceStore.getUserServices()
    // Optionally: bookingStore.fetchMyBookings()
    //useStripeStore.fetchAllSubscriptions()
  }
})

// Computed properties
// const userServices = computed(() => serviceStore.userServices)
// const myBookings = computed(() => bookingStore.myBookings)
// const aggregatedRatings = computed(() => ratingStore.aggregatedRatings)
</script>

