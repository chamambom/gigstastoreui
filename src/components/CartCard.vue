<!-- CartCard.vue -->
<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import type { CartPreview } from '../stores/cartStore'
import { toCurrency } from '../shared/utils'

const props = defineProps<{
  cartProduct: CartPreview
}>()

const cartStore = useCartStore()

const handleIncrease = async () => {
  await cartStore.updateItemQuantity(props.cartProduct.id, props.cartProduct.quantity + 1)
}

const handleDecrease = async () => {
  if (props.cartProduct.quantity === 1) {
    await cartStore.removeItem(props.cartProduct.id)
  } else {
    await cartStore.updateItemQuantity(props.cartProduct.id, props.cartProduct.quantity - 1)
  }
}

const handleRemove = async () => {
  await cartStore.removeItem(props.cartProduct.id)
}
</script>

<template>
  <div class="card md:card-side bordered hover:shadow-lg transition-shadow">
    <figure class="p-8">
      <img
        :src="props.cartProduct.image"
        :alt="props.cartProduct.title"
        class="object-contain w-full h-48"
      >
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <router-link class="link link-hover" :to="`/product/${props.cartProduct.id}`">
          {{ props.cartProduct.title }}
        </router-link>
      </h2>
      <p class="text-lg font-bold text-primary">{{ toCurrency(props.cartProduct.cost) }}</p>
      <div class="card-actions gap-2">
        <div class="btn-group">
          <button
            class="btn btn-primary"
            @click="handleDecrease"
            :disabled="cartStore.loading"
          >
            −
          </button>
          <button class="btn btn-ghost no-animation">
            {{ props.cartProduct.quantity }}
          </button>
          <button
            class="btn btn-primary"
            @click="handleIncrease"
            :disabled="cartStore.loading"
          >
            +
          </button>
        </div>
        <button
          class="btn btn-ghost btn-outline text-error"
          @click="handleRemove"
          :disabled="cartStore.loading"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>