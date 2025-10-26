<!-- src/components/ProviderCard.vue -->
<template>
  <div class="card card-compact bg-base-100 border border-base-300 hover:border-purple-500 transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden">
    <div class="card-body p-0 flex flex-col lg:flex-row lg:items-stretch">

      <div class="w-full lg:w-1/3 flex-shrink-0 relative overflow-hidden">
        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
             alt="Provider Image"
             class="w-full h-48 object-cover lg:h-full" />
        <button class="absolute top-4 right-4 btn btn-circle btn-sm backdrop-blur-sm bg-base-200/50 text-base-content/80 hover:bg-base-300/70">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
      </div>

      <div class="w-full lg:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-gray-900 font-bold text-xl">{{ provider.tradingName }}</h3>
            <div class="text-right flex flex-col items-end">
              <!-- Display Overall Provider Rating from Vuex Store -->
              <div v-if="overallStats && overallStats.overallProviderRating !== null && overallStats.overallProviderRating > 0" class="flex flex-col items-center">
                <div class="badge badge-lg badge-secondary font-semibold text-base-100">
                  {{ overallStats.overallProviderRating.toFixed(1) }}
                </div>
                <span class="text-xs text-gray-500 mt-1">({{ overallStats.totalProviderReviews || 0 }} reviews)</span>
              </div>
              <div v-else class="text-sm text-gray-500">
                No provider reviews yet
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span class="font-medium">{{ provider.address.locality }}, {{ provider.address.city }}</span>
            <span class="badge badge-outline badge-primary badge-sm text-purple-800">
              {{ (provider.distance / 1000).toFixed(1) }} km away
            </span>
          </div>

          <div class="divider my-3"></div>
          <h4 class="text-md font-semibold text-gray-700 mb-3">Available Services:</h4>
          <div class="space-y-4">
            <div v-for="service in provider.services" :key="service._id"
                 class="p-3 bg-base-200 rounded-lg w-full border border-base-300">
              <div class="flex justify-between items-start">
                <h5 class="font-medium text-gray-900">{{ service.serviceCategory }}</h5>
                <div class="flex flex-col items-end">
                    <span class="badge bg-purple-500 text-base-100 font-semibold">
                      {{ service.serviceRate }} {{ service.serviceCurrency }}/{{ service.servicePricingModel }}
                    </span>
                    <div v-if="service.averageServiceRating && service.averageServiceRating > 0" class="text-xs text-yellow-500 mt-1">
                        ⭐ {{ service.averageServiceRating.toFixed(1) }} ({{ service.serviceReviewsCount }} reviews)
                    </div>
                    <div v-else class="text-xs text-gray-500 mt-1">
                      No service reviews yet
                    </div>
                </div>
              </div>

              <p class="text-sm text-gray-600 mt-1 break-words">
                {{ service.serviceDescription }}
              </p>

              <div v-if="service.subCategory" class="mt-2">
                <div class="flex flex-wrap gap-1">
                  <span class="badge badge-sm badge-ghost">
                    {{ service.subCategory }}
                  </span>
                </div>
              </div>

              <div class="mt-4">
                <router-link :to="getBookingRoute(service)" class="inline-block w-full">
                  <button class="btn bg-purple-600 hover:bg-purple-700 text-base-100 w-full btn-sm">Book Now</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; // Import useRouter for getBookingRoute

const props = defineProps({
  provider: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const router = useRouter(); // Initialize router for getBookingRoute

// Fetch overall stats for this specific provider when the component mounts
onMounted(() => {
  if (props.provider && props.provider._id) {
    store.dispatch('providerStats/fetchProviderStats', props.provider._id);
  }
});

// Computed property to get the overall stats for THIS provider from the store
const overallStats = computed(() => {
  if (props.provider && props.provider._id) {
    return store.getters['providerStats/getStatsByProviderId'](props.provider._id);
  }
  return null;
});

// Re-use the getBookingRoute logic from searchResultsPage
const getBookingRoute = (service) => {
  if (!service || !service._id || !service.serviceProviderId) {
    console.warn('Invalid service object passed to getBookingRoute');
    return {name: 'Login'};
  }

  const bookingQuery = {
    serviceId: service._id,
    providerId: service.serviceProviderId,
  };

  // Access auth state from the main store
  const isLoggedIn = store.getters["auth/isAuthenticated"];

  if (!isLoggedIn) {
    return {
      name: 'Login',
      query: {
        redirectName: 'AddBooking',
        ...bookingQuery,
      }
    };
  }

  return {
    name: 'AddBooking',
    query: bookingQuery,
  };
};
</script>

<style scoped>
/* No specific styles needed here, as they are mostly inherited or Tailwind */
/* If you had specific styles for the card itself, they would go here */
</style>
