<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import ProductCard from '../components/ProductCard.vue'
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue'
import {useProductStore} from '../stores/productStore'
import type {SellerInfo, Product} from '../stores/productStore'

const productStore = useProductStore()

const products = computed(() => productStore.list)
const isLoading = computed(() => productStore.loading && !productStore.loaded)
const hasError = computed(() => productStore.error && !isLoading.value)

const expandedSellers = ref<Set<string>>(new Set())
const showFilters = ref(false)

const filters = ref({
  searchQuery: '',
  city: '',
  minRating: 0,
  category: '',
  sortBy: 'name' as 'name' | 'rating' | 'products'
})

const currentPage = ref(1)
const itemsPerPage = 10

const sellerGroups = computed(() => {
  const groups: Record<string, { seller: SellerInfo, sellerId: string, products: Product[] }> = {}

  products.value.forEach(product => {
    if (product.seller && product.seller_id) {
      const sellerId = product.seller_id

      if (!groups[sellerId]) {
        groups[sellerId] = {
          seller: product.seller,
          sellerId: sellerId,
          products: []
        }
      }

      groups[sellerId].products.push(product)
    }
  })

  return Object.values(groups)
})

const availableCities = computed(() => {
  const cities = new Set<string>()
  sellerGroups.value.forEach(group => {
    if (group.seller.address?.city) {
      cities.add(group.seller.address.city)
    }
  })
  return Array.from(cities).sort()
})

const availableCategories = computed(() => {
  const categories = new Set<string>()
  products.value.forEach(product => {
    if (product.category) {
      categories.add(product.category)
    }
  })
  return Array.from(categories).sort()
})

const filteredSellerGroups = computed(() => {
  let filtered = [...sellerGroups.value]

  if (filters.value.searchQuery) {
    const query = filters.value.searchQuery.toLowerCase()
    filtered = filtered.filter(group => {
      const nameMatch = group.seller.tradingName.toLowerCase().includes(query)
      const productMatch = group.products.some(p => p.title.toLowerCase().includes(query))
      return nameMatch || productMatch
    })
  }

  if (filters.value.city) {
    filtered = filtered.filter(group =>
        group.seller.address?.city === filters.value.city
    )
  }

  if (filters.value.minRating > 0) {
    filtered = filtered.filter(group =>
        (group.seller.overallProviderRating || 0) >= filters.value.minRating
    )
  }

  if (filters.value.category) {
    filtered = filtered.filter(group =>
        group.products.some(p => p.category === filters.value.category)
    )
  }

  if (filters.value.sortBy === 'name') {
    filtered.sort((a, b) => a.seller.tradingName.localeCompare(b.seller.tradingName))
  } else if (filters.value.sortBy === 'rating') {
    filtered.sort((a, b) => (b.seller.overallProviderRating || 0) - (a.seller.overallProviderRating || 0))
  } else if (filters.value.sortBy === 'products') {
    filtered.sort((a, b) => b.products.length - a.products.length)
  }

  return filtered
})

const paginatedSellerGroups = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredSellerGroups.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredSellerGroups.value.length / itemsPerPage))

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.searchQuery) count++
  if (filters.value.city) count++
  if (filters.value.minRating > 0) count++
  if (filters.value.category) count++
  return count
})

onMounted(async () => {
  if (!productStore.loaded) {
    await productStore.fetchAll()
  }
})

const toggleSeller = (sellerId: string) => {
  if (expandedSellers.value.has(sellerId)) {
    expandedSellers.value.delete(sellerId)
  } else {
    expandedSellers.value.add(sellerId)
  }
}

const isExpanded = (sellerId: string) => {
  return expandedSellers.value.has(sellerId)
}

const clearFilters = () => {
  filters.value = {
    searchQuery: '',
    city: '',
    minRating: 0,
    category: '',
    sortBy: 'name'
  }
  currentPage.value = 1
}

const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({top: 0, behavior: 'smooth'})
}
</script>

<template>
  <div class="min-h-screen">

    <!-- Compact Hero - Only shows if no products loaded yet -->
    <div
        v-if="!isLoading && sellerGroups.length > 0"
        class="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-base-300"
    >
      <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold">Discover, connect, and shop</h1>
          <p class="text-sm text-orange-400 mt-1 font-semibold">
            Your virtual mall to connect African small businesses with customers across Australia & New Zealand.
          </p>

          <!-- Product categories -->
          <ul class="text-sm text-gray-700 mt-3 grid grid-cols-4 gap-x-6 gap-y-1">
            <li>👗 African Fashion & Accessories</li>
            <li>🧴 Hair & Beauty Products</li>
            <li>🌿 Natural Skincare & Fragrances</li>
            <li>🍲 Foods, Snacks & Spices</li>
            <li>🎨 Cultural Art & Crafts</li>
            <li>🏠 Home Decor & Textiles</li>
            <li>📚 Books & Music</li>
            <li>🎁 Gifts & Souvenirs</li>
          </ul>
        </div>

        <router-link
            to="/seller/products/create"
            class="btn bg-orange-400 btn-sm shrink-0 text-white"
        >
          Create Virtual Shop
        </router-link>
      </div>
    </div>


  <!-- Error state -->
  <div v-if="hasError" class="alert alert-error m-4" role="alert">
    <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 0v2m0-6V9m0 0V7m0 0v2"/>
    </svg>
    <div>
      <h3 class="font-bold">Failed to load</h3>
      <div class="text-sm">{{ productStore.error }}</div>
    </div>
    <button class="btn btn-sm" @click="productStore.fetchAll()">Retry</button>
  </div>

  <!-- Loading skeleton -->
  <div v-if="isLoading" class="flex gap-4 p-4">
    <div class="w-80 space-y-2">
      <div class="skeleton h-32 w-full"/>
    </div>
    <div class="flex-1 space-y-2">
      <div class="skeleton h-24 w-full"/>
      <div class="skeleton h-24 w-full"/>
      <div class="skeleton h-24 w-full"/>
    </div>
  </div>

  <!-- Main Layout -->
  <div v-else-if="sellerGroups.length > 0" class="flex gap-4 p-4">

    <!-- LEFT SIDEBAR: Filters -->
    <div class="w-80 flex-shrink-0">
      <div class="card bg-base-100 shadow-lg sticky top-4">
        <div class="card-body p-4 space-y-3">
          <div class="flex justify-between items-center">
            <h2 class="font-bold text-xl">Filters</h2>
            <button
                @click="showFilters = !showFilters"
                class="btn btn-sm btn-circle btn-ghost lg:hidden"
                :class="{ 'btn-primary': activeFiltersCount > 0 }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
            </button>
          </div>

          <div :class="{ 'hidden lg:block': !showFilters }" class="space-y-3">
            <!-- Search -->
            <div class="form-control">
              <label class="label py-1">
                <span class="label-text text-xs font-semibold">Search</span>
              </label>
              <input
                  v-model="filters.searchQuery"
                  type="text"
                  placeholder="Seller or product..."
                  class="input input-bordered input-sm w-full"
              />
            </div>

            <!-- City Filter -->
            <div class="form-control">
              <label class="label py-1">
                <span class="label-text text-xs font-semibold">City</span>
              </label>
              <select v-model="filters.city" class="select select-bordered select-sm w-full">
                <option value="">All Cities</option>
                <option v-for="city in availableCities" :key="city" :value="city">
                  {{ city }}
                </option>
              </select>
            </div>

            <!-- Category Filter -->
            <div class="form-control">
              <label class="label py-1">
                <span class="label-text text-xs font-semibold">Category</span>
              </label>
              <select v-model="filters.category" class="select select-bordered select-sm w-full">
                <option value="">All Categories</option>
                <option v-for="cat in availableCategories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>

            <!-- Rating Filter -->
            <div class="form-control">
              <label class="label py-1">
                <span class="label-text text-xs font-semibold">Minimum Rating</span>
              </label>
              <div class="rating rating-sm">
                <input type="radio" :value="0" v-model.number="filters.minRating" class="rating-hidden"/>
                <input type="radio" :value="1" v-model.number="filters.minRating"
                       class="mask mask-star-2 bg-orange-400"/>
                <input type="radio" :value="2" v-model.number="filters.minRating"
                       class="mask mask-star-2 bg-orange-400"/>
                <input type="radio" :value="3" v-model.number="filters.minRating"
                       class="mask mask-star-2 bg-orange-400"/>
                <input type="radio" :value="4" v-model.number="filters.minRating"
                       class="mask mask-star-2 bg-orange-400"/>
                <input type="radio" :value="5" v-model.number="filters.minRating"
                       class="mask mask-star-2 bg-orange-400"/>
              </div>
            </div>

            <!-- Sort By -->
            <div class="form-control">
              <label class="label py-1">
                <span class="label-text text-xs font-semibold">Sort By</span>
              </label>
              <select v-model="filters.sortBy" class="select select-bordered select-sm w-full">
                <option value="name">Name (A-Z)</option>
                <option value="rating">Highest Rated</option>
                <option value="products">Most Products</option>
              </select>
            </div>

            <div class="divider my-1"/>

            <!-- Clear button and results -->
            <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600">
                  {{ filteredSellerGroups.length }} sellers
                </span>
              <button
                  v-if="activeFiltersCount > 0"
                  @click="clearFilters"
                  class="btn btn-ghost btn-xs"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT CONTENT: Sellers List -->
    <div class="flex-1 space-y-3">

      <!-- Seller Cards -->
      <div
          v-for="group in paginatedSellerGroups"
          :key="group.sellerId"
          class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
      >
        <!-- Seller Header (Clickable) -->
        <div
            @click="toggleSeller(group.sellerId)"
            class="card-body p-5 cursor-pointer hover:bg-base-200/50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 flex-1">
              <!-- Avatar -->
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-14">
                  <span class="text-xl">{{ group.seller.tradingName.charAt(0) }}</span>
                </div>
              </div>

              <!-- Seller Info -->
              <div class="flex-1 min-w-0">
                <h3 class="text-2xl font-bold">{{ group.seller.tradingName }}</h3>

                <div class="flex flex-wrap gap-3 mt-1 text-sm">
                  <!-- Location -->
                  <div v-if="group.seller.address" class="flex items-center gap-1 text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    <span>{{ group.seller.address.locality }}, {{ group.seller.address.city }}</span>
                  </div>

                  <!-- Rating -->
                  <div v-if="group.seller.overallProviderRating" class="flex items-center gap-1">
                    <div class="rating rating-xs">
                      <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                             :checked="group.seller.overallProviderRating >= 1"/>
                      <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                             :checked="group.seller.overallProviderRating >= 2"/>
                      <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                             :checked="group.seller.overallProviderRating >= 3"/>
                      <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                             :checked="group.seller.overallProviderRating >= 4"/>
                      <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                             :checked="group.seller.overallProviderRating >= 5"/>
                    </div>
                    <span class="font-semibold">{{ group.seller.overallProviderRating.toFixed(1) }}</span>
                    <span class="text-gray-600">({{ group.seller.totalProviderReviews || 0 }})</span>
                  </div>

                  <!-- Product count -->
                  <div class="badge badge-primary badge-outline">
                    {{ group.products.length }} Products
                  </div>
                </div>
              </div>
            </div>

            <!-- Expand/Collapse Icon -->
            <div class="flex-shrink-0">
              <svg
                  class="w-6 h-6 transition-transform duration-200"
                  :class="{ 'rotate-180': isExpanded(group.sellerId) }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Collapsible Products Grid -->
        <div
            v-show="isExpanded(group.sellerId)"
            class="px-5 pb-5"
        >
          <div class="divider mt-0"/>
          <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProductCard
                v-for="product in group.products"
                :key="product._id"
                :product="product"
            />
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="paginatedSellerGroups.length === 0" class="card bg-base-100 shadow-lg">
        <div class="card-body text-center py-12">
          <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
          <p class="text-gray-500 mt-4 mb-2">No sellers match your filters</p>
          <button @click="clearFilters" class="btn btn-sm btn-ghost">
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="card bg-base-100 shadow">
        <div class="card-body p-4">
          <div class="join w-full">
            <button
                class="join-item btn flex-1"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
            >
              ‹ Previous
            </button>
            <button class="join-item btn flex-1" disabled>
              Page {{ currentPage }} of {{ totalPages }}
            </button>
            <button
                class="join-item btn flex-1"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty state -->
  <div v-else class="text-center py-12">
    <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
    </svg>
    <p class="text-gray-500 mb-4 mt-4">No sellers found</p>
    <button class="btn btn-primary" @click="productStore.fetchAll()">
      Refresh
    </button>
  </div>
  </div>
</template>