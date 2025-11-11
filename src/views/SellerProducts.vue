<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { toCurrency } from '../shared/utils'

const router = useRouter()
const productStore = useProductStore()

const myProducts = computed(() => productStore.userProductsList)
const loading = computed(() => productStore.userProductsLoading)
const error = computed(() => productStore.error)

onMounted(async () => {
  await productStore.fetchUserProducts()
})

const handleCreateProduct = () => {
  router.push('/seller/products/create')
}

const handleEditProduct = (productId: string) => {
  router.push(`/seller/products/edit/${productId}`)
}

const handlePublish = async (productId: string) => {
  if (confirm('Publish this product? It will be visible to customers.')) {
    await productStore.publishProduct(productId)
  }
}

const handleArchive = async (productId: string) => {
  if (confirm('Archive this product? It will be hidden from customers.')) {
    await productStore.archiveProduct(productId)
  }
}

const handleDelete = async (productId: string) => {
  if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    await productStore.deleteProduct(productId)
  }
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'published':
      return 'badge-success'
    case 'draft':
      return 'badge-warning'
    case 'archived':
      return 'badge-ghost'
    default:
      return ''
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">My Products</h1>
        <p class="text-gray-600 mt-2">Manage your product listings</p>
      </div>
      <button @click="handleCreateProduct" class="btn btn-primary gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Create Product
      </button>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-error mb-4" role="alert">
      <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ error }}</span>
      <button @click="productStore.clearError()" class="btn btn-sm btn-ghost">×</button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg" />
      <p class="mt-4 text-gray-600">Loading your products...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="myProducts.length === 0" class="text-center py-12">
      <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <h3 class="mt-4 text-lg font-semibold text-gray-900">No products yet</h3>
      <p class="mt-2 text-gray-600">Get started by creating your first product</p>
      <button @click="handleCreateProduct" class="btn btn-primary mt-6">
        Create Your First Product
      </button>
    </div>

    <!-- Products Table -->
    <div v-else class="card bg-base-100 shadow-lg">
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Created</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in myProducts" :key="product._id">
              <!-- Product Info -->
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="product.media?.[0]?.url || '/placeholder.png'" :alt="product.title" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ product.title }}</div>
                    <div class="text-sm opacity-50 line-clamp-1">
                      {{ product.description }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Category -->
              <td>
                <span class="badge badge-outline">{{ product.category }}</span>
              </td>

              <!-- Price -->
              <td class="font-semibold">{{ toCurrency(product.price) }}</td>

              <!-- Status -->
              <td>
                <span class="badge" :class="getStatusBadgeClass(product.status)">
                  {{ product.status }}
                </span>
              </td>

              <!-- Created Date -->
              <td>
                {{ new Date(product.created_at).toLocaleDateString() }}
              </td>

              <!-- Actions -->
              <td>
                <div class="flex justify-end gap-2">
                  <button
                    @click="handleEditProduct(product._id)"
                    class="btn btn-sm btn-ghost"
                    title="Edit"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  <button
                    v-if="product.status === 'draft'"
                    @click="handlePublish(product._id)"
                    class="btn btn-sm btn-success btn-outline"
                    title="Publish"
                  >
                    Publish
                  </button>

                  <button
                    v-if="product.status === 'published'"
                    @click="handleArchive(product._id)"
                    class="btn btn-sm btn-warning btn-outline"
                    title="Archive"
                  >
                    Archive
                  </button>

                  <button
                    @click="handleDelete(product._id)"
                    class="btn btn-sm btn-error btn-outline"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>