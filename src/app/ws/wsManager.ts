import type { WsEvent } from '@app/ws/types'

type Handler = (e: WsEvent) => void

let socket: WebSocket | null = null
let pendingMessages: unknown[] = []

const productSubs = new Map<string, Set<Handler>>()
const catalogSubs = new Set<Handler>()
const cartSubs = new Set<Handler>()

function ensureSocket() {
  if (socket) return

  socket = new WebSocket('ws://localhost:3001')

  socket.onopen = () => {
    pendingMessages.forEach(m => socket!.send(JSON.stringify(m)))
    pendingMessages = []
  }

  socket.onmessage = e => {
    const msg: WsEvent =
      typeof e.data === 'string' ? JSON.parse(e.data) : JSON.parse(new TextDecoder().decode(e.data))

    if (msg.type === 'product.updated') {

      productSubs.get(msg.data.id)?.forEach(h => h(msg))

      if (productSubs.size === 0) {
        catalogSubs.forEach(h => h(msg))
      }
    }

    if (msg.type === 'cart.synced') {
      cartSubs.forEach(h => h(msg))
    }
  }

  socket.onclose = () => {
    socket = null
  }
}

function send(msg: unknown) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    pendingMessages.push(msg)
    return
  }
  socket.send(JSON.stringify(msg))
}

function cleanup() {
  if (productSubs.size === 0 && catalogSubs.size === 0 && cartSubs.size === 0) {
    socket?.close()
    socket = null
  }
}

export const wsManager = {
  subscribeToProduct(id: string, handler: Handler) {
    ensureSocket()

    if (!productSubs.has(id)) {
      productSubs.set(id, new Set())
      send({ type: 'subscribe.product', data: { productId: id } })
    }

    productSubs.get(id)!.add(handler)
  },

  unsubscribeFromProduct(id: string, handler: Handler) {
    const set = productSubs.get(id)
    if (!set) return

    set.delete(handler)

    if (set.size === 0) {
      productSubs.delete(id)
      send({ type: 'unsubscribe.product', data: { productId: id } })
    }

    cleanup()
  },

  subscribeToCatalog(handler: Handler) {
    ensureSocket()

    if (catalogSubs.size === 0) {
      send({ type: 'subscribe.catalog' })
    }

    catalogSubs.add(handler)
  },

  unsubscribeFromCatalog(handler: Handler) {
    catalogSubs.delete(handler)

    if (catalogSubs.size === 0) {
      send({ type: 'unsubscribe.catalog' })
    }

    cleanup()
  },
}