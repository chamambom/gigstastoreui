import { ref } from 'vue'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email as emailRule } from '@vuelidate/validators'

export function useNewsletter() {
  const email = ref('')
  const isLoading = ref(false)

  // Toast state
  const toast = ref({
    show: false,
    message: '',
    type: 'success',
  })

  const rules = {
    email: { required, email: emailRule }
  }

  // Bind rules to state
  const v$ = useVuelidate(rules, { email })

  const showToast = (message, type = 'success') => {
    toast.value.message = message
    toast.value.type = type
    toast.value.show = true
    setTimeout(() => { toast.value.show = false }, 4000)
  }

  const subscribe = async () => {
    await v$.value.$validate()

    if (v$.value.$error) {
      showToast('Please enter a valid email address.', 'error')
      return
    }

    isLoading.value = true
    try {
      const res = await axios.post('/api/v1/newsletter/subscribe', { email: email.value })
      showToast(res.data.message, 'success')
      email.value = ''
      v$.value.$reset() // reset validation
    } catch (err) {
      showToast(err.response?.data?.detail || 'Subscription failed.', 'error')
    } finally {
      isLoading.value = false
    }
  }

  return { email, isLoading, subscribe, toast, v$ }
}
