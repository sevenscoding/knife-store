import { http, HttpResponse, delay } from 'msw'
import { PRODUCTS } from '../../../../db/products'

export const productHandlers = [
  http.get('/api/products/:id', async ({ params }) => {
    const { id } = params as { id: string }

    const product = PRODUCTS.find(p => p.id === id)

    await delay(800)

    if (!product) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(product)
  })
]

