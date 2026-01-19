import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useCheckoutConfirm() {
  const router = useRouter()
  const isOpen = ref(false)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const accept = () => {
    isOpen.value = false
    router.push('/checkout')
  }

  return {
    isOpen,
    open,
    close,
    accept
  }
}
