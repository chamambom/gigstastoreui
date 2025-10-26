<!-- Search.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()
const router = useRouter()
const input = ref('')

const searchResults = computed(() => {
  if (!input.value || input.value.length < 2) return []
  return productStore.list.filter((item) => {
    return item.title.toLowerCase().includes(input.value.toLowerCase())
  })
})

function navigate(productId: string) {
  input.value = ''
  router.push(`/product/${productId}`)
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <div class="form-control">
      <input
        v-model="input"
        type="text"
        placeholder="Search..."
        class="input input-ghost"
        :disabled="!productStore.loaded"
      >
    </div>
    <ul
      v-if="searchResults.length > 0"
      class="shadow menu dropdown-content bg-base-100 rounded-box w-64 text-base-content overflow-y-scroll"
      style="max-height: 50vh;"
    >
      <li v-for="product in searchResults" :key="product._id">
        <a
          href="#"
          @click.prevent="navigate(product._id)"
          v-text="product.title"
        />
      </li>
    </ul>
  </div>
</template>
