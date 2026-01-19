import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@shared/stores/cart'
import { CheckoutAPI } from '@modules/checkout/api'

export function useCheckoutPayment(opts: {
  customer: {
    name: { value: string }
    comment: { value: string }
  }
}) {
  const cartStore = useCartStore()
  const router = useRouter()

  const isProcessing = ref(false)
  const isSuccess = ref(false)
  const orderId = ref<string | null>(null)
  const error = ref<'INVALID_CUSTOMER' | 'CART_OUTDATED' | null>(null)
  const redirectIn = ref<number | null>(null)

  const nameServerInvalid = computed(() => error.value === 'INVALID_CUSTOMER')

  const pay = async () => {
    if (cartStore.hasNoValidItems || isProcessing.value) return

    isProcessing.value = true
    error.value = null

    try {
      const res = await CheckoutAPI.checkout({
        customer: {
          name: opts.customer.name.value,
          comment: opts.customer.comment.value
        },
        cart: cartStore.cart
      })

      orderId.value = res.orderId
      isSuccess.value = true
      cartStore.clear()

      redirectIn.value = 5

      const interval = setInterval(() => {
        if (redirectIn.value === null) return

        redirectIn.value--

        if (redirectIn.value <= 0) {
          clearInterval(interval)
          router.push('/')
        }
      }, 1000)
    } catch (e: any) {
      console.dir(e.error)

      if (e?.error === 'INVALID_CUSTOMER') {
        console.dir('INVALID_CUSTOMER')
        error.value = 'INVALID_CUSTOMER'
      }

      if (e?.error === 'CART_OUTDATED') {
        cartStore.applyCart(e.serverCart)
        error.value = 'CART_OUTDATED'
      }
    } finally {
      isProcessing.value = false
    }
  }

  return {
    pay,
    isProcessing,
    isSuccess,
    orderId,
    error,
    redirectIn,
    nameServerInvalid
  }
}
