<template>
  <div class="min-h-[calc(100vh-10rem)]  px-6 py-16 flex flex-col items-center justify-center">
    <div class="max-w-6xl w-full space-y-12">
      <!-- Full-width Header Section -->
      <div class="text-center space-y-6">
        <!-- Logo Ball -->
        <div class="flex justify-center">
          <div
            class="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-tr from-[#0d6efd] to-[rgb(255,152,67)]"
          >
            <span class="text-white text-5xl font-extrabold tracking-tight">🛍️</span>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Something <span class="text-[#0d6efd]">Exciting</span> is
          <span class="text-[rgb(255,152,67)]">Coming!</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          We're building <strong>GigStaStore</strong> — a product marketplace for African-owned small businesses in
          Australia and New Zealand.
        </p>
      </div>

      <!-- Two-Column Content Section -->
      <div class="grid md:grid-cols-2 gap-10 items-start">
        <!-- Left Column: GigSta / GigStaStore Info -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6 text-left space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 text-center">
              💛 Our Hustle. Our Heart. Our Community.
            </h2>
            <p class="text-gray-600 text-center mt-2">
              Ever felt like there should be a space where our African community in New Zealand 🇳🇿 & Australia 🇦🇺 can
              connect, grow, and thrive together?
            </p>
            <p class="text-gray-600 text-center mt-2">
              We felt the same — so we built it. 💡
            </p>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 text-center">Introducing GigSta and GigStaStore 👇🏾</h3>

            <!-- GigSta (Already Functional) -->
            <div class="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 mt-4">
              <div class="flex items-start gap-3">
                <span class="text-2xl">✨</span>
                <div>
                  <h4 class="font-bold text-gray-900">GigSta – Our Services Marketplace</h4>
                  <p class="text-gray-700 mb-1">
                    Find or offer services like hairdressing, cleaning, catering, moving, and more.
                  </p>
                  <a
                    href="https://gigsta.co.nz"
                    target="_blank"
                    class="text-[#0d6efd] font-medium hover:underline inline-block"
                  >
                    👉 gigsta.co.nz <span class="text-sm text-green-600 ml-1">(Live & Functional)</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- GigStaStore (Coming Soon) -->
            <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 mt-4">
              <div class="flex items-start gap-3">
                <span class="text-2xl">🛍️</span>
                <div>
                  <h4 class="font-bold text-gray-900">GigStaStore – For African-owned small businesses</h4>
                  <p class="text-gray-700">
                    If you’re a Seller, create your Virtual Shop. Buyers can find African clothes, beauty products,
                    T-shirts, hair pieces & more.
                  </p>
                  <span class="text-gray-700 font-medium inline-block">
                    👉 Coming Soon <span class="text-sm text-orange-500 ml-1">(Launching Shortly)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p class="text-gray-700 italic text-center">
              This isn't just an app — it's our movement. ✊🏾<br />
              A place to lift each other up, create side hustles, and keep our money circulating within our community. 💪🏾
            </p>
            <p class="text-gray-800 font-medium text-center mt-2">
              Let's build, support, and grow — together.
            </p>
          </div>
        </div>

        <!-- Right Column: Sign-Up Form -->
        <div class="bg-white border border-gray-200 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Join the Launch List 🚀</h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
    <input
      v-model="form.name"
      type="text"
      class="input input-bordered w-full"
      placeholder="Your Name"
      :class="{ 'input-error border-red-500': v$.name.$error }"
    />
    <span v-if="v$.name.$error" class="text-sm text-red-500">
      <span v-if="v$.name.required.$invalid">Name is required.</span>
      <span v-else-if="v$.name.minLength.$invalid">Name must be at least 2 characters.</span>
    </span>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
    <input
      v-model="form.email"
      type="email"
      class="input input-bordered w-full"
      placeholder="you@email.com"
      :class="{ 'input-error border-red-500': v$.email.$error }"
    />
    <span v-if="v$.email.$error" class="text-sm text-red-500">
      <span v-if="v$.email.required.$invalid">Email is required.</span>
      <span v-else-if="v$.email.email.$invalid">Please enter a valid email address.</span>
    </span>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Business / Trading Name</label>
    <input
      v-model="form.business"
      type="text"
      class="input input-bordered w-full"
      placeholder="Your Business Name"
    />
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
    <input
      v-model="form.phone"
      type="tel"
      class="input input-bordered w-full"
      placeholder="+64 21 123 4567"
    />
  </div>

  <button
    type="submit"
    class="btn bg-[rgb(255,152,67)] hover:bg-orange-500 text-white w-full font-semibold"
    :disabled="isSubmitting"
  >
    {{ isSubmitting ? 'Submitting...' : 'Notify Me' }}
  </button>

  <p v-if="success" class="text-green-600 text-center mt-4">✅ Thanks! We’ll keep you posted.</p>
</form>

          <p v-if="submitted" class="text-green-600 text-center mt-4">✅ Thanks! We’ll keep you posted.</p>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="text-center">
        <p class="text-sm text-gray-500">
          #GigSta #GigStaStore #AfricanCommunity #SupportLocal #NZ #Australia #AfricanExcellence #SideHustle #BuyBlack
          #CommunityEmpowerment
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Form state
const form = reactive({
  name: '',
  email: '',
  business: '',
  phone: ''
})

// Validation rules
const rules = {
  name: { required, minLength: minLength(2) },
  email: { required, email },
  business: {},
  phone: {}
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




