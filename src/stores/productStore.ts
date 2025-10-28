import { defineStore } from 'pinia'
import axios from 'axios'

export interface SellerInfo {
  _id: string
  tradingName: string
  address?: {
    city: string
    locality: string
  }
  overallProviderRating?: number | null
  totalProviderReviews?: number | null
}

export interface Product {
  _id: string
  seller_id: string
  title: string
  description: string
  price: number
  category: string
  image: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
  seller?: SellerInfo
}

interface ProductsState {
  items: Record<string, Product>
  ids: string[]
  loading: boolean
  error: string | null
  userProducts: string[]
  userProductsLoading: boolean
  filter: {
    category?: string
    skip: number
    limit: number
  }
}

export const useProductStore = defineStore('products', {
  state: (): ProductsState => ({
    items: {},
    ids: [],
    loading: false,
    error: null,
    userProducts: [],
    userProductsLoading: false,
    filter: {
      skip: 0,
      limit: 20,
    },
  }),

  getters: {
    list(): Product[] {
      return this.ids.map(id => this.items[id])
      .filter((p): p is Product => p !== undefined)
    },

    loaded(): boolean {
      return this.ids.length > 0
    },

    getProductById: (state) => (id: string): Product | undefined => {
      return state.items[id]
    },

    userProductsList(): Product[] {
    return this.userProducts
      .map(id => this.items[id])
      .filter((p): p is Product => p !== undefined)
  },

    byCategory: (state) => (category: string): Product[] => {
      return state.ids
        // 1. Map IDs to items (Result: (Product | undefined)[])
        .map(id => state.items[id])
        // 2. Filter out undefined values (Result: Product[])
        .filter((p): p is Product => !!p)
        // 3. Now you can safely filter by category
        .filter(p => p.category === category)
    },
  },

  actions: {
    async fetchAll(category?: string) {
      this.loading = true
      this.error = null

      try {
        const params: Record<string, any> = {
          skip: this.filter.skip,
          limit: this.filter.limit,
        }

        if (category) {
          params.category = category
        }

        // Use global axios - it already has baseURL and interceptors from main.ts
        const { data } = await axios.get<Product[]>('/api/v1/products', { params })

        // Store products
        this.ids = data.map((product) => {
          this.items[product._id] = product
          return product._id
        })
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to fetch products'
        console.error('Failed to fetch products:', err)
      } finally {
        this.loading = false
      }
    },

    async fetchUserProducts() {
      this.userProductsLoading = true
      this.error = null

      try {
        const { data } = await axios.get<Product[]>('/api/v1/products/user/my-products')

        // Store user products
        this.userProducts = data.map((product) => {
          this.items[product._id] = product
          return product._id
        })
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to fetch your products'
        console.error('Failed to fetch user products:', err)
      } finally {
        this.userProductsLoading = false
      }
    },

    async createProduct(productData: Omit<Product, '_id' | 'seller_id' | 'created_at' | 'updated_at'>) {
      this.loading = true
      this.error = null

      try {
        const { data } = await axios.post<Product>('/api/v1/products', productData)
        this.items[data._id] = data
        this.userProducts.push(data._id)
        return data
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to create product'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateProduct(productId: string, updateData: Partial<Product>) {
      this.loading = true
      this.error = null

      try {
        const { data } = await axios.patch<Product>(`/api/v1/products/${productId}`, updateData)
        this.items[data._id] = data
        return data
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to update product'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(productId: string) {
      this.loading = true
      this.error = null

      try {
        await axios.delete(`/api/v1/products/${productId}`)

        // Remove from store
        delete this.items[productId]
        this.ids = this.ids.filter(id => id !== productId)
        this.userProducts = this.userProducts.filter(id => id !== productId)
      } catch (err) {
        this.error = axios.isAxiosError(err)
          ? err.response?.data?.detail || err.message
          : 'Failed to delete product'
        throw err
      } finally {
        this.loading = false
      }
    },

    async publishProduct(productId: string) {
      return this.updateProduct(productId, { status: 'published' } as any)
    },

    async archiveProduct(productId: string) {
      return this.updateProduct(productId, { status: 'archived' } as any)
    },

    clearError() {
      this.error = null
    },
  },
})