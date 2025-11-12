<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 bg-base-100 rounded-md px-6 py-3 shadow-lg mb-6">
          <span class="text-3xl">🛍️</span>
          <span class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            GigStaStore
          </span>
        </div>

        <h1 class="text-3xl md:text-4xl font-semibold text-base-content mb-6 leading-tight">
          Our Hustle. Our Heart.<br/>
          <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Community.
          </span>
        </h1>

        <p class="text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed flex flex-wrap justify-center gap-1">
          A platform where African communities in
          <span class="badge badge-primary badge-lg font-semibold px-3">New Zealand 🇳🇿</span>
          &
          <span class="badge badge-secondary badge-lg font-semibold px-3">Australia 🇦🇺</span>
          can connect, grow, and thrive together through entrepreneurship.
        </p>

      </div>

      <!-- Two Products Section -->
      <div class="grid lg:grid-cols-2 gap-8 mb-16">
        <!-- GigSta - Live -->
        <div class="relative bg-base-100 rounded-md shadow-xl overflow-hidden border-2 border-purple-500">
          <div class="absolute top-4 right-4 badge badge-success gap-2 px-4 py-3">
            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE NOW
          </div>

          <div class="p-8">
            <!-- GigSta Logo -->
            <div class="flex justify-center mb-6">
              <img
                  src="../assets/images/banner.png"
                  alt="GigSta Logo"
                  class="h-24 w-auto object-contain rounded-xl"
              />
            </div>

            <div class="flex items-center justify-center gap-3 mb-4">
              <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                GigSta
              </h2>
            </div>

            <p class="text-base-content/70 text-lg mb-6 text-center font-semibold">
              Your Services Marketplace
            </p>

            <div class="space-y-3 mb-6">
              <div class="flex items-start gap-3">
                <span class="text-purple-600 font-bold text-sm">✓</span>
                <p class="text-base-content/80">Find trusted service providers in your community</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-orange-500 font-bold text-sm">✓</span>
                <p class="text-base-content/80">Offer your services: hairdressing, cleaning, catering, moving & more</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-purple-600 font-bold text-sm">✓</span>
                <p class="text-base-content/80">Build your side hustle within the community</p>
              </div>
            </div>

            <a
                href="https://gigsta.co.nz"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary w-full text-lg"
            >
              Visit GigSta →
            </a>
          </div>
        </div>

        <!-- GigStaStore - Coming Soon -->
        <div class="relative bg-base-100 rounded-md shadow-xl overflow-hidden border-2 border-base-300">
          <div class="absolute top-4 right-4 badge badge-warning gap-2 px-4 py-3">
            COMING SOON
          </div>

          <div class="p-8">
            <!-- GigStaStore Logo -->
            <div class="flex justify-center mb-6">
              <img
                  src="../assets/images/banner.png"
                  alt="GigStaStore Logo"
                  class="h-24 w-auto object-contain rounded-xl"
              />
            </div>

            <div class="flex items-center justify-center gap-3 mb-4">
              <h2 class="text-3xl font-bold text-base-content">
                GigStaStore
              </h2>
            </div>

            <p class="text-base-content/70 text-lg mb-6 text-center font-semibold">
              Your Products Marketplace
            </p>

            <div class="space-y-3 mb-6">
              <div class="flex items-start gap-3">
                <span class="text-base-content/60 font-bold text-sm">★</span>
                <p class="text-base-content/80">Create your own virtual shop for African products</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-base-content/60 font-bold text-sm">★</span>
                <p class="text-base-content/80">Sell clothes, beauty products, hair pieces, crafts & more</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-base-content/60 font-bold text-sm">★</span>
                <p class="text-base-content/80">Support African-owned small businesses</p>
              </div>
            </div>

            <button
                disabled
                class="btn btn-disabled w-full text-lg"
            >
              Launching Soon...
            </button>
          </div>
        </div>
      </div>

      <!-- Mission Statement -->
      <div
          class="bg-gradient-to-r from-primary to-secondary rounded-md p-8 md:p-12 text-primary-content text-center mb-16 shadow-2xl">
        <h3 class="text-3xl md:text-4xl font-bold mb-6">
          More Than a Platform — It's a Movement ✊🏾
        </h3>
        <p class="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto opacity-95">
          Our goal as GigStatech is to build a thriving African community in NZ & Australia through our online platforms
          (GigSta & GigStaStore) that connects and grows small businesses, strengthening our economy. Together, we
          empower each other and
          enrich our wider society. 💪🏾
        </p>
      </div>

      <!-- Sign Up Form -->
      <div class="max-w-2xl mx-auto">
        <div class="card bg-base-100 shadow-2xl border border-base-200">
          <div class="card-body p-8 md:p-12">
            <div class="text-center mb-8">
              <div
                  class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4">
                <span class="text-3xl">🛍️</span>
              </div>
              <h2 class="card-title text-3xl font-bold justify-center mb-2">
                Be First to Launch Your Shop
              </h2>
              <p class="text-base-content/70">
                Join the GigStaStore launch list and get early access
              </p>
            </div>

            <div v-if="!submitted" class="space-y-5">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Name *</span>
                </label>
                <input
                    v-model="form.name"
                    type="text"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': v$.name.$error }"
                    placeholder="Your Name"
                />
                <label v-if="v$.name.$error" class="label">
                  <span class="label-text-alt text-error">
                    <span v-if="v$.name.required.$invalid">Name is required.</span>
                    <span v-else-if="v$.name.minLength.$invalid">Name must be at least 2 characters.</span>
                  </span>
                </label>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Email *</span>
                </label>
                <input
                    v-model="form.email"
                    type="email"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': v$.email.$error }"
                    placeholder="you@email.com"
                />
                <label v-if="v$.email.$error" class="label">
                  <span class="label-text-alt text-error">
                    <span v-if="v$.email.required.$invalid">Email is required.</span>
                    <span v-else-if="v$.email.email.$invalid">Please enter a valid email address.</span>
                  </span>
                </label>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Business / Trading Name</span>
                </label>
                <input
                    v-model="form.business"
                    type="text"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': v$.business.$error }"
                    placeholder="Your Business Name"
                    @blur="v$.business.$touch()"
                />
                <label v-if="v$.business.$error" class="label">
                  <span class="label-text-alt text-error">
                    <span
                        v-if="v$.business.isString.$invalid">Business name must contain only letters and spaces.</span>
                  </span>
                </label>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Phone Number</span>
                </label>
                <input
                    v-model="form.phone"
                    type="tel"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': v$.phone.$error }"
                    placeholder="+64 21 123 4567 or +61 4 1234 5678"
                    @blur="v$.phone.$touch()"
                />
                <label v-if="v$.phone.$error" class="label">
                  <span class="label-text-alt text-error">
                    <span v-if="v$.phone.isValidNZAUPhone.$invalid">
                      Please enter a valid NZ (+64) or Australian (+61) phone number.
                    </span>
                  </span>
                </label>
              </div>

              <button
                  @click="handleSubmit"
                  :disabled="isSubmitting"
                  class="btn btn-primary w-full text-lg"
              >
                <span v-if="isSubmitting" class="loading loading-spinner"></span>
                {{ isSubmitting ? 'Submitting...' : 'Notify Me 🚀' }}
              </button>
            </div>

            <div v-else class="text-center py-8">
              <div class="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-3xl">✅</span>
              </div>
              <h3 class="text-2xl font-bold text-base-content mb-2">You're on the list!</h3>
              <p class="text-base-content/70">We'll keep you posted on our launch.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <!--      <div class="mt-16 text-center">-->
      <!--        <div class="flex flex-wrap justify-center gap-2 text-sm text-base-content/60 mb-4">-->
      <!--          <span class="badge badge-outline">#GigSta</span>-->
      <!--          <span class="badge badge-outline">#GigStaStore</span>-->
      <!--          <span class="badge badge-outline">#AfricanCommunity</span>-->
      <!--          <span class="badge badge-outline">#SupportLocal</span>-->
      <!--          <span class="badge badge-outline">#NZ</span>-->
      <!--          <span class="badge badge-outline">#Australia</span>-->
      <!--        </div>-->
      <!--        <p class="text-base-content/40 text-sm">-->
      <!--          Building together. Growing together. Thriving together.-->
      <!--        </p>-->
      <!--      </div>-->

      <!-- Social Media Strip -->
      <section
          class="w-full bg-base-200 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 dark:border-gray-700 py-6 px-20 mt-16">
        <div class="w-[90%] mx-auto">
          <div class="flex items-center justify-between gap-6 flex-wrap">
            <!-- Title Section -->
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="fas fa-share-alt text-white text-lg"></i>
              </div>
              <div>
                <h3 class="font-semibold text-base-content text-lg">Follow Us</h3>
                <p class="text-xs text-gray-600 dark:text-gray-400">Stay connected with GigSta & GigStaStore</p>
              </div>
            </div>

            <!-- Social Media Links - Horizontal -->
            <div class="flex items-center gap-3 flex-wrap flex-1 justify-end">
              <a
                  href="https://www.facebook.com/profile.php?id=61579148535774"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                <i class="fa-brands fa-facebook text-lg"></i>
              </a>

              <a
                  href="https://www.tiktok.com/@gigstanz"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 bg-black hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                <i class="fa-brands fa-tiktok text-lg"></i>
              </a>

              <a
                  href="https://x.com/chamambom"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 bg-black hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                <i class="fa-brands fa-x-twitter text-lg"></i>
              </a>

              <a
                  href="https://www.youtube.com/@GigStaNZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                <i class="fa-brands fa-youtube text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import {required, email, minLength, helpers} from '@vuelidate/validators'
import {useToast} from 'vue-toastification'

const toast = useToast()

// Form state
const form = reactive({
  name: '',
  email: '',
  business: '',
  phone: ''
})

// Custom validation helpers
const isString = helpers.withMessage(
    'Business name must contain only letters and spaces.',
    (value) => !value || /^[A-Za-z\s]+$/.test(value)
)

const isValidNZAUPhone = helpers.withMessage(
    'Please enter a valid NZ (+64) or Australian (+61) phone number.',
    (value) => {
      if (!value) return true // optional
      return /^\+(64|61)\s?\d{1,2}\s?\d{3,4}\s?\d{3,4}$/.test(value.trim())
    }
)

// Validation rules
const rules = {
  name: {required, minLength: minLength(2)},
  email: {required, email},
  business: {isString},
  phone: {isValidNZAUPhone}
}

const v$ = useVuelidate(rules, form)

const success = ref(false)
const error = ref(null)
const isSubmitting = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) {
    toast.error('Please correct the highlighted fields before submitting.')
    return
  }

  try {
    isSubmitting.value = true
    error.value = null
    success.value = false

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/coming-soon`, form)
    success.value = true
    toast.success('🎉 Thanks for joining! We’ll keep you posted.')

    // Reset form
    form.name = ''
    form.email = ''
    form.business = ''
    form.phone = ''
    v$.value.$reset()
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to submit form.'
    toast.error(error.value)
  } finally {
    isSubmitting.value = false
  }
}
</script>




