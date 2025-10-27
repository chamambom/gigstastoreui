<template>
  <div v-if="isLoggedIn && user" class="bg-base-100 p-4 rounded-md border border-base-200">
    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>{{ error }}</span>
        <button @click="fetchInvoices" class="btn btn-sm btn-ghost ml-2">Retry</button>
      </div>

      <!-- No Invoices State -->
      <div v-else-if="!hasInvoices" class="card bg-base-100 shadow">
        <div class="card-body text-center">
          <div class="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h2 class="card-title justify-center text-gray-500">No invoices found</h2>
          <p class="text-gray-400">You don't have any invoices yet.</p>
        </div>
      </div>

      <!-- Invoice List -->
      <div v-else class="space-y-6">
        <div v-for="invoice in invoices" :key="invoice.id" class="card bg-base-100 shadow-lg">
          <div class="card-body">

            <!-- Invoice Header -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 class="card-title">Invoice #{{ invoice.number }}</h2>
                <div class="text-sm text-gray-500 mt-1">
                  {{ formatDate(invoice.created) }}
                </div>
              </div>
              <span
                class="badge badge-lg capitalize rounded-full"
                :class="`badge-${getStatusColor(invoice.status)}`"
              >
                {{ invoice.status }}
              </span>
            </div>

            <!-- Invoice Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <!-- Amount -->
              <div class="space-y-2">
                <h3 class="font-semibold text-gray-500">
                  {{ invoice.status === 'paid' ? 'Amount Paid' : 'Amount Due' }}
                </h3>
                <p class="text-xl font-bold">
                  {{ formatCurrency(getDisplayAmount(invoice), invoice.currency) }}
                </p>
                <!-- Show both amounts if they're different -->
                <div v-if="invoice.amount_due !== invoice.amount_paid" class="text-sm text-gray-500">
                  <div v-if="(invoice.amount_paid ?? 0) > 0">
                    Paid: {{ formatCurrency(invoice.amount_paid, invoice.currency) }}
                  </div>
                  <div v-if="invoice.status !== 'paid'">
                    Due: {{ formatCurrency(invoice.amount_due, invoice.currency) }}
                  </div>
                </div>
              </div>

              <!-- Payment Method -->
              <div v-if="invoice.payment_method" class="space-y-2">
                <h3 class="font-semibold text-gray-500">Payment Method</h3>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 bg-base-200 rounded-full flex items-center justify-center">
                    <span class="text-xs font-bold uppercase">
                      {{ getPaymentMethodInitial(invoice.payment_method) }}
                    </span>
                  </div>
                  <span>{{ formatPaymentMethod(invoice.payment_method) }}</span>
                </div>
              </div>
            </div>

            <!-- Invoice Actions -->
            <div class="flex flex-wrap gap-3 mt-6">
              <a
                v-if="invoice.pdf_url"
                :href="invoice.pdf_url"
                target="_blank"
                class="btn bg-purple-700 btn-sm gap-2 text-base-100 hover:bg-purple-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download PDF
              </a>
              <a
                v-if="invoice.hosted_invoice_url"
                :href="invoice.hosted_invoice_url"
                target="_blank"
                class="btn btn-outline btn-sm gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                View Online
              </a>
            </div>

            <!-- Invoice Items -->
            <div v-if="invoice.lines && invoice.lines.length" class="mt-8">
              <div class="divider">Items</div>
              <div class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th class="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in invoice.lines" :key="index">
                      <td>
                        {{ item.description }}
                        <span v-if="item.quantity > 1" class="text-gray-500 text-sm ml-2">
                          (×{{ item.quantity }})
                        </span>
                      </td>
                      <td class="text-right font-medium">
                        {{ formatCurrency(item.amount, item.currency) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStripeStore } from '@/stores/stripeStore'
import type { Invoice, PaymentMethod } from '@/stores/stripeStore'
import {useAuthStore} from "@/stores/authStore";

// -----------------------------
// State & Store
// -----------------------------
const stripeStore = useStripeStore()
const authStore = useAuthStore()

const isLoading = ref(true)
const error = ref<string | null>(null)
const invoiceLimit = ref(5)

// -----------------------------
// Computed properties
// -----------------------------
const invoices = computed<Invoice[]>(() => stripeStore.invoices)
const hasInvoices = computed(() => stripeStore.hasInvoices) // use state directly
const user = computed(() => authStore.user) // keep if you add user to stripeStore
const isLoggedIn = computed(() => !!authStore.user) // adjust logic if needed

// -----------------------------
// Methods
// -----------------------------
const fetchInvoices = async () => {
  if (!isLoggedIn.value) return

  try {
    isLoading.value = true
    error.value = null
    await stripeStore.fetchInvoices(invoiceLimit.value)
  } catch (err: any) {
    console.error('Failed to fetch invoices:', err)
    error.value = err.message || 'Failed to load invoices'
  } finally {
    isLoading.value = false
  }
}

// Get the appropriate amount to display based on invoice status
const getDisplayAmount = (invoice: Invoice) => {
  if (invoice.status === 'paid') return invoice.amount_paid
  return invoice.amount_due
}

// FIXED: Date formatting for ISO format strings (not timestamps)
const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A'

  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid Date'

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Date formatting error:', error)
    return 'Invalid Date'
  }
}

// Currency formatting with error handling
const formatCurrency = (amount: number | undefined, currency = 'USD') => {
  if (typeof amount !== 'number') return 'N/A'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount / 100)
}

// Status color mapping
const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    paid: 'success',
    pending: 'warning',
    draft: 'info',
    void: 'error',
    open: 'primary',
    uncollectible: 'error'
  }
  return statusColors[status] || 'neutral'
}

// Payment method helpers
const getPaymentMethodInitial = (paymentMethod?: PaymentMethod) => {
  if (!paymentMethod) return 'C'
  return paymentMethod.brand?.charAt(0)?.toUpperCase() ||
         paymentMethod.type?.charAt(0)?.toUpperCase() || 'C'
}

const formatPaymentMethod = (paymentMethod?: PaymentMethod) => {
  if (!paymentMethod) return 'Payment method'
  if (paymentMethod.last4) {
    return `${paymentMethod.brand || paymentMethod.type} ending in ${paymentMethod.last4}`
  }
  return paymentMethod.type || 'Payment method'
}

// -----------------------------
// Lifecycle
// -----------------------------
onMounted(() => {
  fetchInvoices()
})
</script>


