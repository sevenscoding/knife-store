import { http, HttpResponse, delay } from 'msw'
import type { CheckoutRequest } from '@modules/checkout/types'

const STORAGE_KEY = 'mock_cart'

export const checkoutHandlers = [
  http.post('/api/checkout', async ({ request }) => {
    const body = (await request.json()) as CheckoutRequest

    await delay(1200)

    if (!body.customer?.name || body.customer.name.trim().length < 2) {
      return HttpResponse.json(
        { error: 'INVALID_CUSTOMER', serverCart: body.cart },
        { status: 422 }
      )
    }

    const outdated = Math.random() < 0.3

    if (outdated) {
      return HttpResponse.json(
        {
          error: 'CART_OUTDATED',
          serverCart: body.cart
        },
        { status: 409 }
      )
    }

    localStorage.removeItem(STORAGE_KEY)

    return HttpResponse.json({
      orderId: `ORD-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`
    })
  })
]
