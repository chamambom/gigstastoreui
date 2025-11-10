<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, computed, nextTick} from 'vue'
import {useRouter} from 'vue-router'
import {getStripe} from '@/composables/stripeInit'
import {useCheckoutStore} from '@/stores/checkOutStore'
import type {Stripe} from '@stripe/stripe-js'

const router = useRouter()
const checkoutStore = useCheckoutStore()

// Local state
const isInitializing = ref(true)
const stripeInstance = ref<Stripe | null>(null)

// Stripe Checkout instance (for cleanup)
let embeddedCheckout: any = null

// Computed from store
const error = computed(() => checkoutStore.error)
const currentSession = computed(() => checkoutStore.currentSession)
const currentSessionIndex = computed(() => checkoutStore.currentSessionIndex)
const totalSessions = computed(() => checkoutStore.checkoutSessions?.length || 0)
const hasMoreSessions = computed(() => checkoutStore.hasMoreSessions)

/**
 * Initialize embedded checkout
 */
const initializeCheckout = async () => {
  try {
    isInitializing.value = true
    checkoutStore.clearError()

    // 1. Create checkout sessions via store
    console.log('🛒 Creating checkout sessions...')
    await checkoutStore.createAllCheckoutSessions()

    console.log('✅ Received checkout sessions:', totalSessions.value)
    console.log('✅ Sessions data:', checkoutStore.checkoutSessions)

    // Validate sessions were created
    if (!checkoutStore.checkoutSessions || checkoutStore.checkoutSessions.length === 0) {
      throw new Error('No checkout sessions were created')
    }

    // ✅ Check the actual first session in the array, not the computed
    const firstSession = checkoutStore.checkoutSessions[0]
    console.log('✅ First session:', firstSession)

    if (!firstSession) {
      throw new Error('First session is not available')
    }

    if (!firstSession.client_secret) {
      throw new Error('First session is missing client_secret')
    }

    // 2. Initialize Stripe using your composable
    console.log('🔧 Initializing Stripe...')
    stripeInstance.value = await getStripe()
    if (!stripeInstance.value) {
      throw new Error('Failed to initialize Stripe')
    }

    console.log('✅ Stripe initialized')

    // 3. Mount the first checkout session
    await mountCurrentSession()

  } catch (err: any) {
    console.error('❌ Failed to initialize checkout:', err)
    checkoutStore.error = err?.response?.data?.detail || err?.message || 'Failed to initialize checkout'
  } finally {
    isInitializing.value = false
  }
}

/**
 * Mount the current session from store
 */
const mountCurrentSession = async () => {
  try {
    const index = currentSessionIndex.value ?? 0
    const session = checkoutStore.checkoutSessions[index]

    console.log('🔍 Mounting session at index:', index)
    console.log('🔍 Session data:', session)

    if (!session) {
      throw new Error('No session available to mount')
    }

    if (!session.client_secret) {
      throw new Error('Missing client secret for checkout session')
    }

    const container = document.getElementById('stripe-checkout-container')
    if (!container) {
      throw new Error('Checkout container not found')
    }

    // Clear previous checkout if exists
    if (embeddedCheckout) {
      console.log('🧹 Destroying previous checkout instance')
      embeddedCheckout.destroy()
    }

    console.log('🔧 Creating embedded checkout...')

    // Create embedded checkout
    embeddedCheckout = await stripeInstance.value!.initEmbeddedCheckout({
      clientSecret: session.client_secret
    })

    // Mount to container
    container.innerHTML = ''
    embeddedCheckout.mount('#stripe-checkout-container')

    console.log(`✅ Mounted checkout session ${checkoutStore.currentSessionIndex + 1}/${totalSessions.value}`)
    console.log(`   Seller: ${session.seller_name}`)
    console.log(`   Total: ${session.total_amount}`)

  } catch (err: any) {
    console.error('❌ Failed to mount checkout:', err)
    checkoutStore.error = err?.message || 'Failed to mount checkout'
  }
}

/**
 * Navigate to next checkout session (for multi-seller carts)
 */
const nextCheckoutSession = async () => {
  if (checkoutStore.nextSession()) {
    await mountCurrentSession()
  } else {
    // All sessions completed, redirect to success
    router.push('/checkout/success')
  }
}

/**
 * Handle cancel
 */
const handleCancel = () => {
  checkoutStore.reset()
  router.push('/cart')
}

// Lifecycle
onMounted(() => {
  console.log('🎬 EmbeddedCheckout mounted')
  initializeCheckout()
})

onBeforeUnmount(() => {
  console.log('🧹 EmbeddedCheckout unmounting, cleaning up...')
  // Cleanup
  if (embeddedCheckout) {
    embeddedCheckout.destroy()
     embeddedCheckout = null
  }
  // Note: We don't reset the store here in case user navigates back
})
</script>


<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Checkout</h1>
      <p v-if="totalSessions > 1" class="text-gray-600 mt-2">
        Session {{ currentSessionIndex + 1 }} of {{ totalSessions }}
      </p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-error mb-4">
      <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span>{{ error }}</span>
      <button @click="handleCancel" class="btn btn-sm btn-ghost">Return to Cart</button>
    </div>

    <!-- Loading State -->
    <div v-if="isInitializing || checkoutStore.loading" class="flex flex-col items-center justify-center py-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <p class="mt-4 text-gray-600">Preparing your checkout...</p>
    </div>

    <!-- Session Info (before Stripe container) -->
    <div v-if="!isInitializing && !error && currentSession"
         class="bg-base-200 p-4 rounded-lg mb-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="font-semibold">{{ currentSession.seller_name }}</p>
          <p class="text-sm text-gray-600">
            {{ currentSession.is_recurring ? 'Subscription' : 'One-time payment' }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold">${{ currentSession.total_amount.toFixed(2) }}</p>
          <p class="text-xs text-gray-500">
            Platform fee: ${{ currentSession.platform_fee.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Stripe Embedded Checkout Container -->
    <div v-show="!isInitializing && !checkoutStore.loading && !error" class="card bg-base-100 shadow-lg">
      <div class="card-body p-0">
        <div id="stripe-checkout-container" class="min-h-[500px]">
          <!-- Stripe checkout will be mounted here -->
        </div>
      </div>
    </div>

  <!-- Multi-session Navigation (if applicable) -->
    <div v-if="!isInitializing && !error && totalSessions > 1"
         class="mt-4 flex justify-between items-center">
      <button @click="handleCancel" class="btn btn-ghost">
        Cancel Checkout
      </button>
      <div class="text-sm text-gray-600">
        {{ hasMoreSessions ? `Next: ${totalSessions - currentSessionIndex - 1} more seller(s)` : 'Last seller' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Customize Stripe elements if needed */
#stripe-checkout-container {
  width: 100%;
}
</style>