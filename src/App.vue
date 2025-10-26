<template>
  <div class="drawer lg:drawer-open min-h-screen text-base-content/60 bg-base-300">
    <input id="left-sidebar-drawer" type="checkbox" class="drawer-toggle"/>

    <div class="drawer-content flex flex-col">
      <div class="sticky top-0 z-500 w-full">
        <RouterView name="TopNavBar"/>
      </div>

      <div
          :class="isFullWidthPage ? 'w-full' : (isCurrentUserProvider ? 'container-sidebar' : 'container-navbar')"
          class="flex flex-col pt-0"
      >
<!--        <RouterView name="SiteMapBar"/>-->
<!--        <RouterView name="SmartSearchBar"/>-->
      </div>

      <div class="flex flex-1">
        <main
            class="flex-1 overflow-y-auto"
            data-daisyui-collapse-trigger="top-nav"
        >
          <div
              :class="isFullWidthPage ? 'w-full' : (isCurrentUserProvider ? 'container-sidebar' : 'container-navbar')"
          >
            <RouterView/>
          </div>
        </main>

        <aside
            v-if="hasFirstRightSideBar"
            class="min-w-[200px] max-w-[300px] w-[20%] p-2 border-l border-gray-200 overflow-y-auto"
        >
          <RouterView name="FirstRightSideBar"/>
        </aside>
      </div>

      <div
          v-if="hasFooter"
          :class="{
          'w-full mx-auto px-4': isFullWidthPage,
          'container-sidebar': isCurrentUserProvider && !isFullWidthPage,
          'footer-90':  !isCurrentUserProvider // <-- apply 90% rule only when no sidebar
        }"
      >
        <!-- If isCurrentUserProvider === true → sidebar active → footer stretches full width.-->
        <!--If isCurrentUserProvider === false → no sidebar → wrapper enforces 90% width around footer.-->
        <RouterView name="FooterPage"/>
      </div>

    </div>

    <div v-if="isLoggedIn && isCurrentUserProvider" class="drawer-side">
      <label for="left-sidebar-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <RouterView name="LoggedInLeftSideBarMenu"/>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthFlags } from '@/composables/useAuthFlags.js'

// 🟢 useAuthFlags handles auth state — no store import needed
const {
  isLoggedIn,
  currentUser,
  isProvider,
  isSeeker
} = useAuthFlags()

const route = useRoute()

const isCurrentUserProvider = computed(() => {
  return isApprovedProvider.value && providerOnboardingComplete.value
})

// This computed property remains the same, it correctly identifies if the user is a provider
const providerOnboardingComplete = computed(() => {
  const onboarding = currentUser.value?.onboarding_status || {}
  return (
    onboarding.basic_complete &&
    onboarding.provider_onboarding_complete &&
    onboarding.billing_setup_complete
  )
})

const isApprovedProvider = computed(() => {
  return (
    currentUser.value?.roles?.includes('provider') &&
    currentUser.value?.provider_status === 'approved'
  )
})

const hasHomePageBanner = computed(() => {
  return route.matched.some(record => record.components?.HomePageBanner)
})
const hasMainNavBar = computed(() => {
  return route.matched.some(record => record.components?.MainNavBar)
})
const hasTopNavBar = computed(() => {
  return route.matched.some(record => record.components?.TopNavBar)
})
const hasSmartSearch = computed(() => {
  return route.matched.some(record => record.components?.SmartSearch)
})
const hasSiteMap = computed(() => {
  return route.matched.some(record => record.components?.SiteMap)
})

// Check if the LoggedInLeftSideBarMenu or PopularCategories components exist
const hasLoggedInLeftSideBarMenu = computed(() => {
  return route.matched.some(record => record.components?.LoggedInLeftSideBarMenu)
})

const hasSimpleFilters = computed(() => {
  return route.matched.some(record => record.components?.SimpleFilters)
})

const hasFirstRightSideBar = computed(() => {
  return route.matched.some(record => record.components?.FirstRightSideBar)
})

const hasFooter = computed(() => {
  return route.matched.some(record => record.components?.FooterPage)
})

// New computed property to check for a full-width layout
const isFullWidthPage = computed(() => route.meta.fullWidth)
</script>
