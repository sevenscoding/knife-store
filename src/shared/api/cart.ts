import { api } from '@shared/api/client'
import type { CartResponse } from '../types'

export class CartAPI {
  static getCart() {
    return api.get<CartResponse>('/cart')
  }

  static add(payload: { productId: string; qty: number }) {
    return api.post<CartResponse>('/cart/add', payload)
  }

  static update(payload: { productId: string; qty: number }) {
    return api.post<CartResponse>('/cart/update', payload)
  }

  static remove(payload: { productId: string }) {
    return api.post<CartResponse>('/cart/remove', payload)
  }
}
