<template>
  <section v-if="isLoggedIn && currentUser"
           class="bg-base-100 text-base-content border border-base-300 px-4 py-3 mb-6 mt-6 rounded-md"
  >

    <div class="flex items-center justify-between">
      <!-- Breadcrumb Navigation -->
      <div class="flex items-center">
        <nav class="flex items-center space-x-1 text-sm">
          <template v-for="(route, index) in breadcrumbRoutes" :key="index">
            <router-link
                v-if="index !== breadcrumbRoutes.length - 1"
                :to="{ name: route.name, params: $route.params }"
                class="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400
                     transition-colors duration-200 font-medium"
                :class="{ 'text-gray-500 dark:text-gray-500': index === 0 }"
            >
              {{ route.label }}
            </router-link>
            <span v-else class="text-gray-900 dark:text-white font-medium">
              {{ route.label }}
            </span>

            <!-- Separator -->
            <i v-if="index !== breadcrumbRoutes.length - 1"
               class="fas fa-chevron-right text-gray-400 dark:text-gray-500 text-xs mx-1"></i>
          </template>
        </nav>
      </div>

      <!-- User Info Section -->
      <div class="flex items-center gap-3">
        <!-- User Role Badge -->
        <span v-if="isProvider"
              class="inline-flex items-center gap-1.5 bg-base-200 dark:bg-base-300 text-purple-700
       px-3 py-1 rounded-full text-sm font-medium">

          <i class="fas fa-tools text-xs"></i>
          Provider
        </span>
        <span v-else
              class="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400
                     px-3 py-1 rounded-full text-sm font-medium">
          <i class="fas fa-search text-xs"></i>
          Seeker
        </span>

        <!-- User Account Link -->
        <router-link to="/account"
                     class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                            transition-colors duration-200 flex items-center gap-1">
          <i class="fas fa-user-circle text-gray-500 dark:text-gray-400"></i>
          <span class="font-medium">{{ currentUser?.full_name || 'User' }}</span>
          <span class="text-gray-400 dark:text-gray-500">•</span>
          <span class="text-xs">Member since {{ currentUser.created_at }}</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
// import {useStore} from 'vuex';
// import {breadcrumbMap} from '@assets/js/breadcrumbMap.js'
import {useAuthFlags} from '@/composables/useAuthFlags';

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
  providerStatus,
  needsEmailVerification,
} = useAuthFlags();


// const store = useStore();
const route = useRoute();
const router = useRouter();


// Fetch services and categories on mount
onMounted(async () => {
  if (isLoggedIn.value) {
    // await store.dispatch("fetchUserSubscription");
  }
});

// const currentUserPlan = computed(() => store.getters.getCurrentPlan);


// Extract all plan details safely

// Service limit exponent mapping
// const exponentMap = {1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵"};
// const serviceLimitExponent = computed(() => exponentMap[currentUserPlan.value.limit] || "");

// Resolve breadcrumbs from the matched routes
// Define the computed property for breadcrumb routes
const breadcrumbRoutes = computed(() => {
  const routes = [];

  // Check for parent breadcrumb (for editing/creating)
  if (route.name === 'ListBooking' || route.name === 'AddBooking' || route.name === 'EditBooking') {
    routes.push({
      name: 'ListBookings',
      label: breadcrumbMap['ListBookings'],
      path: '/bookings',
    });
  }

  if (route.name === 'ListService' || route.name === 'AddService' || route.name === 'EditService') {
    routes.push({
      name: 'ListServices',
      label: breadcrumbMap['ListServices'],
      path: '/services',
    });
  }

  // Handle the current route (dynamic or static breadcrumb label)
  if (breadcrumbMap[route.name]) {
    const label =
        typeof breadcrumbMap[route.name] === 'function'
            ? breadcrumbMap[route.name](route)
            : breadcrumbMap[route.name]; // Static or dynamic

    routes.push({
      name: route.name,
      label,
      path: route.fullPath, // Full path for the current route
    });
  }

  return routes;
});
</script>
