import { defineStore } from 'pinia'
import { ref, computed, toRaw } from 'vue'
import { CartAPI } from '@shared/api/cart'
import type { CartResponse, CartItem } from '@shared/types'
import { useToast } from '@shared/composables/useToast'

type CartItemView = CartItem & {
  confirmedPrice?: number
  priceChanged?: {
    from: number
    to: number
  }
}

export const useCartStore = defineStore('cart', () => {
  const toast = useToast()

  const cart = ref<CartResponse>({
    items: [],
    subtotal: 0,
    currency: 'USD',
    updatedAt: ''
  })

  const loading = ref(false)

  const cloneCart = (): CartResponse => JSON.parse(JSON.stringify(toRaw(cart.value)))

  const applyCart = (next: CartResponse) => {
    const prev = new Map<string, CartItemView>()
    cart.value.items.forEach(i => prev.set(i.id, i))

    cart.value = {
      ...next,
      items: next.items.map(i => {
        const old = prev.get(i.id)

        if (old && old.price !== i.price) {
          return {
            ...i,
            priceChanged: { from: old.price, to: i.price }
          }
        }

        return {
          ...i,
          priceChanged: old?.priceChanged
        }
      })
    }
  }

  const mergeCartFromWs = (wsCart: CartResponse) => {
    const wsMap = new Map(wsCart.items.map(i => [i.id, i]))

    cart.value.items = cart.value.items.map(item => {
      const wsItem = wsMap.get(item.id)
      if (!wsItem) return item

      if (item.price !== wsItem.price) {
        return {
          ...item,
          price: wsItem.price,
          inStock: wsItem.inStock,
          priceChanged: {
            from: item.price,
            to: wsItem.price
          }
        }
      }

      return {
        ...item,
        inStock: wsItem.inStock
      }
    })

    cart.value.subtotal = wsCart.subtotal
    cart.value.updatedAt = wsCart.updatedAt
  }

  const fetchCart = async () => {
    loading.value = true
    try {
      applyCart(await CartAPI.getCart())
    } finally {
      loading.value = false
    }
  }

  const add = async (id: string) => {
    loading.value = true
    try {
      applyCart(await CartAPI.add({ productId: id, qty: 1 }))
      toast.success(`Item ${id} added successfully`)
    } finally {
      loading.value = false
    }
  }

  const updateQty = async (id: string, qty: number) => {
    const snapshot = cloneCart()
    const item = cart.value.items.find(i => i.id === id)
    if (!item) return

    item.qty = qty

    try {
      applyCart(await CartAPI.update({ productId: id, qty }))
    } catch {
      cart.value = snapshot
    }
  }

  const remove = async (id: string) => {
    const snapshot = cloneCart()
    cart.value.items = cart.value.items.filter(i => i.id !== id)

    try {
      applyCart(await CartAPI.remove({ productId: id }))
      toast.info(`Item ${id} removed`)
    } catch {
      cart.value = snapshot
    }
  }

  const confirmPrice = (id: string) => {
    const item = cart.value.items.find(i => i.id === id)
    if (!item?.priceChanged) return

    delete item.priceChanged
  }

  const items = computed(() => cart.value.items as CartItemView[])
  const count = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const subtotal = computed(() => cart.value.subtotal)

  return {
    cart,
    items,
    count,
    subtotal,
    loading,
    fetchCart,
    add,
    updateQty,
    remove,
    confirmPrice,
    applyCart,
    mergeCartFromWs
  }
})