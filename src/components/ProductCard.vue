<!-- ProductCard.vue -->

<template>
  <div class="card bordered hover:shadow-lg transition-shadow">
    <figure class="px-8 pt-10">
      <img
          :src="props.product.media?.[0]?.url || '/placeholder.png'"
          :alt="props.product.title"
          class="object-contain w-full h-64 rounded-lg"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <router-link class="link link-hover" :to="`/product/${props.product._id}`">
          {{ props.product.title }}
        </router-link>
      </h2>

      <!-- Seller Info -->
      <div v-if="sellerInfo" class="text-sm space-y-1 mb-2">
        <div class="flex items-center gap-1 text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span class="font-medium">{{ sellerInfo.tradingName }}</span>
        </div>

        <div v-if="sellerInfo.address" class="flex items-center gap-1 text-gray-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>{{ sellerInfo.address?.locality }}, {{ sellerInfo?.address?.city }}</span>
        </div>

        <div v-if="sellerInfo?.overallProviderRating" class="flex items-center gap-1">
          <div class="rating rating-sm">
            <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                   :checked="sellerInfo?.overallProviderRating >= 1"/>
            <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                   :checked="sellerInfo?.overallProviderRating >= 2"/>
            <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                   :checked="sellerInfo?.overallProviderRating >= 3"/>
            <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                   :checked="sellerInfo?.overallProviderRating >= 4"/>
            <input type="radio" class="mask mask-star-2 bg-orange-400" disabled
                   :checked="sellerInfo?.overallProviderRating >= 5"/>
          </div>
          <span class="text-xs text-gray-600">
            ({{ sellerInfo?.totalProviderReviews || 0 }} reviews)
          </span>
        </div>
      </div>

      <p class="text-sm text-gray-600">{{ props.product.category }}</p>
      <p class="text-lg font-bold text-primary">{{ toCurrency(props.product.price) }}</p>
      <div class="justify-end card-actions">
        <button
            class="btn btn-primary"
            :class="{ 'btn-outline': alreadyInCart, 'btn-disabled': !isLoggedIn }"
            @click="handleAddToCart"
            :disabled="cartStore.loading || !isLoggedIn"
            :title="!isLoggedIn ? 'Please log in to add items to cart' : ''"
        >
          {{ !isLoggedIn ? '🔒 Login to Cart' : alreadyInCart ? '✓ In Cart' : 'Add to Cart' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useCartStore} from '../stores/cartStore'
import type {Product, SellerInfo} from '../stores/productStore'
import {toCurrency} from '../shared/utils'
import {useProductStore} from "../stores/productStore";

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const productStore = useProductStore()

const sellerInfo = computed<SellerInfo | undefined>(() => props.product.seller)

const isLoggedIn = computed(() => !!localStorage.getItem('token'))

const handleAddToCart = async () => {
  await cartStore.addItem(props.product._id, 1)
}

const alreadyInCart = computed(() => cartStore.getItemQuantity(props.product._id) > 0)
</script>
