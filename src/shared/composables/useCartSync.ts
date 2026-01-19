import { onMounted, onUnmounted } from 'vue'
import { wsManager } from '@app/ws/wsManager'
import { useCartStore } from '@shared/stores/cart'
import type { WsEvent } from '@app/ws/types'
import type { CartResponse } from '@shared/types'

type CartItemWs = {
  id: string
  name: string
  price: number
  qty: number
  inStock: boolean
}

type CartWsPayload = {
  items: CartItemWs[]
  subtotal: number
  currency: string
  updatedAt: string
}

const adaptCartFromWs = (cart: CartWsPayload): CartResponse => ({
  items: cart.items.map(i => ({
    id: i.id,
    name: i.name,
    price: i.price,
    qty: i.qty,
    inStock: i.inStock
  })),
  subtotal: cart.subtotal,
  currency: cart.currency,
  updatedAt: cart.updatedAt
})

export const useCartSync = () => {
  const cartStore = useCartStore()

  const handler = (e: WsEvent) => {
    if (e.type !== 'cart.synced') return
    cartStore.mergeCartFromWs(adaptCartFromWs(e.data.cart))
  }

  onMounted(() => {
    wsManager.subscribeToCart(handler)
  })

  onUnmounted(() => {
    wsManager.unsubscribeFromCart(handler)
  })
}
