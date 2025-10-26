<!-- Cart.vue -->
<script setup lang="ts">
import {computed, onMounted} from 'vue'
import CartCard from '../components/CartCard.vue'
import CartCardSkeleton from '../components/CartCardSkeleton.vue'
import {toCurrency} from '../shared/utils'
import {useCartStore} from '../stores/cartStore'
import {useProductStore} from '../stores/productStore'

const cartStore = useCartStore()
const productStore = useProductStore()

const formattedCart = computed(() => cartStore.formattedCart)
const isLoading = computed(() => cartStore.loading && !cartStore.total_items)
const hasError = computed(() => cartStore.error && !isLoading.value)

onMounted(async () => {
  // Fetch cart on mount
  await cartStore.fetchCart()
})

const handleCheckout = () => {
  // TODO: Implement Stripe checkout
  console.log('Checkout:', cartStore.total)
}

const handleContinueShopping = () => {
  cartStore.clearError()
}
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>

    <!-- Error state -->
    <div v-if="hasError" class="alert alert-error mb-4" role="alert">
      <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4v2m0 0v2m0-6V9m0 0V7m0 0v2"/>
      </svg>
      <div>
        <h3 class="font-bold">Error updating cart</h3>
        <div class="text-sm">{{ cartStore.error }}</div>
      </div>
      <button class="btn btn-sm" @click="cartStore.clearError()">
        Dismiss
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="isLoading" class="space-y-4">
      <CartCardSkeleton v-for="n in 3" :key="n"/>
    </div>

    <!-- Empty cart -->
    <div v-else-if="formattedCart.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-2xl font-bold mb-2">Cart is empty</h2>
      <p class="text-gray-600 mb-6">Start shopping to add items to your cart</p>
      <router-link to="/" class="btn btn-primary">
        Continue Shopping
      </router-link>
    </div>

    <!-- Cart items -->
    <div v-else class="space-y-4">
      <CartCard
          v-for="(cartProduct, index) in formattedCart"
          :key="index"
          :cart-product="cartProduct"
      />

      <!-- Cart summary -->
      <div class="card bg-base-200 mt-8">
        <div class="card-body">
          <h2 class="card-title text-2xl">Order Summary</h2>
          <div class="divider"/>

          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span>Subtotal ({{ cartStore.count }} items):</span>
              <span>{{ toCurrency(cartStore.total) }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Tax:</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div class="divider"/>

          <div class="flex justify-between text-2xl font-bold mb-6">
            <span>Total:</span>
            <span class="text-primary">{{ toCurrency(cartStore.total) }}</span>
          </div>

          <div class="card-actions gap-2">
            <router-link to="/" class="btn btn-ghost flex-1">
              Continue Shopping
            </router-link>
            <button
                @click="handleCheckout"
                class="btn btn-primary flex-1"
                :disabled="cartStore.loading"
            >
              {{ cartStore.loading ? 'Processing...' : 'Proceed to Checkout' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<!--<script setup lang="ts">-->
<!--import { computed } from 'vue'-->
<!--import CartCard from '../components/CartCard.vue'-->
<!--import CartCardSkeleton from '../components/CartCardSkeleton.vue'-->
<!--import { toCurrency } from '../shared/utils'-->
<!--import { useCartStore } from '../stores/cart'-->
<!--import { useProductStore } from '../stores/products'-->

<!--const cartStore = useCartStore()-->
<!--const productStore = useProductStore()-->

<!--const formattedCart = computed(() => cartStore.formattedCart)-->
<!--</script>-->

<!--<template>-->
<!--  <div class="p-4 max-w-4xl mx-auto">-->
<!--    <div v-if="!productStore.loaded" class="space-y-4">-->
<!--      <CartCardSkeleton v-for="n in 15" :key="n" />-->
<!--    </div>-->
<!--    <div v-else-if="!formattedCart.length">-->
<!--      <h1 class="text-xl">-->
<!--        Cart is empty.-->
<!--      </h1>-->
<!--    </div>-->
<!--    <div v-else class="space-y-4">-->
<!--      <CartCard-->
<!--        v-for="(cartProduct, index) in formattedCart"-->
<!--        :key="index"-->
<!--        :cart-product="cartProduct"-->
<!--      />-->
<!--      <div class="text-right text-2xl md:text-4xl">-->
<!--        Total: {{ toCurrency(cartStore.total) }}-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->