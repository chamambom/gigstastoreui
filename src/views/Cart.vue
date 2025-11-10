<!-- Cart.vue with Grouped Checkout -->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CartGroupCard from '../components/CartGroupCard.vue'
import CartCardSkeleton from '../components/CartCardSkeleton.vue'
import { toCurrency } from '../shared/utils'
import { useCartStore } from '../stores/cartStore'
import { useCheckoutStore } from '../stores/checkOutStore'

const router = useRouter()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

const isLoadingGroups = ref(false)
const checkoutError = ref<string | null>(null)

const formattedCart = computed(() => cartStore.formattedCart)
const isLoading = computed(() => cartStore.loading && !cartStore.total_items)
const hasError = computed(() => cartStore.error && !isLoading.value)

// Grouped cart for checkout
const cartGroups = computed(() => checkoutStore.cartGroups)
const grandTotal = computed(() => checkoutStore.grandTotal)

onMounted(async () => {
  await cartStore.fetchCart()
  // Fetch grouped cart for checkout preview
  if (cartStore.count > 0) {
    await fetchGroupedCart()
  }
})

const fetchGroupedCart = async () => {
  isLoadingGroups.value = true
  checkoutError.value = null
  try {
    await checkoutStore.fetchGroupedCart()
  } catch (error: any) {
    checkoutError.value = error.message || 'Failed to load checkout groups'
  } finally {
    isLoadingGroups.value = false
  }
}


const handleCheckoutAll = async () => {
  checkoutError.value = null

  try {
    // Simply navigate to the checkout page
    // The EmbeddedCheckout component will handle session creation
    router.push('/checkout')
  } catch (error: any) {
    checkoutError.value = error.message || 'Checkout failed'
  }
}

/**
 * Handle checkout for a single group (navigates to embedded checkout)
 */
const handleCheckoutGroup = async (groupIndex: number) => {
  console.log('🛒 Cart.vue: Received checkout event for group', groupIndex)
  console.log('🛒 Cart.vue: Navigating to /checkout')

  try {
    await router.push('/checkout')
    console.log('✅ Navigation successful')
  } catch (error) {
    console.error('❌ Navigation failed:', error)
  }
}

</script>

<template>
  <div class="p-4 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>

    <!-- Checkout Error -->
    <div v-if="checkoutError" class="alert alert-error mb-4" role="alert">
      <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <div>
        <h3 class="font-bold">Checkout Error</h3>
        <div class="text-sm">{{ checkoutError }}</div>
      </div>
      <button class="btn btn-sm" @click="checkoutError = null">
        Dismiss
      </button>
    </div>

    <!-- Cart Error -->
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

    <!-- Grouped Cart for Checkout -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Cart Groups -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Info Banner -->
        <div class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Your cart is grouped by seller and payment type. Each group requires a separate checkout.</span>
        </div>

        <!-- Loading Groups -->
        <div v-if="isLoadingGroups" class="text-center py-8">
          <span class="loading loading-spinner loading-lg"></span>
          <p class="mt-2 text-gray-600">Preparing checkout...</p>
        </div>

        <!-- Cart Groups -->
        <div v-else-if="cartGroups.length > 0" class="space-y-4">
          <CartGroupCard
            v-for="(group, index) in cartGroups"
            :key="`${group.seller_id}-${group.is_recurring}`"
            :group="group"
            :group-index="index"
            @checkout="handleCheckoutGroup"
          />
        </div>
      </div>

      <!-- Right: Order Summary -->
      <div class="lg:col-span-1">
        <div class="card bg-base-200 sticky top-4">
          <div class="card-body">
            <h2 class="card-title text-2xl">Order Summary</h2>
            <div class="divider"/>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between">
                <span>Total Items:</span>
                <span class="font-semibold">{{ cartStore.count }}</span>
              </div>
              <div class="flex justify-between">
                <span>Checkout Groups:</span>
                <span class="font-semibold">{{ cartGroups.length }}</span>
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
              <span>Grand Total:</span>
              <span class="text-primary">{{ toCurrency(grandTotal) }}</span>
            </div>

            <div class="card-actions flex-col gap-2">
              <router-link to="/" class="btn btn-ghost w-full">
                Continue Shopping
              </router-link>

              <!-- ✅ UPDATED: Proceed to Checkout Button -->
              <button
                @click="handleCheckoutAll"
                class="btn btn-primary w-full"
                :disabled="checkoutStore.loading || cartGroups.length === 0"
              >
                <span v-if="checkoutStore.loading" class="loading loading-spinner"></span>
                {{ checkoutStore.loading ? 'Processing...' : 'Proceed to Checkout' }}
              </button>

              <!-- Multiple Groups Info -->
              <div v-if="cartGroups.length > 1" class="text-sm text-center text-gray-600 mt-2">
                <p>You have {{ cartGroups.length }} separate checkouts.</p>
                <p class="mt-1">Complete them one at a time on the checkout page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>