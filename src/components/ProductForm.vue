<script setup lang="ts">
import {ref, onMounted, watch, computed} from 'vue' // Added 'computed'
import {useRouter} from 'vue-router'
import {useProductStore} from '../stores/productStore'
import type {Product, MediaFile} from '../stores/productStore' // Added MediaFile type

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
  stock: 0, // Initialize stock to 0
  image: '',
  status: 'draft' as 'draft' | 'published' | 'archived',
  is_recurring: false, // Tracks if this is a subscription product
  interval: 'month' as 'day' | 'week' | 'month' | 'year' | null // Default interval
})

const loading = ref(false)
const error = ref<string | null>(null)

// =================== 📦 NEW STATE FOR UPLOAD 📦 ===================

const imageFile = ref<File | null>(null)
const localImagePreviewUrl = ref<string | null>(null)
const isUploading = ref(false)
const deletingMediaKey = ref<string | null>(null) // State to track which media is being deleted

// =================== 💻 COMPUTED PROPERTY ===================

// Get current product's media list for display in edit mode
const currentMedia = computed<MediaFile[]>(() => {
  if (props.isEdit && props.productId) {
    return productStore.getProductById(props.productId)?.media || []
  }
  return []
})

// =================== 📚 CATEGORIES ===================

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

const intervalOptions = [
  {value: 'day', label: 'Daily'},
  {value: 'week', label: 'Weekly'},
  {value: 'month', label: 'Monthly'},
  {value: 'year', label: 'Yearly'}
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
      stock: product.stock, // Load existing stock
      image: product.image,
      status: product.status,
      is_recurring: product.is_recurring || false, // Assuming your store loads this from the database
      interval: product.interval as 'day' | 'week' | 'month' | 'year' | null || 'month'
    }
  }
  imageFile.value = null
  localImagePreviewUrl.value = null
}

// =================== 📂 FILE HANDLER ===================

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file && file.type.startsWith('image/')) {
    const MAX_SIZE_BYTES = 500 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      error.value = 'Image size cannot exceed 500KB.';
      imageFile.value = null;
      localImagePreviewUrl.value = null;
      (event.target as HTMLInputElement).value = '';
      return;
    }

    imageFile.value = file
    localImagePreviewUrl.value = URL.createObjectURL(file)
    error.value = null
  } else {
    imageFile.value = null
    localImagePreviewUrl.value = null
    if (target.files?.length) {
      error.value = 'Please select a valid image file (JPEG, PNG, etc.).'
    } else {
      error.value = null
    }
  }
}

// =================== ☁️ R2 UPLOAD LOGIC ☁️ ===================

const uploadProductImage = async (productId: string) => {
  if (!imageFile.value) {
    throw new Error("No image file selected for upload.")
  }

  isUploading.value = true
  try {
    const file = imageFile.value
    const uploadResponse = await productStore.requestUploadUrl(productId, file)
    const {uploadUrl, objectKey, fileType, fileSize} = uploadResponse

    await productStore.uploadFileToR2(uploadUrl, file)

    const confirmedProduct = await productStore.confirmUpload(
        productId,
        objectKey,
        fileType,
        fileSize
    )

    // Update formData.image with the primary URL for compatibility (first image)
    const primaryImage = confirmedProduct.media.find(m => m.file_type === 'image')
    if (primaryImage) {
      formData.value.image = primaryImage.url
    }

    imageFile.value = null
    localImagePreviewUrl.value = null

    return true
  } catch (err) {
    const errorMessage = (err as any).message || 'Image upload failed. Please check file size and try again.'
    throw new Error(errorMessage)
  } finally {
    isUploading.value = false
  }
}

// =================== 🗑️ DELETE MEDIA LOGIC 🗑️ ===================

const handleDeleteMedia = async (media: MediaFile) => {
  if (!props.productId) return

  if (!confirm('Are you sure you want to delete this image?')) return

  deletingMediaKey.value = media.object_key
  error.value = null

  try {
    await productStore.deleteProductMedia(props.productId, media.object_key)
    // Note: The store handles updating formData.image if the primary image was deleted
  } catch (err) {
    error.value = (err as Error).message || 'Failed to delete media.'
  } finally {
    deletingMediaKey.value = null
  }
}

// =================== ✍️ VALIDATION & SUBMIT ✍️ ===================

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
  if (formData.value.stock < 0) {
    error.value = 'Stock quantity cannot be negative.'
    return false
  }
  if (formData.value.is_recurring && !formData.value.interval) {
    error.value = 'Subscription interval is required for recurring products.'
    return false
  }

  // Image validation:
  const hasExistingMedia = currentMedia.value.length > 0
  const hasExistingImageField = !!formData.value.image.trim() // check compatibility field

  if (!props.isEdit) {
    if (!imageFile.value) {
      error.value = 'A product image must be uploaded.'
      return false
    }
  } else if (!hasExistingMedia && !imageFile.value && !hasExistingImageField) {
    error.value = 'Please upload an image or ensure an existing image is present.'
    return false
  }

  return true
}

const handleSubmit = async () => {
  error.value = null
  if (!validateForm()) return

  loading.value = true

  try {
    let productIdToUse = props.productId // Use existing ID for edit mode

    // Prepare payload, excluding fields that shouldn't be sent for creation
    const productPayload = {
      ...formData.value,
      // If not recurring, ensure interval is explicitly null for the backend
      interval: formData.value.is_recurring ? formData.value.interval : null
    }

    // 1. CREATE FLOW: Create product first to get ID
    if (!props.isEdit) {
      productPayload.image = '' // ✅ Modify the existing productPayload
      const savedProduct = await productStore.createProduct(productPayload)
      productIdToUse = savedProduct._id
    }

    // 2. Upload image if a new one was selected (in both create and edit mode)
    if (imageFile.value && productIdToUse) {
      await uploadProductImage(productIdToUse)
    }

    // 3. UPDATE FLOW: Update non-image fields if in edit mode (and potentially after upload)
    if (props.isEdit && props.productId) {
      await productStore.updateProduct(props.productId, formData.value)
    }

    // Redirect to seller dashboard
    router.push('/seller/products')
  } catch (err: any) {
    error.value = err.message || productStore.error || 'Failed to save product'
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push('/seller/products')
}

watch(() => formData.value.is_recurring, (newValue) => {
  if (!newValue) {
    formData.value.interval = null  // Clear interval when not recurring
  } else {
    formData.value.interval = 'month'  // Set default when enabled
  }
})
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

    <div v-if="error" class="alert alert-error mb-4" role="alert">
      <svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span>{{ error }}</span>
      <button @click="error = null" class="btn btn-sm btn-ghost">×</button>
    </div>

    <form @submit.prevent="handleSubmit" class="card bg-base-100 shadow-lg">
      <div class="card-body space-y-4">

        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Product Title *</span>
          </label>
          <input
              v-model="formData.title"
              type="text"
              placeholder="e.g., Premium Wireless Headphones"
              class="input input-bordered w-full"
              :disabled="loading || isUploading || deletingMediaKey"
              required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Description *</span>
          </label>
          <textarea
              v-model="formData.description"
              placeholder="Describe your product in detail..."
              class="textarea textarea-bordered h-32"
              :disabled="loading || isUploading || deletingMediaKey"
              required
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                :disabled="loading || isUploading || deletingMediaKey"
                required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Category *</span>
            </label>
            <select
                v-model="formData.category"
                class="select select-bordered w-full"
                :disabled="loading || isUploading || deletingMediaKey"
                required
            >
              <option value="" disabled>Select a category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <div class="border p-4 rounded-lg bg-base-200/50 space-y-3">
            <h3 class="font-bold text-lg mb-2">Pricing Model</h3>

            <div class="form-control">
              <label class="label cursor-pointer justify-start gap-4">
                <input
                    type="checkbox"
                    class="checkbox checkbox-primary"
                    v-model="formData.is_recurring"
                    :disabled="loading || isUploading || deletingMediaKey"
                />
                <span class="label-text">Set as a **Recurring Subscription**</span>
              </label>
              <p class="text-sm text-gray-500 mt-1 ml-9">
                If unchecked, this will be a one-time purchase.
              </p>
            </div>

            <div v-if="formData.is_recurring" class="form-control pl-8 transition-all duration-300 ease-in-out">
              <label class="label">
                <span class="label-text font-semibold">Billing Interval *</span>
              </label>
              <select
                  v-model="formData.interval"
                  class="select select-bordered w-full"
                  :disabled="loading || isUploading || deletingMediaKey"
                  required
              >
                <option value="" disabled>Select billing cycle</option>
                <option
                    v-for="option in intervalOptions"
                    :key="option.value"
                    :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              <label class="label">
                    <span class="label-text-alt text-gray-500">
                        The customer will be charged ${{
                        formData.price.toFixed(2)
                      }} every {{ formData.interval || '...' }}.
                    </span>
              </label>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Stock Quantity *</span>
              </label>
              <input
                  v-model.number="formData.stock"
                  type="number"
                  min="0"
                  placeholder="100"
                  class="input input-bordered w-full"
                  :disabled="loading || isUploading || deletingMediaKey"
                  required
              />
              <label class="label">
              <span class="label-text-alt text-gray-500">
                Current available units for sale.
              </span>
              </label>
            </div>

          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Product Image *</span>
            </label>
            <input
                type="file"
                @change="handleFileChange"
                accept="image/*"
                class="file-input file-input-bordered w-full"
                :disabled="loading || isUploading || deletingMediaKey"
                :required="!isEdit"
            />
            <label class="label">
            <span class="label-text-alt text-gray-500">
              Upload a high-quality product image (max 500KB per image).
            </span>
            </label>
          </div>

          <div v-if="isUploading" class="text-center p-4">
            <span class="loading loading-spinner text-primary loading-lg"></span>
            <p class="mt-2 text-primary font-medium">Uploading image, please wait...</p>
          </div>

          <div v-if="isEdit && currentMedia.length" class="form-control pt-4">
            <label class="label">
              <span class="label-text font-semibold">Current Media ({{ currentMedia.length }} / 4)</span>
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="media in currentMedia" :key="media.object_key" class="relative group">
                <img
                    :src="media.url"
                    alt="Product media"
                    class="w-full h-32 object-cover rounded-lg border"
                />
                <div v-if="formData.image === media.url" class="absolute top-1 left-1 badge badge-primary badge-sm">
                  Primary
                </div>
                <button
                    type="button"
                    @click="handleDeleteMedia(media)"
                    class="absolute top-1 right-1 btn btn-circle btn-error btn-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    :disabled="deletingMediaKey === media.object_key || loading || isUploading"
                    title="Delete Image"
                >
                  <span v-if="deletingMediaKey === media.object_key" class="loading loading-spinner loading-xs"/>
                  <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <p v-if="formData.image === media.url" class="text-xs text-center text-gray-500 pt-1">Main Image</p>
              </div>
            </div>
          </div>

          <div v-if="localImagePreviewUrl" class="form-control">
            <label class="label">
              <span class="label-text font-semibold">New Image Preview</span>
            </label>
            <div class="flex justify-center bg-base-200 p-4 rounded-lg">
              <img
                  :src="localImagePreviewUrl"
                  alt="New image preview"
                  class="max-h-64 object-contain"
              />
            </div>
          </div>

          <div v-if="isEdit" class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Status</span>
            </label>
            <select
                v-model="formData.status"
                class="select select-bordered w-full"
                :disabled="loading || isUploading || deletingMediaKey"
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

          <div class="divider"/>

          <div class="card-actions justify-end gap-2">
            <button
                type="button"
                @click="handleCancel"
                class="btn btn-ghost"
                :disabled="loading || isUploading || deletingMediaKey"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="btn btn-primary"
                :disabled="loading || isUploading || deletingMediaKey"
            >
              <span v-if="loading || isUploading || deletingMediaKey" class="loading loading-spinner"/>
              {{
                isUploading ? 'Uploading...' : deletingMediaKey ? 'Deleting...' : loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'
              }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>