<!-- CartGroupCard.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import CartItemRow from './CartItemRow.vue'
import { toCurrency } from '../shared/utils'

interface CartGroup {
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

const props = defineProps<{
  group: CartGroup
  groupIndex: number
}>()

const emit = defineEmits<{
  checkout: [groupIndex: number]
}>()

const paymentTypeLabel = computed(() =>
  props.group.is_recurring ? 'Subscription' : 'One-time Payment'
)

const paymentTypeBadge = computed(() =>
  props.group.is_recurring ? 'badge-secondary' : 'badge-primary'
)

const handleCheckout = () => {
  emit('checkout', props.groupIndex)
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl border-2 border-base-300">
    <div class="card-body">
      <!-- Group Header -->
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="card-title text-xl">
            {{ group.seller_name }}
          </h3>
          <div class="flex gap-2 mt-2">
            <span :class="['badge', paymentTypeBadge]">
              {{ paymentTypeLabel }}
            </span>
            <span class="badge badge-outline">
              {{ group.items.length }} item{{ group.items.length !== 1 ? 's' : '' }}
            </span>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600">Group Total</p>
          <p class="text-2xl font-bold text-primary">
            {{ toCurrency(group.group_total_price) }}
          </p>
        </div>
      </div>

      <div class="divider my-2"></div>

      <!-- Items in Group -->
      <div class="space-y-3">
        <CartItemRow
          v-for="item in group.items"
          :key="item.product_id"
          :item="item"
        />
      </div>

      <div class="divider my-2"></div>

      <!-- Checkout Button for this Group -->
      <div class="card-actions justify-end">
        <button
          @click="handleCheckout"
          class="btn btn-primary btn-block"
        >
          Checkout {{ paymentTypeLabel }}
          <span class="ml-2">{{ toCurrency(group.group_total_price) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>