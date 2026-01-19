export type ProductUpdatedEvent = {
  type: 'product.updated'
  data: {
    id: string
    changes: {
      price?: number
      inStock?: boolean
      updatedAt: string
    }
  }
}

export type CartSyncedEvent = {
  type: 'cart.synced'
  data: {
    cart: {
      items: {
        id: string
        name: string
        price: number
        qty: number
        image: string
        inStock: boolean
      }[]
      subtotal: number
      currency: string
      updatedAt: string
    }
  }
}

export type WsEvent = ProductUpdatedEvent | CartSyncedEvent
