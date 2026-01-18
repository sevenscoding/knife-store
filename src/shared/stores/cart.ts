import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { CART_STORAGE_KEY } from '@shared/constants'
import { useToast } from '@shared/composables/useToast'
import { CartItem } from '@shared/types'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])

  const stored = localStorage.getItem(CART_STORAGE_KEY)
  if (stored) {
    try {
      cart.value = JSON.parse(stored)
    } catch {
      cart.value = []
    }
  }

  watch(
    cart,
    value => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true }
  )

  const add = (productId: number, productName: string) => {
    const item = cart.value.find(i => i.id === productId)

    if (item) item.qty++
    else cart.value.push({ id: productId, qty: 1 })

    useToast().success(`${productName} added to cart`)
  }

  const decrease = (productId: number) => {
    const item = cart.value.find(i => i.id === productId)
    if (!item) return
    if (item.qty > 1) item.qty--
    else remove(productId)
  }

  const remove = (productId: number) => {
    cart.value = cart.value.filter(i => i.id !== productId)
  }

  const clear = () => (cart.value = [])

  const count = computed(() => cart.value.reduce((sum, i) => sum + i.qty, 0))
  const ids = computed(() => cart.value.map(i => i.id))

  return { cart, add, decrease, remove, clear, count, ids }
})
