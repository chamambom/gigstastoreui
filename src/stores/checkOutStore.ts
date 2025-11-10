// stores/checkoutStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export interface CartGroup {
  seller_id: string
  seller_name: string
  is_recurring: boolean
  group_total_price: number
  items: Array<{
    product_id: string
    quantity: number
    product: any
    item_total: number
  }>
}

export interface CheckoutSession {
  session_id: string
  client_secret: string | null  // ✅ Made nullable for safety
  checkout_url?: string          // For hosted checkout (if you ever switch back)
  order_id: string
  seller_name: string
  total_amount: number
  platform_fee: number
  is_recurring: boolean
}

export const useCheckoutStore = defineStore('checkout', () => {
  // State
  const cartGroups = ref<CartGroup[]>([])
  const checkoutSessions = ref<CheckoutSession[]>([])
  const currentSessionIndex = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const grandTotal = computed(() =>
    cartGroups.value.reduce((sum, group) => sum + group.group_total_price, 0)
  )

  const totalGroups = computed(() => cartGroups.value.length)

  const currentSession = computed(() =>
    checkoutSessions.value[currentSessionIndex.value] || null
  )

  const hasMoreSessions = computed(() =>
    currentSessionIndex.value < checkoutSessions.value.length - 1
  )

  // Actions
  async function fetchGroupedCart() {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get('/api/v1/checkout/cart-preview')
      cartGroups.value = response.data.groups
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to fetch cart groups'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createCheckoutSession(groupIndex: number) {
    loading.value = true
    error.value = null

    try {
      // Get the specific group
      const group = cartGroups.value[groupIndex]
      if (!group) {
        throw new Error('Group not found')
      }

      // Define success and cancel URLs
      const successUrl = `${window.location.origin}/checkout/success`
      const cancelUrl = `${window.location.origin}/cart`

      // Create single session for this group
      const response = await axios.post('/api/v1/checkout/create-sessions', {
        success_url: successUrl,
        cancel_url: cancelUrl
      })

      const session = response.data.sessions[groupIndex]
      checkoutSessions.value = [session]

      return session
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to create checkout session'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createAllCheckoutSessions() {
    loading.value = true
    error.value = null

    try {
      const successUrl = `${window.location.origin}/checkout/success`
      const cancelUrl = `${window.location.origin}/cart`

      console.log('📤 Sending checkout request to backend...')

      const response = await axios.post('/api/v1/checkout/create-sessions', {
        success_url: successUrl,
        cancel_url: cancelUrl
      })

      console.log('📥 Backend response:', response.data)

      if (!response.data.sessions || response.data.sessions.length === 0) {
        throw new Error('No checkout sessions were created')
      }

      // Validate that all sessions have client secrets (for embedded checkout)
      const invalidSessions = response.data.sessions.filter(
        (s: CheckoutSession) => !s.client_secret
      )

      if (invalidSessions.length > 0) {
        console.error('❌ Invalid sessions:', invalidSessions)
        throw new Error(
          `${invalidSessions.length} session(s) missing client_secret. ` +
          'Ensure backend is configured for embedded checkout.'
        )
      }

      // ✅ Update store state
      checkoutSessions.value = response.data.sessions
      currentSessionIndex.value = 0  // Reset to first session

      console.log('✅ Store updated with sessions:', checkoutSessions.value)
      console.log('✅ Current session:', checkoutSessions.value[0])

      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message || 'Failed to create checkout sessions'
      console.error('❌ Checkout error:', error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  function nextSession() {
    if (hasMoreSessions.value) {
      currentSessionIndex.value++
      return true
    }
    return false
  }

  function previousSession() {
    if (currentSessionIndex.value > 0) {
      currentSessionIndex.value--
      return true
    }
    return false
  }

  function clearError() {
    error.value = null
  }

  function reset() {
    cartGroups.value = []
    checkoutSessions.value = []
    currentSessionIndex.value = 0
    error.value = null
    loading.value = false
  }

  return {
    // State
    cartGroups,
    checkoutSessions,
    currentSessionIndex,
    loading,
    error,

    // Computed
    grandTotal,
    totalGroups,
    currentSession,
    hasMoreSessions,

    // Actions
    fetchGroupedCart,
    createAllCheckoutSessions,
    nextSession,
    previousSession,
    clearError,
    reset
  }
})