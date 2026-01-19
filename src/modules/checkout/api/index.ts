import { api } from '@shared/api/client'
import { CheckoutResponse, CheckoutRequest } from '@modules/checkout/types'

export class CheckoutAPI {
  static checkout(body: CheckoutRequest): Promise<CheckoutResponse> {
    return api.post<CheckoutResponse>('/checkout', body)
  }
}
