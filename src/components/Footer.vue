<template>

  <!-- Modern Minimal Footer -->
  <footer
      class="w-full mx-auto text-base-content mt-12 bg-base-300 dark:bg-base-200 my-4 rounded-tl-md rounded-tr-md text-sm">
    <!-- Middle Section - Links Grid -->
    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 dark:border-gray-700 bg-base-100 px-6 rounded-md">

      <!-- Quick Links -->
      <div>
        <h2 class="text-lg font-semibold text-base-content dark:text-base mb-4 flex items-center gap-2">
          <div class="w-1 h-4 bg-purple-700 rounded-full"></div>
          Quick Links
        </h2>
        <ul class="space-y-2">
          <li>
            <a href="/" class="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400
                                  transition-colors duration-300 flex items-center gap-2">
              <i class="fas fa-home text-xs opacity-60"></i>
              Home
            </a>
          </li>
          <li>
            <a href="/about" class="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400
                                        transition-colors duration-300 flex items-center gap-2">
              <i class="fas fa-info-circle text-xs opacity-60"></i>
              About
            </a>
          </li>
          <li>
            <a href="/contact" class="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400
                                          transition-colors duration-300 flex items-center gap-2">
              <i class="fas fa-envelope text-xs opacity-60"></i>
              Contact
            </a>
          </li>
          <li>
            <a href="/faq" class="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400
                                      transition-colors duration-300 flex items-center gap-2">
              <i class="fas fa-question-circle text-xs opacity-60"></i>
              FAQ
            </a>
          </li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h2 class="text-lg font-semibold text-base-content dark:text-base mb-4 flex items-center gap-2">
          <div class="w-1 h-4 bg-orange-400 rounded-full"></div>
          Legal
        </h2>
        <ul class="space-y-2">
          <li>
            <a href="/terms" class="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400
                                    transition-colors duration-300 flex items-center gap-2">
              <i class="fas fa-file-contract text-xs opacity-60"></i>
              Terms
            </a>
          </li>
          <li>
            <a href="/privacy" class="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400
                                        transition-colors duration-300 flex items-center gap-2">
              <i class="fas fa-shield-alt text-xs opacity-60"></i>
              Privacy
            </a>
          </li>
          <li>
            <a href="/refund-policy" class="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400
                                              transition-colors duration-300 flex items-center gap-2">
              <i class="fas fa-exchange-alt text-xs opacity-60"></i>
              Refund & Cancellation Policy
            </a>
          </li>
          <li>
            <a href="/protection" class="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400
                                              transition-colors duration-300 flex items-center gap-2">
              <i class="fas fa-user-shield text-xs opacity-60"></i>
              GigSta & Client Protection
            </a>
          </li>
         <li>
    <a href="/facebook-data-deletion" class="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400
                                      transition-colors duration-300 flex items-center gap-2">
      <i class="fas fa-database text-xs opacity-60"></i>
      Facebook Data Deletion
    </a>
  </li>
        </ul>
      </div>


      <!--      &lt;!&ndash; Services &ndash;&gt;-->
      <!--      <div>-->
      <!--        <h2 class="text-lg font-semibold text-base-content dark:text-base mb-4 flex items-center gap-2">-->
      <!--          <div class="w-1 h-4 bg-gradient-to-b from-purple-700 to-orange-400 rounded-full"></div>-->
      <!--          GigSta Services-->
      <!--        </h2>-->
      <!--        <ul class="space-y-2">-->
      <!--          <li>-->
      <!--            <a href="/#" class="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400-->
      <!--                                           transition-colors duration-300 flex items-center gap-2">-->
      <!--              <i class="fas fa-calendar-alt text-xs opacity-60"></i>-->
      <!--              Booking System-->
      <!--            </a>-->
      <!--          </li>-->
      <!--          <li>-->
      <!--            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400-->
      <!--                                                transition-colors duration-300 flex items-center gap-2">-->
      <!--              <i class="fas fa-crown text-xs opacity-60"></i>-->
      <!--              Subscriptions-->
      <!--            </a>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </div>-->

      <!-- Connect Section -->
      <div>
        <h2 class="text-lg font-semibold text-base-content dark:text-base mb-4 flex items-center gap-2">
          <div class="w-1 h-4 bg-gradient-to-b from-orange-400 to-purple-700 rounded-full"></div>
          Connect
        </h2>

        <!-- Email Signup -->
        <div class="mb-6">
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
            Subscribe to stay updated on whats going on
          </p>

          <form @submit.prevent="subscribe" class="flex flex-col">
            <div class="flex">
              <input
                  v-model="email"
                  type="email"
                  placeholder="Your email"
                  class="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600
               rounded-l-lg px-3 py-2 text-sm outline-none
               focus:border-purple-500 dark:focus:border-purple-400
               transition-colors duration-300 text-gray-800 dark:text-gray-200"
                  :class="{ 'border-red-500': v$.email.$error }"
              />
              <button
                  type="submit"
                  :disabled="isLoading"
                  class="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-r-lg
               transition-colors duration-300 disabled:opacity-50"
              >
                <i v-if="!isLoading" class="fas fa-arrow-right text-sm"></i>
                <span v-else class="text-xs">...</span>
              </button>
            </div>

            <!-- Validation message (shows only if error) -->
            <p v-if="v$.email.$error" class="text-red-600 text-xs mt-1">
              {{ v$.email.$errors[0].$message }}
            </p>
          </form>

          <!-- Toast -->
          <div
              v-if="toast.show"
              :class="[
                  'fixed bottom-5 right-5 px-4 py-2 rounded shadow-md text-white transition-all',
                  toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                ]"
          >
            {{ toast.message }}
          </div>
        </div>

        <!-- Social Links -->
        <div>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">Follow us</p>
          <div class="flex gap-2">
            <a
                href="https://www.facebook.com/share/p/17EpnSfYPu/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300">
              <i class="fa-brands fa-facebook text-sm"></i>
            </a>
            <a
                href="https://www.tiktok.com/@gigstanz"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 bg-black hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-colors duration-300">
              <i class="fa-brands fa-tiktok text-sm"></i>
            </a>
            <a
                href="https://x.com/chamambom"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 bg-black hover:bg-gray-900 rounded-lg flex items-center justify-center text-white transition-colors duration-300">
              <i class="fa-brands fa-x-twitter text-sm"></i>
            </a>
            <a
                href="https://www.youtube.com/@GigStaNZ"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center text-white transition-colors duration-300">
              <i class="fa-brands fa-youtube text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Stripe Payment Info Strip - Add this right after the subscription plans section -->
    <section
        class="w-full py-8 bg-base-100 dark:bg-base-200 border-t border-base-300">
      <div class="max-w-4xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">

          <!-- Security Badge -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-shield-halved text-blue-600 dark:text-blue-400"></i>
            </div>
            <div>
              <h3 class="font-semibold text-base-content dark:text-base-content text-sm">Secure Payments</h3>
              <p class="text-gray-600 dark:text-gray-400 text-xs">Powered by Stripe</p>
            </div>
          </div>

          <!-- Divider -->
          <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-600"></div>

          <!-- Supported Cards -->
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">We accept:</span>
            <div class="flex items-center gap-2">
              <div class="w-8 h-6 bg-white rounded border flex items-center justify-center">
                <i class="fa-brands fa-cc-visa text-blue-600 text-sm"></i>
              </div>
              <div class="w-8 h-6 bg-white rounded border flex items-center justify-center">
                <i class="fa-brands fa-cc-mastercard text-red-500 text-sm"></i>
              </div>
              <div class="w-8 h-6 bg-white rounded border flex items-center justify-center">
                <i class="fa-brands fa-cc-amex text-blue-500 text-sm"></i>
              </div>
              <div class="w-8 h-6 bg-white rounded border flex items-center justify-center">
                <i class="fa-brands fa-cc-discover text-orange-500 text-sm"></i>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-600"></div>

          <!-- SSL/Security -->
          <div class="flex items-center gap-2">
            <i class="fas fa-lock text-green-600 dark:text-green-400"></i>
            <span class="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encrypted</span>
          </div>

        </div>
      </div>
    </section>

    <!-- Bottom Section Copyright -->
    <div class="pt-8 border-0 border-gray-200 dark:border-gray-700 px-2 bg-base-300">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Copyright -->
        <div class="text-gray-600 dark:text-gray-400">
          <p>© 2025 <span class="font-semibold text-base-content dark:text-base">GigStaTech Ltd</span>. All rights
            reserved.</p>
        </div>

        <!-- Additional Info -->
        <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span class="flex items-center gap-1">
                <i class="fas fa-map-marker-alt text-purple-500"></i>
                AU & NZ
              </span>
          <span class="flex items-center gap-1">
                <i class="fas fa-code text-orange-400"></i>
                Made with ❤️
              </span>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup>
import {useNewsletter} from '@/composables/useNewsletter.js'

const {email, isLoading, subscribe, toast, v$} = useNewsletter()

</script>

