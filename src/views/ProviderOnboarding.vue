<template>
  <div class="container mx-auto p-4 md:p-8">
    <div class="card bg-base-100 shadow-xl rounded-box border border-base-200">
      <div class="card-body">
        <!-- Header Section -->
        <div class="flex flex-col items-center text-center mb-6">
          <div class="avatar placeholder mb-4">
            <div class="bg-orange-400 text-white rounded-full w-16 h-16">
              <span class="text-2xl">🚀</span>
            </div>
          </div>
          <h2 class="text-3xl font-bold text-base-content mb-2">Become a GigSta Provider!</h2>
          <p class="text-lg text-base-content/60 max-w-md">
            Let's get your business set up to offer services and start earning.
          </p>

          <!-- Progress Indicator -->
          <div class="steps steps-horizontal mt-6">
            <div class="step step-primary">Provider Setup</div>
            <div class="step">Business Details</div>
            <div class="step">Service Creation</div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Main Form Section -->
        <div class="max-w-2xl mx-auto w-full">
          <div class="flex items-center mb-6">
            <div
                class="flex-shrink-0 w-10 h-10 bg-orange-400 text-white rounded-full flex items-center justify-center mr-4">
              <span class="font-semibold">1</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-base-content">Provider Information</h3>
              <p class="text-base-content/70">Tell us about yourself and your business</p>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Personal Information Section -->
            <div class="card bg-base-200/30 shadow-sm border border-base-300">
              <div class="card-body p-6">
                <div class="flex items-center mb-4">
                  <div class="avatar placeholder mr-3">
                    <div class="bg-purple-600 text-white rounded-full w-8 h-8">
                      <span class="text-sm">👤</span>
                    </div>
                  </div>
                  <h4 class="text-lg font-semibold text-base-content">Personal Details</h4>
                </div>

                <div class="space-y-4">
                  <!-- Full Name -->
                  <div class="form-control">
                    <label for="fullName" class="label">
                      <span class="label-text text-sm font-medium text-base-content">
                        Full Name <span class="text-error">*</span>
                      </span>
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        v-model="v$.providerDetails.full_name.$model"
                        class="input input-bordered w-full focus:border-orange-400 bg-base-100 border-base-300"
                        :class="{'input-error border-error': v$.providerDetails.full_name.$error}"
                        placeholder="Enter your full legal name"
                    />
                    <div v-if="v$.providerDetails.full_name.$error" class="label">
                      <span class="label-text-alt text-error">
                        <span v-for="error of v$.providerDetails.full_name.$errors" :key="error.$uid">
                          {{ error.$message }}
                        </span>
                      </span>
                    </div>
                  </div>

                  <!-- Phone Number -->
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text text-sm font-medium text-base-content">
                        Phone Number <span class="text-error">*</span>
                      </span>
                    </label>
                    <div class="flex gap-3">
                      <select
                          v-model="phoneCountryCode"
                          class="select select-bordered focus:border-orange-400 bg-base-100 border-base-300 flex-shrink-0"
                      >
                        <option value="+64">+64 (NZ)</option>
                        <option value="+61">+61 (AU)</option>
                      </select>
                      <input
                          type="tel"
                          v-model="v$.providerDetails.phone_number.$model"
                          class="input input-bordered w-full focus:border-orange-400 bg-base-100 border-base-300"
                          :class="{'input-error border-error': v$.providerDetails.phone_number.$error}"
                          placeholder="e.g. 021 123 4567"
                      />
                    </div>
                    <div v-if="v$.providerDetails.phone_number.$error" class="label">
                      <span class="label-text-alt text-error">
                        <span v-for="error of v$.providerDetails.phone_number.$errors" :key="error.$uid">
                          {{ error.$message }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Information Section -->
            <div class="card bg-base-200/30 shadow-sm border border-base-300">
              <div class="card-body p-6">
                <div class="flex items-center mb-4">
                  <div class="avatar placeholder mr-3">
                    <div class="bg-green-500 text-white rounded-full w-8 h-8">
                      <span class="text-sm">🏢</span>
                    </div>
                  </div>
                  <h4 class="text-lg font-semibold text-base-content">Business Information</h4>
                </div>

                <div class="space-y-4">
                  <!-- Trading Name -->
                  <div class="form-control">
                    <label for="tradingName" class="label">
                      <span class="label-text text-sm font-medium text-base-content">
                        Trading Name <span class="text-error">*</span>
                      </span>
                    </label>
                    <input
                        id="tradingName"
                        type="text"
                        v-model="v$.providerDetails.tradingName.$model"
                        class="input input-bordered w-full focus:border-orange-400 bg-base-100 border-base-300"
                        :class="{'input-error border-error': v$.providerDetails.tradingName.$error}"
                        placeholder="Your business or brand name"
                    />
                    <div v-if="v$.providerDetails.tradingName.$error" class="label">
                      <span class="label-text-alt text-error">
                        <span v-for="error of v$.providerDetails.tradingName.$errors" :key="error.$uid">
                          {{ error.$message }}
                        </span>
                      </span>
                    </div>
                  </div>

                  <!-- Address Section -->
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text text-sm font-medium text-base-content">
                        Business Location <span class="text-error">*</span>
                      </span>
                    </label>

                    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div class="md:col-span-3">
                        <input
                            type="text"
                            id="typeahead-address"
                            v-model="v$.userAddressSearchInput.$model"
                            class="input input-bordered w-full focus:border-orange-400 bg-base-100 border-base-300"
                            :class="{'input-error border-error': v$.userAddressSearchInput.$error}"
                            placeholder="Start typing your business address..."
                            @input="fetchAddressSuggestions"
                        />
                      </div>

                      <div>
                        <select
                            v-model="v$.countryCode.$model"
                            id="country_code"
                            class="select select-bordered w-full focus:border-orange-400 bg-base-100 border-base-300"
                        >
                          <option value="NZ">New Zealand</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>

                    <!-- Address Suggestions Dropdown -->
                    <div v-if="addressSuggestions.length" class="relative mt-2">
                      <div
                          class="absolute w-full z-10 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        <div
                            v-for="(suggestion, index) in addressSuggestions"
                            :key="index"
                            @click="selectAddressSuggestion(suggestion)"
                            class="p-3 hover:bg-base-200 cursor-pointer border-b border-base-200 last:border-b-0 transition-colors"
                        >
                          <div class="text-sm text-base-content">{{ suggestion?.formatted ?? '' }}</div>
                        </div>
                      </div>
                    </div>

                    <div v-if="v$.providerDetails.address.$error" class="label">
                      <span class="label-text-alt text-error">
                        Please select a suggested address to set location.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Success Message or Tips -->
            <div class="alert alert-info bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   class="stroke-current shrink-0 w-6 h-6 text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="font-bold text-blue-700 dark:text-blue-300">Almost there!</h3>
                <div class="text-sm text-blue-600 dark:text-blue-300">
                  After completing this step, you'll be able to create your first service and start accepting bookings.
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions justify-between pt-6">
              <button
                  type="button"
                  @click="goBackToSeekerDashboard"
                  class="btn btn-ghost text-base-content"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Back to Dashboard
              </button>

              <button
                  type="submit"
                  class="btn bg-orange-400 hover:bg-orange-500 border-orange-400 text-white shadow-lg"
                  :disabled="v$.$invalid"
              >
                Complete Provider Setup
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import {debounce} from 'lodash-es'
import useVuelidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'

import {useAuthStore} from '@/stores/authStore'

interface AddressSuggestion {
  formatted: string
  street_number?: string
  street?: string
  locality?: string
  city?: string
  region?: string
  postcode?: string
  lat?: number
  lon?: number
}

const addressSuggestions = ref<AddressSuggestion[]>([])

// Pinia store
const authStore = useAuthStore()
const router = useRouter()

// Reactive data for provider details and address search
const providerDetails = reactive({
  full_name: '',
  tradingName: '',
  phone_number: '',
  address: reactive({
    formatted: '',
    street_number: '',
    street: '',
    locality: '',
    city: '',
    region: '',
    postcode: '',
    latitude: null as number | null,
    longitude: null as number | null,
  }),
})

// Address search reactive variables
const userAddressSearchInput = ref('')
// const addressSuggestions = ref([])
const countryCode = ref('NZ')
const phoneCountryCode = ref('+64')

// Computed current user from Pinia store
const currentUser = computed(() => authStore.currentUser)

// Custom validator for NZ/AU phone numbers
const isMobileNumberValid = (value: string, phoneCountryCode: string) => {
  const nzRegex = /^2\d{7,8}$/
  const auRegex = /^4\d{8}$/
  if (phoneCountryCode === '+64' && nzRegex.test(value)) return true
  if (phoneCountryCode === '+61' && auRegex.test(value)) return true
  return false
}

// Vuelidate rules
const rules = computed(() => ({
  providerDetails: {
    full_name: {required: helpers.withMessage('Full name is required', required)},
    tradingName: {required: helpers.withMessage('Trading name is required', required)},
    phone_number: {
      required: helpers.withMessage('Phone number is required', required),
      isMobileNumberValid: helpers.withMessage(
          'Please enter a valid mobile number for the selected country.',
          (value) => isMobileNumberValid(value, phoneCountryCode.value)
      ),
    },
    address: {
      latitude: {
        required: helpers.withMessage(
            'Please select a valid address from the suggestions',
            required
        ),
      },
      longitude: {
        required: helpers.withMessage(
            'Please select a valid address from the suggestions',
            required
        ),
      },
    },
  },
  userAddressSearchInput: {required: helpers.withMessage('Address is required', required)},
  countryCode: {required: helpers.withMessage('Country is required', required)},
}))

const v$ = useVuelidate(rules, {providerDetails, userAddressSearchInput, countryCode})

// Watch currentUser and populate providerDetails
watch(
    currentUser,
    (newUser) => {
      if (!newUser) return

      providerDetails.full_name = newUser.full_name || ''
      providerDetails.tradingName = newUser.tradingName || ''

      if (newUser.phone_number) {
        if (newUser.phone_number.startsWith('+64')) {
          phoneCountryCode.value = '+64'
          providerDetails.phone_number = newUser.phone_number.substring(3)
        } else if (newUser.phone_number.startsWith('+61')) {
          phoneCountryCode.value = '+61'
          providerDetails.phone_number = newUser.phone_number.substring(3)
        } else {
          providerDetails.phone_number = newUser.phone_number
        }
      } else providerDetails.phone_number = ''

      const addr = newUser.address || {}
      providerDetails.address.formatted = addr.formatted || ''
      providerDetails.address.street_number = addr.street_number || ''
      providerDetails.address.street = addr.street || ''
      providerDetails.address.locality = addr.locality || ''
      providerDetails.address.city = addr.city || ''
      providerDetails.address.region = addr.region || ''
      providerDetails.address.postcode = addr.postcode || ''
      providerDetails.address.latitude = addr.latitude || null
      providerDetails.address.longitude = addr.longitude || null

      userAddressSearchInput.value = providerDetails.address.formatted
    },
    {immediate: true}
)

// Address suggestions API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const fetchAddressSuggestions = debounce(async () => {
  if (userAddressSearchInput.value.length < 4) {
    addressSuggestions.value = []
    return
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/api/v1/api/address/suggestions`, {
      params: {q: userAddressSearchInput.value, country_code: countryCode.value},
    })
    addressSuggestions.value = res.data
  } catch (error) {
    console.error('Error fetching address suggestions:', error)
    addressSuggestions.value = []
  }
}, 500)

// Select address suggestion
const selectAddressSuggestion = (suggestion: any) => {
  userAddressSearchInput.value = suggestion.formatted
  addressSuggestions.value = []

  Object.assign(providerDetails.address, {
    formatted: suggestion.formatted,
    street_number: suggestion.street_number,
    street: suggestion.street,
    locality: suggestion.locality,
    city: suggestion.city,
    region: suggestion.region,
    postcode: suggestion.postcode,
    latitude: suggestion.lat,
    longitude: suggestion.lon,
  })

  v$.value.providerDetails.address.latitude.$touch()
}

// Submit provider onboarding
const handleSubmit = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return console.error('Validation Error: Please correct the errors.')

  try {
    const fullPhoneNumber = `${phoneCountryCode.value}${providerDetails.phone_number}`
    await authStore.completeProviderOnboarding({
      full_name: providerDetails.full_name,
      tradingName: providerDetails.tradingName,
      phone_number: fullPhoneNumber,
      address: {...providerDetails.address},
    })
    router.push('/onboarding/billing-setup')
  } catch (error: unknown) {
    const err = error as any
    console.error(
        'Provider setup (Step 1) failed:',
        String(err?.response?.data?.detail || err?.message || err)
    )
  }
}

// Cancel and go back
const goBackToSeekerDashboard = () => {
  router.push('/seeker-dashboard')
}
</script>

