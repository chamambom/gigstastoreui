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

    <!-- Modern Hero Section -->
    <div
        v-if="!isLoading && sellerGroups.length > 0"
        class="relative overflow-hidden border-b border-gray-200 bg-base-100 rounded-2xl"
    >

      <div class="relative max-w-7xl mx-auto px-6 py-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex-1 space-y-4">
            <!-- Main heading with subtle animation -->
            <div class="space-y-2">
              <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                Discover, Connect & Shop
              </h1>
              <div class="flex items-center gap-2">
                <div class="h-1 w-20 bg-gradient-to-r from-orange-400 to-primary rounded-full"></div>
                <p class="text-orange-500 font-semibold text-sm tracking-wide">
                  Your Virtual African Marketplace in NZ & AU.
                </p>
              </div>
            </div>

            <p class="text-gray-600 text-base max-w-2xl leading-relaxed">
              Scaling African Community small businesses across NZ & Australian markets.
            </p>

            <!-- Modern category pills -->
            <div class="flex flex-wrap gap-2 pt-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <i class="fas fa-tshirt text-orange-400"></i>
                Fashion & Accessories
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <i class="fas fa-pump-soap text-orange-400"></i>
                Hair & Beauty
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <i class="fas fa-leaf text-orange-400"></i>
                Natural Skincare
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <i class="fas fa-drumstick-bite text-orange-400"></i>
                Foods & Spices
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <i class="fas fa-palette text-orange-400"></i>
                Art & Crafts
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <i class="fas fa-couch text-orange-400"></i>
                Home Decor
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <i class="fas fa-book text-orange-400"></i>
                Books & Music
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <i class="fas fa-gift text-orange-400"></i>
                Gifts & Souvenirs
              </span>
            </div>
          </div>

          <!-- CTA Button -->
          <router-link
              to="/seller/products/create"
              class="group relative px-6 py-3 bg-orange-400/90 text-white font-semibold rounded-xl shadow-lg shadow-orange-400/10 hover:shadow-xl hover:shadow-orange-400/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <i class="fas fa-store text-sm"></i>
            <span>Create Virtual Shop</span>
            <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Error State with modern design -->
    <div v-if="hasError" class="max-w-2xl mx-auto mt-8 px-4">
      <div class="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <i class="fas fa-exclamation-circle text-red-500 text-2xl"></i>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-red-900 mb-1">Failed to load</h3>
            <p class="text-sm text-red-700">{{ productStore.error }}</p>
          </div>
          <button
            class="btn btn-sm bg-red-100 border-red-200 text-red-700 hover:bg-red-200"
            @click="productStore.fetchAll()"
          >
            <i class="fas fa-redo text-xs mr-1"></i>
            Retry
          </button>
        </div>
      </div>
    </div>

    <!-- Modern Loading Skeleton -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex gap-6">
        <div class="w-80 space-y-3">
          <div class="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
        </div>
        <div class="flex-1 space-y-4">
          <div class="bg-gray-200 rounded-2xl h-32 animate-pulse"></div>
          <div class="bg-gray-200 rounded-2xl h-32 animate-pulse"></div>
          <div class="bg-gray-200 rounded-2xl h-32 animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div v-else-if="sellerGroups.length > 0" class="max-w-8xl mx-auto px-4 py-6">
      <div class="flex gap-6">

        <!-- LEFT SIDEBAR: Modern Filters -->
        <aside class="w-80 flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 sticky top-6 overflow-hidden">
            <!-- Filter Header -->
            <div class="bg-gradient-to-br from-gray-50 to-white px-5 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="fas fa-filter text-gray-600"></i>
                  <h2 class="font-bold text-lg text-gray-900">Filters</h2>
                </div>
                <button
                    @click="showFilters = !showFilters"
                    class="lg:hidden btn btn-sm btn-circle btn-ghost"
                    :class="{ 'bg-orange-100 text-orange-600': activeFiltersCount > 0 }"
                >
                  <i class="fas fa-sliders-h text-sm"></i>
                </button>
              </div>
            </div>

            <div :class="{ 'hidden lg:block': !showFilters }" class="p-5 space-y-5">
              <!-- Search Input with icon -->
              <div class="form-control">
                <label class="label pb-2">
                  <span class="label-text text-xs font-semibold text-gray-700 uppercase tracking-wide">Search</span>
                </label>
                <div class="relative">
                  <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                  <input
                      v-model="filters.searchQuery"
                      type="text"
                      placeholder="Find sellers or products..."
                      class="input input-bordered w-full pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-400 transition-colors rounded-xl"
                  />
                </div>
              </div>

              <!-- City Filter -->
              <div class="form-control">
                <label class="label pb-2">
                  <span class="label-text text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                    <i class="fas fa-map-marker-alt text-orange-400"></i>
                    City
                  </span>
                </label>
                <div class="relative">
                  <select
                    v-model="filters.city"
                    class="select select-bordered w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-400 transition-colors rounded-xl appearance-none pr-10"
                  >
                    <option value="">All Cities</option>
                    <option v-for="city in availableCities" :key="city" :value="city">
                      {{ city }}
                    </option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                </div>
              </div>

              <!-- Category Filter -->
              <div class="form-control">
                <label class="label pb-2">
                  <span class="label-text text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                    <i class="fas fa-tags text-orange-400"></i>
                    Category
                  </span>
                </label>
                <div class="relative">
                  <select
                    v-model="filters.category"
                    class="select select-bordered w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-400 transition-colors rounded-xl appearance-none pr-10"
                  >
                    <option value="">All Categories</option>
                    <option v-for="cat in availableCategories" :key="cat" :value="cat">
                      {{ cat }}
                    </option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                </div>
              </div>

              <!-- Rating Filter -->
              <div class="form-control">
                <label class="label pb-2">
                  <span class="label-text text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                    <i class="fas fa-star text-orange-400"></i>
                    Minimum Rating
                  </span>
                </label>
                <div class="flex items-center gap-1 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div class="rating rating-md gap-1">
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
              </div>

              <!-- Sort By -->
              <div class="form-control">
                <label class="label pb-2">
                  <span class="label-text text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                    <i class="fas fa-sort-amount-down text-orange-400"></i>
                    Sort By
                  </span>
                </label>
                <div class="relative">
                  <select
                    v-model="filters.sortBy"
                    class="select select-bordered w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-400 transition-colors rounded-xl appearance-none pr-10"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="rating">Highest Rated</option>
                    <option value="products">Most Products</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                </div>
              </div>

              <!-- Results & Clear -->
              <div class="pt-3 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-2">
                    <div class="h-2 w-2 rounded-full bg-orange-400 animate-pulse"></div>
                    <span class="text-sm font-semibold text-gray-900">
                      {{ filteredSellerGroups.length }}
                    </span>
                    <span class="text-sm text-gray-600">sellers found</span>
                  </div>
                  <button
                      v-if="activeFiltersCount > 0"
                      @click="clearFilters"
                      class="text-xs font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
                  >
                    <i class="fas fa-times-circle"></i>
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- RIGHT CONTENT: Sellers List -->
        <main class="flex-1 space-y-4">

          <!-- Seller Cards with modern design -->
          <article
              v-for="group in paginatedSellerGroups"
              :key="group.sellerId"
              class="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group"
          >
            <!-- Seller Header (Clickable) -->
            <div
                @click="toggleSeller(group.sellerId)"
                class="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-5 flex-1 min-w-0">
                  <!-- Modern Avatar with gradient -->
                  <div class="relative flex-shrink-0">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-primary flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      {{ group.seller.tradingName.charAt(0) }}
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>

                  <!-- Seller Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-2xl font-bold text-gray-900 mb-2 truncate">
                      {{ group.seller.tradingName }}
                    </h3>

                    <div class="flex flex-wrap items-center gap-4 text-sm">
                      <!-- Location -->
                      <div v-if="group.seller.address" class="flex items-center gap-1.5 text-gray-600">
                        <i class="fas fa-map-marker-alt text-orange-400"></i>
                        <span class="font-medium">{{ group.seller.address.locality }}, {{ group.seller.address.city }}</span>
                      </div>

                      <!-- Rating -->
                      <div v-if="group.seller.overallProviderRating" class="flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full">
                        <div class="rating rating-xs gap-0.5">
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
                        <span class="font-bold text-gray-900">{{ group.seller.overallProviderRating.toFixed(1) }}</span>
                        <span class="text-gray-500">({{ group.seller.totalProviderReviews || 0 }})</span>
                      </div>

                      <!-- Product count badge -->
                      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        <i class="fas fa-box text-xs"></i>
                        <span>{{ group.products.length }} Products</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Expand/Collapse Icon with animation -->
                <div class="flex-shrink-0 ml-4">
                  <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <i
                      class="fas fa-chevron-down text-gray-600 transition-transform duration-300"
                      :class="{ 'rotate-180': isExpanded(group.sellerId) }"
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Collapsible Products Grid -->
            <div
                v-show="isExpanded(group.sellerId)"
                class="border-t border-gray-100"
            >
              <div class="p-6 bg-gray-50/30">
                <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <ProductCard
                      v-for="product in group.products"
                      :key="product._id"
                      :product="product"
                  />
                </div>
              </div>
            </div>
          </article>

          <!-- Modern Empty State -->
          <div v-if="paginatedSellerGroups.length === 0" class="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div class="text-center py-16 px-6">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <i class="fas fa-search text-3xl text-gray-400"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">No sellers found</h3>
              <p class="text-gray-600 mb-6 max-w-sm mx-auto">
                We couldn't find any sellers matching your filters. Try adjusting your search criteria.
              </p>
              <button
                @click="clearFilters"
                class="btn bg-gradient-to-r from-orange-400 to-orange-500 text-white border-none hover:shadow-lg transition-all"
              >
                <i class="fas fa-redo text-xs mr-2"></i>
                Clear All Filters
              </button>
            </div>
          </div>

          <!-- Modern Pagination -->
          <div v-if="totalPages > 1" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="p-4">
              <div class="flex items-center justify-between gap-4">
                <button
                    class="btn flex-1 bg-gray-50 border-gray-200 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 rounded-xl"
                    :disabled="currentPage === 1"
                    @click="goToPage(currentPage - 1)"
                >
                  <i class="fas fa-chevron-left text-xs mr-2"></i>
                  Previous
                </button>
                <div class="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl">
                  <span class="text-sm font-semibold text-gray-900">Page {{ currentPage }}</span>
                  <span class="text-sm text-gray-600">of</span>
                  <span class="text-sm font-semibold text-gray-900">{{ totalPages }}</span>
                </div>
                <button
                    class="btn flex-1 bg-gray-50 border-gray-200 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 rounded-xl"
                    :disabled="currentPage === totalPages"
                    @click="goToPage(currentPage + 1)"
                >
                  Next
                  <i class="fas fa-chevron-right text-xs ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Modern Empty State (no sellers at all) -->
    <div v-else class="max-w-2xl mx-auto px-4 py-16">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 text-center py-16 px-6">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-primary/10 rounded-full mb-6">
          <i class="fas fa-store text-4xl text-orange-400"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">No Sellers Available</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          There are currently no sellers in the marketplace. Check back soon or be the first to create a shop!
        </p>
        <button
          class="btn bg-gradient-to-r from-orange-400 to-orange-500 text-white border-none hover:shadow-lg transition-all"
          @click="productStore.fetchAll()"
        >
          <i class="fas fa-sync-alt text-sm mr-2"></i>
          Refresh Page
        </button>
      </div>
    </div>
  </div>
</template>