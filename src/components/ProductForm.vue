<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import type { Product } from '../stores/productStore'

const props = defineProps<{
  productId?: string
  isEdit?: boolean
}>()

const router = useRouter()
const productStore = useProductStore()

// Form data
const formData = ref({
  title: '',
  description: '',
  price: 0,
  category: '',
  image: '',
  status: 'draft' as 'draft' | 'published' | 'archived'
})

const loading = ref(false)
const error = ref<string | null>(null)

// Categories (you can move this to a separate file later)
const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Automotive',
  'Food & Beverage',
  'Health',

  'African Fashion & Accessories',
  'Hair & Beauty Products',
  'Natural Skincare & Fragrances',
  'African Foods, Snacks & Spices',
  'Cultural Art & Crafts',
  'Home Decor & Textiles',
  'Jewellery & Beads',
  'Books, Music & Digital Media',
  'Religious & Cultural Items',
  'Baby & Kids Essentials',
  'Gifts & Souvenirs',
  'Other African Goods'
]

onMounted(() => {
  if (props.isEdit && props.productId) {
    loadProduct()
  }
})

const loadProduct = async () => {
  if (!props.productId) return

  const product = productStore.getProductById(props.productId)
  if (product) {
    formData.value = {
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      status: product.status
    }
  }
}

const validateForm = (): boolean => {
  if (!formData.value.title.trim()) {
    error.value = 'Title is required'
    return false
  }

  if (!formData.value.description.trim()) {
    error.value = 'Description is required'
    return false
  }

  if (formData.value.price <= 0) {
    error.value = 'Price must be greater than 0'
    return false
  }

  if (!formData.value.category) {
    error.value = 'Please select a category'
    return false
  }

  if (!formData.value.image.trim()) {
    error.value = 'Image URL is required'
    return false
  }

  return true
}

const handleSubmit = async () => {
  error.value = null

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    if (props.isEdit && props.productId) {
      // Update existing product
      await productStore.updateProduct(props.productId, formData.value)
    } else {
      // Create new product
      await productStore.createProduct(formData.value)
    }

    // Redirect to seller dashboard
    router.push('/seller/products')
  } catch (err) {
    error.value = productStore.error || 'Failed to save product'
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push('/seller/products')
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">
        {{ isEdit ? 'Edit Product' : 'Create New Product' }}
      </h1>
      <p class="text-gray-600 mt-2">
        {{ isEdit ? 'Update your product details' : 'Add a new product to your store' }}
      </p>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-error mb-4" role="alert">
      <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ error }}</span>
      <button @click="error = null" class="btn btn-sm btn-ghost">×</button>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="card bg-base-100 shadow-lg">
      <div class="card-body space-y-4">

        <!-- Title -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Product Title *</span>
          </label>
          <input
            v-model="formData.title"
            type="text"
            placeholder="e.g., Premium Wireless Headphones"
            class="input input-bordered w-full"
            :disabled="loading"
            required
          />
        </div>

        <!-- Description -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Description *</span>
          </label>
          <textarea
            v-model="formData.description"
            placeholder="Describe your product in detail..."
            class="textarea textarea-bordered h-32"
            :disabled="loading"
            required
          />
        </div>

        <!-- Price and Category Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

          <!-- Price -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Price ($) *</span>
            </label>
            <input
              v-model.number="formData.price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="input input-bordered w-full"
              :disabled="loading"
              required
            />
          </div>

          <!-- Category -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Category *</span>
            </label>
            <select
              v-model="formData.category"
              class="select select-bordered w-full"
              :disabled="loading"
              required
            >
              <option value="" disabled>Select a category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
        </div>

        <!-- Image URL -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Image URL *</span>
          </label>
          <input
            v-model="formData.image"
            type="url"
            placeholder="https://example.com/image.jpg"
            class="input input-bordered w-full"
            :disabled="loading"
            required
          />
          <label class="label">
            <span class="label-text-alt text-gray-500">Provide a direct link to your product image</span>
          </label>
        </div>

        <!-- Image Preview -->
        <div v-if="formData.image" class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Image Preview</span>
          </label>
          <div class="flex justify-center bg-base-200 p-4 rounded-lg">
            <img
              :src="formData.image"
              alt="Product preview"
              class="max-h-64 object-contain"
              @error="() => error = 'Invalid image URL'"
            />
          </div>
        </div>

        <!-- Status (for edit mode) -->
        <div v-if="isEdit" class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Status</span>
          </label>
          <select
            v-model="formData.status"
            class="select select-bordered w-full"
            :disabled="loading"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <label class="label">
            <span class="label-text-alt text-gray-500">
              Published products are visible to customers
            </span>
          </label>
        </div>

        <div class="divider" />

        <!-- Action Buttons -->
        <div class="card-actions justify-end gap-2">
          <button
            type="button"
            @click="handleCancel"
            class="btn btn-ghost"
            :disabled="loading"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner" />
            {{ loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>