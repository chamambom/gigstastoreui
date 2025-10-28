<template>
  <section class="relative z-10 mx-auto py-6 px-4 max-w-8xl">

    <!-- Welcome Hero Section -->
    <section v-if="isLoggedIn" class="mb-8">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between p-6 md:p-8">
          <!-- User Greeting -->
          <div class="flex items-center space-x-4 mb-6 md:mb-0">
            <div class="w-16 h-16 rounded-2xl bg-orange-400 flex items-center justify-center shadow-md">
              <span class="text-white font-bold text-2xl">
                {{ (currentUser?.full_name || currentUser?.email || 'U').charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">
                Welcome back, {{ currentUser?.full_name || currentUser?.email }}!
              </h1>
              <p class="text-gray-600 mt-1">Discover authentic African products and connect with amazing sellers</p>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="flex gap-4">
            <div class="bg-orange-50 rounded-xl p-4 text-center border border-orange-100 min-w-[120px]">
              <div class="flex items-center justify-center mb-2">
                <i class="fas fa-shopping-bag text-orange-400 text-2xl"></i>
              </div>
              <div class="text-2xl font-bold text-gray-900">0</div>
              <div class="text-xs text-gray-600 font-medium">Orders</div>
            </div>

            <div class="bg-primary/10 rounded-xl p-4 text-center border border-primary/20 min-w-[120px]">
              <div class="flex items-center justify-center mb-2">
                <i class="fas fa-heart text-primary text-2xl"></i>
              </div>
              <div class="text-2xl font-bold text-gray-900">0</div>
              <div class="text-xs text-gray-600 font-medium">Favorites</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Guest Welcome Banner -->
    <section v-else class="mb-8">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-8 text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-4">
            <i class="fas fa-store text-orange-400 text-3xl"></i>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-3">
            Discover African Treasures
          </h1>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Shop authentic African fashion, beauty, food, art, and more from small businesses across Australia & New
            Zealand
          </p>
          <div class="flex justify-center gap-3">
            <button class="btn bg-orange-400 text-white border-none hover:bg-orange-500 rounded-xl px-6">
              <i class="fas fa-user-plus text-sm mr-2"></i>
              Sign Up to Shop
            </button>
            <button class="btn btn-outline border-gray-300 hover:bg-gray-50 rounded-xl px-6">
              <i class="fas fa-search text-sm mr-2"></i>
              Browse Products
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Search Section - The Star of the Show -->
    <section class="mb-8">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div class="mb-8">
          <!-- Header Section -->
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-3">Find What You're Looking For</h2>
            <p class="text-gray-600 text-lg">Search by product name, category, seller, or location</p>
          </div>

          <!-- Expanded Search Bar with Integrated Icon -->
          <div class="max-w-4xl mx-auto">
            <div class="relative">
              <div class="absolute left-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <i class="fas fa-search text-gray-400 text-xl"></i>
              </div>
              <div class="pl-12">
                <Search/>
              </div>
            </div>
          </div>
        </div>

        <!-- Popular Searches -->
        <div class="mt-6">
          <p class="text-sm text-gray-600 mb-3 text-center">Popular searches:</p>
          <div class="flex flex-wrap justify-center gap-2">
            <button
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
              <i class="fas fa-tshirt text-orange-400 text-xs mr-1.5"></i>
              African Fashion
            </button>
            <button
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
              <i class="fas fa-pump-soap text-orange-400 text-xs mr-1.5"></i>
              Hair Products
            </button>
            <button
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
              <i class="fas fa-leaf text-orange-400 text-xs mr-1.5"></i>
              Natural Skincare
            </button>
            <button
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
              <i class="fas fa-drumstick-bite text-orange-400 text-xs mr-1.5"></i>
              African Spices
            </button>
            <button
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
              <i class="fas fa-palette text-orange-400 text-xs mr-1.5"></i>
              Art & Crafts
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop by Category Section -->
    <section class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <i class="fas fa-th text-primary text-lg"></i>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <p class="text-sm text-gray-600">Browse our curated collections</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <!-- Fashion & Accessories -->
        <div
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
          <div class="flex flex-col items-center text-center">
            <div
                class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <i class="fas fa-tshirt text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">Fashion</h3>
            <p class="text-xs text-gray-600">Clothing & Accessories</p>
          </div>
        </div>

        <!-- Beauty & Hair -->
        <div
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
          <div class="flex flex-col items-center text-center">
            <div
                class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <i class="fas fa-pump-soap text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">Beauty</h3>
            <p class="text-xs text-gray-600">Hair & Skincare</p>
          </div>
        </div>

        <!-- Food & Spices -->
        <div
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
          <div class="flex flex-col items-center text-center">
            <div
                class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <i class="fas fa-drumstick-bite text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">Food</h3>
            <p class="text-xs text-gray-600">Snacks & Spices</p>
          </div>
        </div>

        <!-- Art & Crafts -->
        <div
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
          <div class="flex flex-col items-center text-center">
            <div
                class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <i class="fas fa-palette text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">Art</h3>
            <p class="text-xs text-gray-600">Crafts & Decor</p>
          </div>
        </div>

        <!-- Home Decor -->
        <div
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
          <div class="flex flex-col items-center text-center">
            <div
                class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <i class="fas fa-couch text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">Home</h3>
            <p class="text-xs text-gray-600">Decor & Textiles</p>
          </div>
        </div>

        <!-- Books & Music -->
        <div
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
          <div class="flex flex-col items-center text-center">
            <div
                class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <i class="fas fa-book text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">Books</h3>
            <p class="text-xs text-gray-600">Books & Music</p>
          </div>
        </div>

        <!-- Gifts -->
        <div
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
          <div class="flex flex-col items-center text-center">
            <div
                class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <i class="fas fa-gift text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">Gifts</h3>
            <p class="text-xs text-gray-600">Souvenirs</p>
          </div>
        </div>

        <!-- Natural Wellness -->
        <div
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
          <div class="flex flex-col items-center text-center">
            <div
                class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <i class="fas fa-leaf text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-1">Wellness</h3>
            <p class="text-xs text-gray-600">Natural Products</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Sellers Section -->
    <section class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <i class="fas fa-star text-orange-400 text-lg"></i>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Featured Sellers</h2>
            <p class="text-sm text-gray-600">Top-rated shops you'll love</p>
          </div>
        </div>
        <button class="text-sm font-medium text-orange-400 hover:text-orange-500 flex items-center gap-2">
          View All
          <i class="fas fa-arrow-right text-xs"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Placeholder for featured sellers -->
        <div class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all">
          <div class="flex items-center gap-4 mb-4">
            <div
                class="w-14 h-14 rounded-2xl bg-orange-400 flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-gray-900 mb-1">Amazing African Crafts</h3>
              <div class="flex items-center gap-2">
                <div class="flex items-center">
                  <i class="fas fa-star text-orange-400 text-xs"></i>
                  <span class="text-sm font-medium text-gray-900 ml-1">4.9</span>
                </div>
                <span class="text-xs text-gray-600">(127 reviews)</span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4">Authentic handcrafted items from West Africa</p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-600 flex items-center gap-1">
              <i class="fas fa-box text-orange-400"></i>
              45 Products
            </span>
            <button class="text-sm font-medium text-orange-400 hover:text-orange-500">
              Visit Shop →
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-gray-900 mb-1">Beauty Naturals</h3>
              <div class="flex items-center gap-2">
                <div class="flex items-center">
                  <i class="fas fa-star text-orange-400 text-xs"></i>
                  <span class="text-sm font-medium text-gray-900 ml-1">4.8</span>
                </div>
                <span class="text-xs text-gray-600">(89 reviews)</span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4">Premium natural hair and skincare products</p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-600 flex items-center gap-1">
              <i class="fas fa-box text-orange-400"></i>
              32 Products
            </span>
            <button class="text-sm font-medium text-orange-400 hover:text-orange-500">
              Visit Shop →
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all">
          <div class="flex items-center gap-4 mb-4">
            <div
                class="w-14 h-14 rounded-2xl bg-orange-400 flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-gray-900 mb-1">Cultural Threads</h3>
              <div class="flex items-center gap-2">
                <div class="flex items-center">
                  <i class="fas fa-star text-orange-400 text-xs"></i>
                  <span class="text-sm font-medium text-gray-900 ml-1">5.0</span>
                </div>
                <span class="text-xs text-gray-600">(64 reviews)</span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-4">Traditional and modern African fashion</p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-600 flex items-center gap-1">
              <i class="fas fa-box text-orange-400"></i>
              28 Products
            </span>
            <button class="text-sm font-medium text-orange-400 hover:text-orange-500">
              Visit Shop →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Shop With Us Section -->
    <section class="mb-8">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Why Shop With Us?</h2>
          <p class="text-gray-600">Supporting African small businesses across Australia & New Zealand</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl mb-4">
              <i class="fas fa-shield-alt text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Authentic Products</h3>
            <p class="text-sm text-gray-600">Genuine African products from verified sellers you can trust</p>
          </div>

          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <i class="fas fa-users text-primary text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Support Small Business</h3>
            <p class="text-sm text-gray-600">Every purchase helps African entrepreneurs grow their businesses</p>
          </div>

          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl mb-4">
              <i class="fas fa-shipping-fast text-orange-400 text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Local Delivery</h3>
            <p class="text-sm text-gray-600">Fast shipping across Australia and New Zealand</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Become a Seller CTA -->
    <section v-if="!isProvider" class="mb-8">
      <div class="bg-orange-50 rounded-2xl border border-orange-100 overflow-hidden">
        <div class="p-8 lg:p-12">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div class="flex-1">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-4 shadow-sm">
                <i class="fas fa-store text-orange-400 text-xl"></i>
              </div>
              <h2 class="text-3xl font-bold text-gray-900 mb-3">
                Start Selling Your Products
              </h2>
              <p class="text-gray-700 mb-6 text-lg max-w-2xl">
                Join our community of African entrepreneurs. Create your virtual shop, reach thousands of customers, and
                grow your business online.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <i class="fas fa-check text-orange-400"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Free to list products</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <i class="fas fa-check text-orange-400"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Reach local customers</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <i class="fas fa-check text-orange-400"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Build your brand</span>
                </div>
              </div>

              <button @click="proceedAsProvider"
                      class="btn bg-orange-400 text-white border-none hover:bg-orange-500 rounded-xl px-8 shadow-lg">
                <i class="fas fa-plus-circle mr-2"></i>
                Create Your Shop
                <i class="fas fa-arrow-right text-xs ml-2"></i>
              </button>
            </div>

            <div class="flex-shrink-0 hidden lg:block">
              <div class="w-64 h-64 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <i class="fas fa-store-alt text-orange-200 text-9xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </section>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/authStore'
import {useAuthFlags} from '@/composables/useAuthFlags'
import Search from '../components/Search.vue'

// Composables
const router = useRouter()
const authStore = useAuthStore()
const {isLoggedIn, isProvider, isSeeker, hasBasicProfile, currentUser} = useAuthFlags()

// Navigation
const proceedAsProvider = () => {
  router.push('/seller/products/create')
}
</script>