<template>

    <div class="card bg-base-100 shadow-xl rounded-box">
      <div class="card-body">
        <template v-if="isLoggedIn && user">
          <!-- Header Section -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div class="flex items-center gap-4">
              <!-- User Avatar -->
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-16 h-16">
                  <span class="text-xl font-bold">
                    {{ user.full_name?.charAt(0)?.toUpperCase() || 'U' }}
                  </span>
                </div>
              </div>

              <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ user.full_name || 'User Profile' }}</h2>
                <div class="flex items-center gap-4">
                  <p class="text-gray-500">Member since {{ formatMemberSince(user.created_at) }}</p>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span class="text-success text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Account Stats -->
            <div class="stats stats-vertical md:stats-horizontal shadow-lg bg-gray-50 mt-4 md:mt-0">
              <div class="stat place-items-center">
                <div class="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       class="inline-block w-8 h-8 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div class="stat-title">Account Status</div>
                <div class="stat-value text-primary text-sm">Active</div>
              </div>
              <div class="stat place-items-center">
                <div class="stat-figure text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       class="inline-block w-8 h-8 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="stat-title">Verified</div>
                <div class="stat-value text-success text-sm">Yes</div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <!-- Tab Navigation -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gray-100 dark:bg-gray-800 p-1 rounded-md mb-4 md:mb-0 inline-flex">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                class="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200"
                :class="activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
                @click="setActiveTab(tab.id)"
              >
                <svg :class="`w-4 h-4 mr-2 ${tab.iconClass}`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.iconPath"/>
                </svg>
                {{ tab.label }}
              </button>
            </div>

            <!-- Quick Actions -->
            <div class="flex gap-2">
              <button
                class="btn btn-outline btn-sm"
                @click="refreshProfile"
                :disabled="isRefreshing"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                     :class="{ 'animate-spin': isRefreshing }"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {{ isRefreshing ? 'Refreshing...' : 'Refresh' }}
              </button>
            </div>
          </div>

          <!-- Tab Content -->
          <div class="min-h-96">
            <!-- Profile Tab -->
            <div v-if="activeTab === 'profile'" class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>

              <!-- Profile Information Cards -->
              <div class="grid gap-4">
                <!-- Email Address -->
                <div class="group card bg-base-200/50 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
                  <div class="card-body p-6">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                        </div>
                        <div>
                          <p class="text-sm text-gray-500 font-medium">Email Address</p>
                          <p class="text-gray-800 font-medium">{{ user.email || 'Not provided' }}</p>
                        </div>
                      </div>
                      <button class="btn btn-ghost btn-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Phone Number -->
                <div class="group card bg-base-200/50 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
                  <div class="card-body p-6">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                          <svg class="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                        </div>
                        <div>
                          <p class="text-sm text-gray-500 font-medium">Mobile Number</p>
                          <p class="text-gray-800 font-medium">{{ user.phone_number || 'Not provided' }}</p>
                        </div>
                      </div>
                      <button class="btn btn-ghost btn-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Address -->
                <div class="group card bg-base-200/50 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
                  <div class="card-body p-6">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
                          <svg class="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                        </div>
                        <div>
                          <p class="text-sm text-gray-500 font-medium">Residential Address</p>
                          <p class="text-gray-800 font-medium">{{ user.address?.formatted || 'Not provided' }}</p>
                        </div>
                      </div>
                      <button class="btn btn-ghost btn-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Methods Tab -->
            <div v-else-if="activeTab === 'payment'" class="text-center py-16">
              <div class="max-w-md mx-auto">
                <div class="relative mb-8">
                  <div class="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  </div>
                  <div class="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                </div>

                <h3 class="text-2xl font-bold text-gray-800 mb-3">No payment methods yet</h3>
                <p class="text-gray-600 mb-8 leading-relaxed">
                  Add a payment method to make transactions easier and more secure.
                </p>

                <button class="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Payment Method
                </button>
              </div>
            </div>

            <!-- Preferences Tab -->
            <div v-else-if="activeTab === 'preferences'" class="text-center py-16">
              <div class="max-w-md mx-auto">
                <div class="relative mb-8">
                  <div class="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-info/20 to-warning/20 flex items-center justify-center">
                    <svg class="w-12 h-12 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                </div>

                <h3 class="text-2xl font-bold text-gray-800 mb-3">No preferences set</h3>
                <p class="text-gray-600 mb-8 leading-relaxed">
                  Customize your experience by setting your preferences.
                </p>

                <button class="btn btn-info btn-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Set Preferences
                </button>
              </div>
            </div>

            <!-- Security Tab -->
            <div v-else-if="activeTab === 'security'" class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Security & Privacy</h3>

              <!-- Security Status Card -->
              <div class="card bg-success/5 border border-success/20">
                <div class="card-body p-6">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                      <svg class="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-success">Account Secure</h4>
                      <p class="text-success/80">No security issues detected. Your account is protected.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Security Actions -->
              <div class="grid gap-4">
                <button class="btn btn-outline justify-start p-6 h-auto">
                  <div class="flex items-center gap-4 w-full">
                    <div class="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <div class="text-left">
                      <p class="font-medium">Change Password</p>
                      <p class="text-sm text-gray-500">Update your account password</p>
                    </div>
                  </div>
                </button>

                <button class="btn btn-outline justify-start p-6 h-auto">
                  <div class="flex items-center gap-4 w-full">
                    <div class="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div class="text-left">
                      <p class="font-medium">Two-Factor Authentication</p>
                      <p class="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                </button>

                <!-- Danger Zone -->
                <div class="card bg-error/5 border border-error/20 mt-8">
                  <div class="card-body p-6">
                    <h4 class="text-lg font-semibold text-error mb-4">Danger Zone</h4>
                    <button
                      @click="confirmDeleteAccount"
                      class="btn btn-error btn-outline"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Delete Account
                    </button>
                    <p class="text-sm text-error/70 mt-2">This action cannot be undone.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Not Logged In State -->
        <template v-else>
          <div class="text-center py-16">
            <div class="max-w-md mx-auto">
              <div class="relative mb-8">
                <div class="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-warning/20 to-error/20 flex items-center justify-center">
                  <svg class="w-12 h-12 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
              </div>

              <h3 class="text-2xl font-bold text-gray-800 mb-3">Login Required</h3>
              <p class="text-gray-600 mb-8 leading-relaxed">
                Please log in to view and manage your account details.
              </p>

              <router-link
                :to="{ name: 'Login' }"
                class="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                Login to Continue
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'
import { useStripeStore } from '@/stores/stripeStore';


// Access Pinia store and route
const authStore = useAuthStore();
const stripeStore = useStripeStore();

const route = useRoute();
const router = useRouter();

// Track the active tab
const activeTab = ref('profile');
const isRefreshing = ref(false);

// Tab configuration
const tabs = [
  {
    id: 'profile',
    label: 'Profile',
    iconClass: 'text-primary',
    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    id: 'payment',
    label: 'Payment Methods',
    iconClass: 'text-success',
    iconPath: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
  },
  {
    id: 'preferences',
    label: 'Preferences',
    iconClass: 'text-info',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 00-1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z'
  },
  {
    id: 'security',
    label: 'Security',
    iconClass: 'text-warning',
    iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
  }
];

// Function to set the active tab
const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

// Reactive properties
const user = computed(() => authStore.user);
const isLoggedIn = computed(() => authStore.isAuthenticated);

// Helper functions
const formatMemberSince = (dateStr?: string) => {
  if (!dateStr) return 'Recently';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

const refreshProfile = async () => {
  isRefreshing.value = true;
  try {
    await authStore.viewUser();
    if (isLoggedIn.value && user.value) {
      await authStore.fetchUserSubscription();
    }
  } catch (error) {
    console.error("Error refreshing profile:", error);
  } finally {
    isRefreshing.value = false;
  }
};

const confirmDeleteAccount = () => {
  if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    deleteAccount();
  }
};

onMounted(() => {
  authStore.viewUser();
  if (isLoggedIn.value && user.value) {
    stripeStore.fetchUserSubscription();
  }
});

// Methods
const deleteAccount = async () => {
  try {
    if (!user.value?._id) return;
    await authStore.deleteUser(user.value._id);
    await authStore.logOut();
    router.push('/');
  } catch (error) {
    console.error(error);
  }
};
</script>
