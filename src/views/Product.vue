<!-- Product.vue -->
<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {useCartStore} from '../stores/cartStore'
import {useProductStore} from '../stores/productStore'
import type {Product} from '../stores/productStore'
import {toCurrency} from '../shared/utils'
import CartCardSkeleton from '../components/CartCardSkeleton.vue'

const cartStore = useCartStore()
const productStore = useProductStore()
const route = useRoute()

const productId = computed(() => route.params.productId as string)
const product = computed<Product | undefined>(
    () => productStore.getProductById(productId.value)
)

const isLoading = computed(() => productStore.loading && !productStore.loaded)
const hasError = computed(() => productStore.error && !isLoading.value)
const productNotFound = computed(() => !isLoading.value && !product.value)
const alreadyInCart = computed(() => cartStore.getItemQuantity(productId.value) > 0)

onMounted(async () => {
  // Fetch all products if not already loaded
  if (!productStore.loaded) {
    await productStore.fetchAll()
  }
})

const handleAddToCart = async () => {
  await cartStore.addItem(productId.value, 1)
}
</script>

<template>
  <div class="p-4 max-w-6xl mx-auto">
    <!-- Error state -->
    <div v-if="hasError" class="alert alert-error mb-4" role="alert">
      <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4v2m0 0v2m0-6V9m0 0V7m0 0v2"/>
      </svg>
      <div>
        <h3 class="font-bold">Failed to load product</h3>
        <div class="text-sm">{{ productStore.error }}</div>
      </div>
      <button class="btn btn-sm" @click="productStore.fetchAll()">
        Retry
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="isLoading" class="card lg:card-side bordered">
      <CartCardSkeleton/>
    </div>

    <!-- Product details -->
    <div v-else-if="product" class="card lg:card-side bordered">
      <figure class="px-10 pt-10 lg:w-1/2">
        <img
            :src="product?.media?.[0]?.url || '/placeholder.png'"
            :alt="product?.title || 'Product Image'"
            class="rounded-xl w-full max-h-[500px] object-contain"
        />
      </figure>
      <div class="card-body lg:w-1/2">
        <h1 class="card-title text-3xl">{{ product.title }}</h1>

        <div class="badge badge-outline my-2">{{ product.category }}</div>

        <p class="text-lg text-gray-600 my-4">{{ product.description }}</p>

        <div class="divider"/>

        <p class="text-4xl font-bold text-primary mb-4">{{ toCurrency(product.price) }}</p>

        <!-- Seller info -->
        <div class="bg-base-200 p-4 rounded-lg mb-4">
          <p class="text-sm text-gray-600">Sold by</p>
          <p class="font-semibold">{{ product.seller_id }}</p>
        </div>

        <!-- Add to cart -->
        <div class="card-actions justify-between mt-6">
          <router-link to="/" class="btn btn-ghost">
            ← Back to Shop
          </router-link>
          <button
              class="btn btn-primary btn-lg"
              :class="{ 'btn-outline': alreadyInCart }"
              @click="handleAddToCart"
              :disabled="cartStore.loading"
          >
            {{ alreadyInCart ? '✓ Added to Cart' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Product not found -->
    <div v-else class="alert alert-warning">
      <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4v2m0 0v2m0-6V9m0 0V7m0 0v2"/>
      </svg>
      <div>
        <h3 class="font-bold">Product not found</h3>
        <div class="text-sm">
          No product found with ID: <code>{{ productId }}</code>
        </div>
      </div>
      <router-link to="/" class="btn btn-sm btn-ghost">
        Go Home
      </router-link>
    </div>
  </div>
</template>