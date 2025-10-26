import { defineStore } from 'pinia'
import axios from 'axios'

export interface CartItem {
  product_id: string
  quantity: number
  product?: any
}

export interface CartPreview {
  id: string
  image: string
  title: string
  quantity: number
  cost: number
}

interface CartState {
  items: Record<string, CartItem>
  total_items: number
  total_price: number
  loading: boolean
  error: string | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: {},
    total_items: 0,
    total_price: 0,
    loading: false,
    error: null,
  }),

  getters: {
    count(): number {
      return this.total_items
    },

    total(): number {
      return this.total_price
    },

    itemsList(): CartItem[] {
      return Object.values(this.items)
    },

    formattedCart(): CartPreview[] {
      return this.itemsList.map((item) => ({
        id: item.product_id,
        image: item.product?.image || '',
        title: item.product?.title || 'Unknown Product',
        quantity: item.quantity,
        cost: item.quantity * (item.product?.price || 0),
      }))
    },

    isEmpty(): boolean {
      return this.total_items === 0
    },

    getItemQuantity: (state) => (productId: string): number => {
      return state.items[productId]?.quantity || 0
    },
  },

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null

      try {
        const { data } = await axios.get('/api/v1/cart')
        this._updateCartFromResponse(data)
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to fetch cart'
        console.error('Failed to fetch cart:', err)
      } finally {
        this.loading = false
      }
    },

    async addItem(productId: string, quantity: number = 1) {
      this.loading = true
      this.error = null

      try {
        const { data } = await axios.post('/api/v1/cart/items', { product_id: productId, quantity })
        this._updateCartFromResponse(data)
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to add item'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateItemQuantity(productId: string, quantity: number) {
      this.loading = true
      this.error = null

      try {
        const { data } = await axios.patch(`/api/v1/cart/items/${productId}`, { quantity })
        this._updateCartFromResponse(data)
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to update quantity'
        throw err
      } finally {
        this.loading = false
      }
    },

    async removeItem(productId: string) {
      this.loading = true
      this.error = null

      try {
        const { data } = await axios.delete(`/api/v1/cart/items/${productId}`)
        this._updateCartFromResponse(data)
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to remove item'
        throw err
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      this.loading = true
      this.error = null

      try {
        const { data } = await axios.delete('/api/v1/cart')
        this._updateCartFromResponse(data)
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to clear cart'
        throw err
      } finally {
        this.loading = false
      }
    },

    _updateCartFromResponse(data: any) {
      this.items = {}

      data.items?.forEach((item: any) => {
        this.items[item.product_id] = {
          product_id: item.product_id,
          quantity: item.quantity,
          product: item.product,
        }
      })

      this.total_items = data.total_items || 0
      this.total_price = data.total_price || 0
    },

    clearError() {
      this.error = null
    },
  },
})