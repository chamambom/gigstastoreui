<template>
  <section class="relative z-10 mx-auto py-4">
    <!-- Welcome Header -->
    <section v-if="isLoggedIn && isSeeker"
             class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 bg-base-100 p-4 rounded-md">
      <div class="flex items-center space-x-4 mb-4 md:mb-0">
        <div
            class="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
              <span class="text-primary font-bold text-lg">
                {{ (currentUser?.full_name || currentUser?.email || 'U').charAt(0).toUpperCase() }}
              </span>
        </div>
        <div>
          <h1 class="text-3xl font-semibold text-base-content">Welcome back,
            {{ currentUser?.full_name || currentUser?.email }}!</h1>
          <p class="text-gray-500">Ready to book your next service? Let's find something perfect for you.</p>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats stats-vertical md:stats-horizontal shadow-lg bg-gray-50">
        <div class="stat place-items-center">
          <div class="stat-figure text-orange-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div class="stat-title text-gray-800 dark:text-gray-800">Bookings</div>
<!--          <div class="stat-value text-orange-400 text-lg">{{ recentBookings.length }}</div>-->
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-else-if="!isLoggedIn" class="text-center py-16">
      <div class="max-w-md mx-auto">
        <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Loading your personalized experience...</h3>
        <p class="text-gray-600">Please wait while we prepare your dashboard.</p>
      </div>
    </div>

    <div class="divider"></div>


    <!-- Smart Search Section -->
    <section class="space-y-6">

      <div class="flex items-center mb-6">
        <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-base-content">Find Services Near You</h2>
      </div>
      <SmartSearch :isLoggedIn="isLoggedIn" :user="currentUser"/>

    </section>

    <!-- Recent Bookings Section -->
    <section class="space-y-6 my-4">
      <div class="bg-white rounded-md shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Your Recent Bookings</h2>
          </div>

<!--          <div v-if="recentBookings.length > 0" class="badge badge-primary badge-lg">-->
<!--            {{ recentBookings.length }} recent-->
<!--          </div>-->
        </div>

<!--        <div v-if="recentBookings.length > 0" class="space-y-4">-->
<!--          <div v-for="booking in recentBookings" :key="booking._id"-->
<!--               class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">-->
<!--            <div class="flex items-start justify-between mb-3">-->
<!--              <div class="flex items-center space-x-4">-->
<!--                <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">-->
<!--                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>-->
<!--                  </svg>-->
<!--                </div>-->
<!--                <div>-->
<!--                  <h3 class="font-semibold text-gray-800">{{ getDisplayName(booking) }}</h3>-->
<!--                  <div class="flex items-center space-x-2 text-sm text-gray-600 mt-1">-->
<!--                <span class="badge badge-primary badge-sm">-->
<!--                  {{ booking.providerServiceInfo?.serviceCategoryName }}-->
<!--                </span>-->
<!--                  </div>-->
<!--                  <div class="flex items-center space-x-2 text-sm text-gray-600 mt-2">-->
<!--                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>-->
<!--                    </svg>-->
<!--                    <span>{{ formatDate(booking.bookingDate) }}</span>-->
<!--                    <span v-if="booking.bookingTime" class="text-primary font-medium">-->
<!--                  at {{ booking.bookingTime }}-->
<!--                </span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->

<!--              <div class="text-right">-->
<!--            <span :class="['badge badge-lg font-bold', getStatusClass(booking)]">-->
<!--              {{ formatStatus(booking) }}-->
<!--            </span>-->
<!--              </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; Additional booking details &ndash;&gt;-->
<!--            <div v-if="booking.providerServiceInfo?.subCategoryName" class="text-sm text-gray-600 mb-2 ml-14">-->
<!--              {{ booking.providerServiceInfo.subCategoryName }}-->
<!--            </div>-->

<!--            &lt;!&ndash; Quick action for bookings that need attention &ndash;&gt;-->
<!--            <div v-if="booking.bookingStatus === 'pending' && booking.userType === 'provider'"-->
<!--                 class="flex gap-2 ml-14">-->
<!--              <button class="btn btn-outline btn-xs btn-success">Accept</button>-->
<!--              <button class="btn btn-outline btn-xs btn-error">Reject</button>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="flex justify-center mt-6">-->
<!--            <button @click="goToMyBookings"-->
<!--                    class="btn btn-outline btn-lg shadow-lg hover:shadow-xl transition-all duration-200">-->
<!--              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>-->
<!--                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>-->
<!--              </svg>-->
<!--              View All Bookings-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div v-else class="text-center py-12">-->
<!--          <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">-->
<!--            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>-->
<!--            </svg>-->
<!--          </div>-->
<!--          <h3 class="text-lg font-semibold text-gray-800 mb-2">No bookings yet</h3>-->
<!--          <p class="text-gray-600 mb-4">Start by searching for services above and book your first service!</p>-->
<!--          <button class="btn btn-outline btn-primary">-->
<!--            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>-->
<!--            </svg>-->
<!--            Browse Services-->
<!--          </button>-->
<!--        </div>-->
      </div>
    </section>

    <!-- Become Provider Section -->
    <section v-if="!isProvider" class="space-y-6 my-4">
      <div class="bg-white rounded-md shadow-sm border border-gray-100 p-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="flex-1 mb-6 lg:mb-0">
            <div class="flex items-center mb-4">
              <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Want to Offer Services Too?</h2>
            </div>

            <p class="text-gray-600 mb-4 max-w-2xl">
              Ready to share your skills and earn extra income? Join thousands of providers and start listing your
              services today.
            </p>

            <!-- Benefits list -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm text-gray-600">Flexible schedule</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm text-gray-600">Secure payments</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span class="text-sm text-gray-600">Build reputation</span>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="flex-shrink-0">
            <button @click="proceedAsProvider"
                    class="btn bg-orange-400 btn-lg text-base-100 shadow-lg hover:shadow-xl transition-all duration-200 rounded-full">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
              Become a GigSta
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Recommended Services Section -->
    <section class="space-y-6">
      <div class="bg-white rounded-md shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-800">Recommended for You</h2>
              <p class="text-gray-500 text-sm">Based on your activity and preferences</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Sample service card -->
          <!--            <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">-->
          <!--              <div class="flex items-center space-x-3 mb-3">-->
          <!--                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">-->
          <!--                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
          <!--                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
          <!--                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>-->
          <!--                  </svg>-->
          <!--                </div>-->
          <!--                <div class="flex-1">-->
          <!--                  <h3 class="font-semibold text-gray-800">Gardening Service</h3>-->
          <!--                  <div class="flex items-center space-x-2 text-sm text-gray-600">-->
          <!--                    <div class="flex items-center space-x-1">-->
          <!--                      <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">-->
          <!--                        <path-->
          <!--                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>-->
          <!--                      </svg>-->
          <!--                      <span>4.8</span>-->
          <!--                    </div>-->
          <!--                    <span>•</span>-->
          <!--                    <span>32 reviews</span>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->

          <!--              <p class="text-gray-600 mb-4 text-sm">Professional gardening and landscaping services for your home and-->
          <!--                garden needs.</p>-->

          <!--              <div class="flex items-center justify-between">-->
          <!--                <div class="text-lg font-semibold text-primary">From $45/hr</div>-->
          <!--                <button class="btn btn-primary btn-sm">View Details</button>-->
          <!--              </div>-->
          <!--            </div>-->

          <div
              class="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <div class="text-center">
              <div class="w-10 h-10 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 class="font-medium text-gray-600 mb-2">Recommended Services</h3>
              <p class="text-sm text-gray-500">Coming soon based on your Activity</p>
            </div>
          </div>

          <!-- Placeholder cards -->
          <div
              class="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <div class="text-center">
              <div class="w-10 h-10 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 class="font-medium text-gray-600 mb-2">More Services</h3>
              <p class="text-sm text-gray-500">Coming soon based on your preferences</p>
            </div>
          </div>

          <div
              class="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <div class="text-center">
              <div class="w-10 h-10 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 class="font-medium text-gray-600 mb-2">AI Recommendations</h3>
              <p class="text-sm text-gray-500">Personalized suggestions</p>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8">
          <button class="btn btn-outline btn-primary btn-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Browse All Services
          </button>
        </div>
      </div>
    </section>
  </section>
</template>


<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useAuthFlags } from '@/composables/useAuthFlags'

// Composables
const router = useRouter()
const authStore = useAuthStore()
const { isLoggedIn, isProvider, isSeeker, hasBasicProfile, currentUser } = useAuthFlags()

// Navigation
const proceedAsProvider = () => {
  router.push('/onboarding/provider-details')
}

</script>
