// src/composables/oauthRedirectHandler.ts
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

interface StoredRedirectQuery {
  redirectName?: string
  serviceId?: string
  providerId?: string
}

export const handleOAuthRedirect = async (
  provider: string,
  route: any, // optional, can be typed if needed
  code: string,
  state: string
) => {
  const authStore = useAuthStore()
  const router = useRouter()

  let storedRedirectQuery: StoredRedirectQuery | null = null

  try {
    const response = await axios.get(`/auth/${provider}/callback`, {
      params: { code, state },
    })

    const token: string | undefined = response.data.access_token

    if (token) {
      localStorage.setItem('token', token)

      // Fetch user details via Pinia
      await authStore.viewUser()

      const user = authStore.user
      if (user && !user.is_verified) {
        console.log('User is not verified. Dispatching email verification request...')
        await authStore.requestVerifyToken(user.email)
      }

      // Check for stored redirect
      const storedRedirect = localStorage.getItem(`post${provider}OAuthRedirect`)
      if (storedRedirect) {
        storedRedirectQuery = JSON.parse(storedRedirect) as StoredRedirectQuery
        localStorage.removeItem(`post${provider}OAuthRedirect`)
      }

      // Determine final route
      let finalRoute
      if (storedRedirectQuery && storedRedirectQuery.redirectName) {
        console.log(`OAuth successful. Redirecting to specific query route: ${storedRedirectQuery.redirectName}`)
        finalRoute = {
          name: storedRedirectQuery.redirectName,
          query: {
            serviceId: storedRedirectQuery.serviceId,
            providerId: storedRedirectQuery.providerId,
          },
        }
      } else {
        console.log('OAuth successful. No specific redirect. Redirecting to onboarding choice.')
        finalRoute = { name: 'onboarding-choice' }
      }

      await router.replace(finalRoute)
    } else {
      console.error('Token not received from backend')
      router.replace('/login')
    }
  } catch (error: any) {
    console.error('OAuth callback failed:', error)
    router.replace('/login')
  }
}
