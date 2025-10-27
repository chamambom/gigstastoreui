<template>
  <div class="card bg-base-100 rounded-box">
    <div class="card-body">
      <template v-if="isLoggedIn && currentUser">
        <!-- Header Section -->
        <div class="flex items-center mb-8">
          <div
              class="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-base-content ">Manage Subscription</h2>
            <p class="text-gray-500">Manage your subscription plan and payment methods</p>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Current Plan Section -->
        <section class="space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center mb-6">
              <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-base-content">Current Plan</h2>
            </div>

            <!-- Current Plan Card -->
            <div class="bg-base-300 rounded-lg p-6 border-l-4 border-orange-500">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-xl font-semibold text-orange-700">
                      Current Plan: {{ currentUserPlan.name }} {{ serviceLimitExponent }}
                    </h3>
                    <span class="badge badge-success badge-sm">Active</span>
                  </div>
                  <p class="text-orange-600 mb-3">{{ currentUserPlan.perks }}</p>
                </div>
                <div class="text-right">
                  <div class="text-xl font-bold text-orange-600">
                    {{ currentUserPlan.plan_price }} NZD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Upgrade/Downgrade Options -->
        <div v-if="upgradeOptions?.length || downgradeOptions?.length || blockedDowngradeOptions?.length">

          <!-- Upgrade Options Section -->
          <section v-if="upgradeOptions?.length" class="space-y-6">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-center mb-6">
                <div
                    class="w-10 h-10 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-800">Upgrade Options</h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="plan in upgradeOptions" :key="plan._id"
                     class="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200 border border-gray-200">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-800">{{ plan.name }}</h3>
                    <div class="text-xl font-semibold text-green-600">{{ plan.plan_price }}</div>
                  </div>

                  <p class="text-gray-600 mb-4">{{ plan.perks }}</p>

                  <div class="space-y-3">
                    <button @click="toggleUpgradeConfirm(plan.stripe_price_id ?? '')"
                            class="btn btn-success btn-block shadow-lg hover:shadow-xl transition-all duration-200"
                            :disabled="!hasPaymentMethod">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                      </svg>
                      Upgrade
                    </button>

                    <p class="text-xs text-gray-500 text-center">(Charged to Default Card)</p>
                  </div>

                  <!-- Upgrade Confirmation Dialog -->
                  <div v-if="confirmUpgradeId === plan.stripe_price_id"
                       class="mt-4 p-4 border-2 border-green-200 rounded-lg bg-green-50">
                    <div class="flex items-center mb-3">
                      <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5C3.962 16.333 4.924 18 6.464 18z"></path>
                      </svg>
                      <p class="text-green-800 font-semibold">Are you sure you want to upgrade to this plan?</p>
                    </div>
                    <div class="flex justify-end gap-3">
                      <button @click="upgradeSubscription(plan.stripe_price_id)"
                              class="btn btn-success btn-sm">
                        Confirm Upgrade
                      </button>
                      <button @click="toggleUpgradeConfirm(null ?? '')"
                              class="btn btn-outline btn-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Downgrade Options Section -->
          <section v-if="downgradeOptions?.length" class="space-y-6">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-center mb-6">
                <div
                    class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-800">Downgrade Options</h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="plan in downgradeOptions" :key="plan._id"
                     class="bg-red-50 rounded-lg p-6 hover:bg-red-100 transition-colors duration-200 border border-red-200">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-800">{{ plan.name }}</h3>
                  </div>

                  <p class="text-gray-600 mb-4">{{ plan.perks }}</p>

                  <button @click="toggleDowngradeConfirm(plan.stripe_price_id ?? '')"
                          class="btn btn-error btn-block shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                    </svg>
                    Downgrade
                  </button>

                  <!-- Downgrade Confirmation Dialog -->
                  <div v-if="confirmDowngradeId === plan.stripe_price_id"
                       class="mt-4 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                    <div class="flex items-center mb-3">
                      <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5C3.962 16.333 4.924 18 6.464 18z"></path>
                      </svg>
                      <p class="text-blue-800 font-semibold">Are you sure you want to downgrade to this plan?</p>
                    </div>
                    <div class="flex justify-end gap-3">
                      <button @click="downgradeSubscription(plan.stripe_price_id)"
                              class="btn btn-info btn-sm">
                        Confirm Downgrade
                      </button>
                      <button @click="toggleDowngradeConfirm(null ?? '')"
                              class="btn btn-outline btn-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Blocked Downgrade Options Section -->
          <section v-if="blockedDowngradeOptions?.length" class="space-y-6">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-center mb-6">
                <div
                    class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path>
                  </svg>
                </div>
                <h2 class="text-lg font-semibold text-base-content">Unavailable Downgrades</h2>

              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="plan in blockedDowngradeOptions" :key="plan._id"
                     class="bg-gray-100 rounded-lg p-6 border border-gray-300 opacity-60">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-gray-700">{{ plan.name }}</h3>
                    <div class="text-xl font-semibold text-gray-500">{{ plan.plan_price }}</div>
                  </div>

                  <p class="text-gray-600 mb-3">{{ plan.perks }}</p>

                  <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p class="text-sm text-red-700">
                        You are currently using more than {{ plan.limit }} services. Remove some services to downgrade.
                      </p>
                    </div>
                  </div>

                  <button disabled class="btn btn-disabled btn-block cursor-not-allowed">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path>
                    </svg>
                    Downgrade Not Available
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- No Options Available -->
        <section v-else-if="upgradeOptions && downgradeOptions && !upgradeOptions.length && !downgradeOptions.length">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="text-center py-12">
              <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">You are on the highest plan.</h3>
              <p class="text-gray-600">No upgrade or downgrade options are currently available.</p>
            </div>
          </div>
        </section>

        <!-- Loading State -->
        <section v-else>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="text-center py-12">
              <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Loading subscription options...</h3>
              <p class="text-gray-600">Please wait while we fetch your available plans.</p>
            </div>
          </div>
        </section>

        <!-- Payment Methods Section -->
        <section class="space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center mb-6">
              <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-base-content">Payment Methods</h2>
            </div>

            <!-- No Payment Methods -->
            <div v-if="!hasPaymentMethod" class="text-center py-8">
              <div class="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">No Payment Methods</h3>
              <p class="text-red-600 mb-4">No payment methods found. Please add card to upgrade to your required
                package.</p>
              <button v-if="!useNewCard" @click="useNewCard = true; setupStripe()"
                      class="btn btn-success btn-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add New Card
              </button>
            </div>

            <!-- Existing Payment Methods -->
            <div v-else>
              <p v-if="paymentMethods.length" class="text-gray-600 mb-6">
                You have {{ paymentMethods.length }} saved {{ paymentMethods.length === 1 ? "card" : "cards" }}.
              </p>

              <div class="space-y-4 mb-6">
                <div v-for="method in paymentMethods" :key="method.id"
                     class="bg-gray-50 rounded-lg p-4 border-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                     :class="{ 'border-gray-100 bg-green-50': selectedPaymentMethod === method.id, 'border-gray-200': selectedPaymentMethod !== method.id }"
                     @click="selectedPaymentMethod = method.id">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-800">
                          **** **** **** {{ method.last4 }} ({{ method.brand?.toUpperCase() ?? 'CARD'}})
                        </p>
                        <p class="text-sm text-gray-500">Expires {{ method.exp_month }}/{{ method.exp_year }}</p>
                        <span v-if="selectedPaymentMethod === method.id"
                              class="badge badge-success badge-sm mt-1">
                          Default
                        </span>
                      </div>
                    </div>

                    <div class="flex items-center space-x-2">
                      <button v-if="selectedPaymentMethod !== method.id"
                              @click.stop="setDefaultCard(method.id)"
                              class="btn btn-outline btn-sm">
                        Set as Default
                      </button>
                      <button @click.stop="toggleConfirm(method.id)"
                              class="btn btn-error btn-sm">
                        Delete
                      </button>
                    </div>
                  </div>

                  <!-- Delete Confirmation Dialog -->
                  <div v-if="deleteConfirmId === method.id"
                       class="mt-4 p-4 border-2 border-red-200 rounded-lg bg-red-50">
                    <div class="flex items-center mb-3">
                      <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5C3.962 16.333 4.924 18 6.464 18z"></path>
                      </svg>
                      <p class="text-red-800 font-semibold">Are you sure you want to delete this card?</p>
                    </div>
                    <div class="flex justify-end gap-3">
                      <button @click.stop="deleteCard(method.id)" class="btn btn-error btn-sm">
                        Confirm Delete
                      </button>
                      <button @click.stop="deleteConfirmId = null" class="btn btn-outline btn-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Add New Card Button -->
              <div v-if="paymentMethods.length < 3 && !useNewCard" class="text-center">
                <button @click="useNewCard = true; setupStripe()"
                        class="btn btn-success btn-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add New Card
                </button>
              </div>
            </div>

            <!-- New Card Form -->
            <div v-if="useNewCard" class="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div class="flex items-center mb-4">
                <div
                    class="w-8 h-8 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-800">Enter a New Payment Method:</h4>
              </div>

              <form @submit.prevent="saveNewCard" class="space-y-4">
                <div id="payment-element" class="p-4 border border-gray-300 rounded-lg bg-white"></div>

                <div class="flex justify-end space-x-3">
                  <button type="button" @click="useNewCard = false"
                          class="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit"
                          class="btn btn-success shadow-lg hover:shadow-xl transition-all duration-200"
                          :disabled="isProcessing">
                    <span v-if="isProcessing" class="loading loading-spinner loading-sm mr-2"></span>
                    {{ isProcessing ? "Processing..." : "Save New Card" }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="alert alert-success shadow-lg mt-6">
              <div>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ successMessage }}</span>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="alert alert-error shadow-lg mt-6">
              <div>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ errorMessage }}</span>
              </div>
            </div>
          </div>
        </section>
      </template>
    </div>
  </div>  <!-- end isLoggedIn-->
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStripeStore } from '@/stores/stripeStore'
import axios from 'axios'
import { getStripe } from '@/composables/stripeInit'
import { useAuthFlags } from '@/composables/useAuthFlags'
import type { PaymentMethod } from '@/stores/stripeStore'

// -----------------------------
// Auth Flags
// -----------------------------
const {
  isLoggedIn,
  isVerified,
  isProvider,
  isSeeker,
  isProvisional,
  canAccessProviderDashboard,
  currentUser,
  isProviderApproved,
  isProviderPending,
  isProviderRejected,
  showBecomeProviderCTA,
  providerStatus,
  needsEmailVerification,
} = useAuthFlags()

// -----------------------------
// Pinia Store
// -----------------------------
const stripeStore = useStripeStore()

// -----------------------------
// Stripe / Payment Refs
// -----------------------------
const stripe = ref<any>(null)
const elements = ref<any>(null)
const paymentElement = ref<any>(null)

// -----------------------------
// UI States
// -----------------------------
const isProcessing = ref(false)
const errorMessage = ref<string>("")
const successMessage = ref<string>("") // we will sync with store later
const useNewCard = ref(false)

// -----------------------------
// Payment Data
// -----------------------------
const paymentMethods = computed<PaymentMethod[]>(() => stripeStore.paymentMethods)
const selectedPaymentMethod = computed({
  get: () => stripeStore.selectedPaymentMethod,
  set: (value: string | null) => (stripeStore.selectedPaymentMethod = value),
})
const hasPaymentMethod = computed(() => stripeStore.hasPaymentMethod)
const deleteConfirmId = ref<string | null>(null) // Stores the ID of the card being deleted
const confirmUpgradeId = ref<string | null>(null)
const confirmDowngradeId = ref<string | null>(null)

// -----------------------------
// UI Toggle Functions
// -----------------------------
const toggleConfirm = (paymentMethodId: string) => {
  deleteConfirmId.value = deleteConfirmId.value === paymentMethodId ? null : paymentMethodId
}

const toggleUpgradeConfirm = (planId: string) => {
  confirmUpgradeId.value = confirmUpgradeId.value === planId ? null : planId
}

const toggleDowngradeConfirm = (planId: string) => {
  confirmDowngradeId.value = confirmDowngradeId.value === planId ? null : planId
}

// -----------------------------
// Plan Computed Properties
// -----------------------------
const currentUserPlan = computed(() => stripeStore.currentPlan)
const upgradeOptions = computed(() => stripeStore.upgradeOptions)
const downgradeOptions = computed(() => stripeStore.downgradeOptions)
const blockedDowngradeOptions = computed(() => stripeStore.blockedDowngradeOptions)

// const allSubscriptions = computed(() => stripeStore.allSubscriptions) // commented-out original

// Service limit exponent mapping
const exponentMap: Record<number, string> = { 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵" }
const serviceLimitExponent = computed(() => exponentMap[currentUserPlan.value.limit] || "")

// -----------------------------
// Stripe Setup
// -----------------------------
const setupStripe = async () => {
  try {
    stripe.value = await getStripe()
    if (!stripe.value) throw new Error("Stripe failed to load.")

    const setupIntentResponse = await axios.post("/api/v1/create-setup-intent")
    const { clientSecret } = setupIntentResponse.data
    if (!clientSecret) throw new Error("Missing client secret from Setup Intent response.")

    elements.value = stripe.value.elements({ clientSecret })
    paymentElement.value = elements.value.create("payment") // or "card"
    paymentElement.value.mount("#payment-element")
  } catch (error: any) {
    console.error(error)
    errorMessage.value = "Failed to initialize payment. Please try again."
  }
}

// -----------------------------
// Save New Card
// -----------------------------
const saveNewCard = async () => {
  isProcessing.value = true
  errorMessage.value = ""
  successMessage.value = ""

  try {
    const stripeInstance = await getStripe()
    if (!stripeInstance) throw new Error("Stripe not initialized.")

    const { setupIntent, error } = await stripeInstance.confirmSetup({
      elements: elements.value,
      confirmParams: {},
      redirect: "if_required",
    })

    if (error) throw new Error(error.message || "Failed to confirm card setup.")
    if (!setupIntent?.payment_method) throw new Error("Missing payment method ID.")

    const message = await stripeStore.saveNewCard({ payment_method_id: setupIntent.payment_method ?? ''})
    successMessage.value = message
    useNewCard.value = false
  } catch (error: any) {
    console.error("Error saving card:", error)
    errorMessage.value = error.message
  } finally {
    isProcessing.value = false
  }
}

// -----------------------------
// Subscription Upgrade/Downgrade
// -----------------------------
const upgradeSubscription = async (priceId: string) => {
  isProcessing.value = true
  errorMessage.value = ""
  try {
    await stripeStore.upgradeSubscription({
      priceId,
      paymentMethodId: selectedPaymentMethod.value ?? '',
    })
    confirmUpgradeId.value = null
    successMessage.value = "Subscription upgraded successfully!"
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isProcessing.value = false
  }
}

const downgradeSubscription = async (priceId: string) => {
  isProcessing.value = true
  errorMessage.value = ""
  try {
    await stripeStore.downgradeSubscription({ priceId })
    confirmDowngradeId.value = null
    successMessage.value = "Subscription downgraded successfully!"
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isProcessing.value = false
  }
}

// -----------------------------
// Delete & Set Default Card
// -----------------------------
const deleteCard = async (paymentMethodId: string) => {
  isProcessing.value = true
  errorMessage.value = ""
  try {
    await stripeStore.deleteCard(paymentMethodId)
    deleteConfirmId.value = null
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isProcessing.value = false
  }
}

const setDefaultCard = async (cardId: string) => {
  try {
    await stripeStore.setDefaultCard(cardId)
  } catch (error: any) {
    errorMessage.value = error.message
  }
}

// -----------------------------
// Lifecycle
// -----------------------------
onMounted(async () => {
  if (isLoggedIn.value && currentUser.value) {
    // await store.dispatch("fetchAllSubscriptions");
    await stripeStore.fetchUserSubscription()
    await stripeStore.fetchPaymentMethods()
    selectedPaymentMethod.value = stripeStore.defaultPaymentMethod
  }
})
</script>

