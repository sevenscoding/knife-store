import type { CartResponse } from '@shared/types'

export type CheckoutRequest = {
  customer: {
    name: string
    comment?: string
  }
  cart: CartResponse
}

export type CheckoutResponse = {
  orderId: string
}
