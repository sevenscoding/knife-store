import { http, HttpResponse, delay } from 'msw'
import { PRODUCTS } from '../../../../db/products'

const STORAGE_KEY = 'mock_cart'

export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  inStock: boolean
}

export type CartResponse = {
  items: CartItem[]
  subtotal: number
  currency: string
  updatedAt: string
}

type CartItemPayload = {
  productId: string
}

type CartQtyPayload = CartItemPayload & {
  qty: number
}

const round2 = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100

const loadItems = (): CartItem[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

const saveItems = (items: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const recalc = (): CartResponse => {
  const items = loadItems()

  const subtotal = round2(items.reduce((s, i) => s + i.price * i.qty, 0))

  return {
    items,
    subtotal,
    currency: 'USD',
    updatedAt: new Date().toISOString()
  }
}

export const cartHandlers = [
  http.get('/api/cart', () => {
    return HttpResponse.json(recalc())
  }),

  http.post('/api/cart/add', async ({ request }) => {
    const { productId, qty } = (await request.json()) as CartQtyPayload

    if (!qty || qty <= 0) {
      return HttpResponse.json({ error: 'BAD_QTY' }, { status: 400 })
    }

    const product = PRODUCTS.find(p => p.id === productId)
    if (!product) {
      return HttpResponse.json({ error: 'NOT_FOUND' }, { status: 404 })
    }

    if (!product.inStock) {
      return HttpResponse.json({ error: 'OUT_OF_STOCK' }, { status: 409 })
    }

    const items = loadItems()
    const item = items.find(i => i.id === productId)

    if (item) {
      item.qty += qty
      item.price = product.price
      item.inStock = product.inStock
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty,
        inStock: product.inStock
      })
    }

    saveItems(items)
    return HttpResponse.json(recalc())
  }),

  http.post('/api/cart/update', async ({ request }) => {
    const { productId, qty } = (await request.json()) as CartQtyPayload

    if (qty <= 0) {
      return HttpResponse.json({ error: 'BAD_QTY' }, { status: 400 })
    }

    const product = PRODUCTS.find(p => p.id === productId)
    if (!product) {
      return HttpResponse.json({ error: 'NOT_FOUND' }, { status: 404 })
    }

    const items = loadItems()
    const item = items.find(i => i.id === productId)
    if (!item) {
      return HttpResponse.json(recalc())
    }

    if (item.price !== product.price) {
      item.price = product.price
      item.inStock = product.inStock
      saveItems(items)

      return HttpResponse.json({ error: 'PRICE_CHANGED', newPrice: product.price }, { status: 409 })
    }

    item.qty = qty
    item.inStock = product.inStock

    saveItems(items)
    return HttpResponse.json(recalc())
  }),

  http.post('/api/cart/remove', async ({ request }) => {
    const { productId } = (await request.json()) as CartItemPayload

    const items = loadItems().filter(i => i.id !== productId)
    saveItems(items)

    await delay(1000)

    return HttpResponse.json(recalc())
  })
]
