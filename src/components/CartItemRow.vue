<!-- CartItemRow.vue -->
<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { toCurrency } from '../shared/utils'

interface CartItem {
  product_id: string
  quantity: number
  item_total: number
  product: {
    id: string
    title: string
    image: string
    price: number
    is_recurring?: boolean
    interval?: string
  }
}

const props = defineProps<{
  item: CartItem
}>()

const cartStore = useCartStore()

const handleIncrease = async () => {
  await cartStore.updateItemQuantity(
    props.item.product_id,
    props.item.quantity + 1
  )
}

const handleDecrease = async () => {
  if (props.item.quantity === 1) {
    await cartStore.removeItem(props.item.product_id)
  } else {
    await cartStore.updateItemQuantity(
      props.item.product_id,
      props.item.quantity - 1
    )
  }
}

const handleRemove = async () => {
  await cartStore.removeItem(props.item.product_id)
}

const recurringLabel = () => {
  if (!props.item.product.is_recurring) return ''
  const interval = props.item.product.interval || 'month'
  return `per ${interval}`
}
</script>

<template>
  <div class="flex gap-4 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
    <!-- Product Image -->
    <div class="flex-shrink-0">
      <img
        :src="item.product.image"
        :alt="item.product.title"
        class="w-20 h-20 object-cover rounded"
      >
    </div>

    <!-- Product Details -->
    <div class="flex-1 min-w-0">
      <router-link
        :to="`/product/${item.product.id}`"
        class="font-semibold hover:link line-clamp-2"
      >
        {{ item.product.title }}
      </router-link>
      <p class="text-sm text-gray-600 mt-1">
        {{ toCurrency(item.product.price) }}
        <span v-if="item.product.is_recurring" class="text-xs">
          {{ recurringLabel() }}
        </span>
      </p>
    </div>

    <!-- Quantity Controls -->
    <div class="flex items-center gap-2">
      <div class="btn-group">
        <button
          class="btn btn-sm btn-primary"
          @click="handleDecrease"
          :disabled="cartStore.loading"
        >
          −
        </button>
        <button class="btn btn-sm btn-ghost no-animation">
          {{ item.quantity }}
        </button>
        <button
          class="btn btn-sm btn-primary"
          @click="handleIncrease"
          :disabled="cartStore.loading"
        >
          +
        </button>
      </div>
    </div>

    <!-- Item Total -->
    <div class="flex flex-col items-end justify-between">
      <p class="font-bold text-lg">
        {{ toCurrency(item.item_total) }}
      </p>
      <button
        class="btn btn-ghost btn-xs text-error"
        @click="handleRemove"
        :disabled="cartStore.loading"
      >
        Remove
      </button>
    </div>
  </div>
</template>