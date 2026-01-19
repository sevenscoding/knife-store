import { authHandlers } from '@modules/auth/handlers/auth'
import { productsHandlers } from '@modules/catalog/handlers'
import { logoutHandlers } from '@shared/mocks'
import { handlersWs } from '@app/ws/handlers'
import { productHandlers } from '@modules/product/handlers'
import { cartHandlers } from '@modules/cart/handlers'
import { checkoutHandlers } from '@modules/checkout/handlers'

export const handlers = [
  ...authHandlers,
  ...productsHandlers,
  ...logoutHandlers,
  ...handlersWs,
  ...productHandlers,
  ...cartHandlers,
  ...checkoutHandlers
]
