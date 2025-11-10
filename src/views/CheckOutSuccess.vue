<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const isLoading = ref(true)
const orderDetails = ref<any>(null)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const sessionId = route.query.session_id as string

    if (!sessionId) {
      throw new Error('No session ID found')
    }

    // Optional: Fetch order details from your backend
    // The webhook should have already processed this, but you can verify
    console.log('✅ Checkout completed! Session ID:', sessionId)

    // You could fetch order details here if needed:
    // const response = await axios.get(`/api/v1/orders?session_id=${sessionId}`)
    // orderDetails.value = response.data

    isLoading.value = false
  } catch (err: any) {
    console.error('Error loading order:', err)
    error.value = err.message
    isLoading.value = false
  }
})

const goToOrders = () => {
  router.push('/orders')
}

const continueShopping = () => {
  router.push('/shop')
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
      <span class="loading loading-spinner loading-lg text-success"></span>
      <p class="mt-4 text-gray-600">Confirming your order...</p>
    </div>

    <!-- Success State -->
    <div v-else-if="!error" class="text-center">
      <!-- Success Icon -->
      <div class="flex justify-center mb-6">
        <div class="rounded-full bg-success/10 p-6">
          <svg class="w-16 h-16 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>

      <!-- Success Message -->
      <h1 class="text-4xl font-bold text-success mb-4">Payment Successful!</h1>
      <p class="text-lg text-gray-600 mb-8">
        Thank you for your purchase. Your order has been confirmed.
      </p>

      <!-- Info Card -->
      <div class="card bg-base-200 shadow-lg mb-8">
        <div class="card-body">
          <h2 class="card-title justify-center">What's Next?</h2>
          <ul class="text-left space-y-2 mt-4">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-success mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>You'll receive an email confirmation shortly</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-success mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>The seller will be notified of your order</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-success mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Track your order in the Orders section</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 justify-center">
        <button @click="goToOrders" class="btn btn-primary">
          View My Orders
        </button>
        <button @click="continueShopping" class="btn btn-outline">
          Continue Shopping
        </button>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center">
      <div class="flex justify-center mb-6">
        <div class="rounded-full bg-error/10 p-6">
          <svg class="w-16 h-16 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      </div>

      <h1 class="text-4xl font-bold text-error mb-4">Something Went Wrong</h1>
      <p class="text-lg text-gray-600 mb-8">{{ error }}</p>

      <button @click="router.push('/cart')" class="btn btn-primary">
        Return to Cart
      </button>
    </div>
  </div>
</template>