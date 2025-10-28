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
  <div class="dropdown dropdown-end w-full">
    <div class="form-control">
      <input
        v-model="input"
        type="text"
        placeholder="Search..."
        class="input input-ghost w-full border border-gray-200 focus:border-orange-400 focus:outline-none rounded-xl"
        :disabled="!productStore.loaded"
      >
    </div>
    <ul
      v-if="searchResults.length > 0"
      class="shadow menu dropdown-content bg-base-100 rounded-box w-full text-base-content overflow-y-scroll border border-gray-200 mt-2"
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