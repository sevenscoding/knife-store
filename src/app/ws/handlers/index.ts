import { ws } from 'msw'
import { PRODUCTS } from '../../../../db/products'
import type { CartItem } from '@shared/types'

const productWs = ws.link('ws://localhost:3001')
const PRODUCT_INDEX = import.meta.env.VITE_WS_PRODUCT_INDEX

const round2 = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100

export const handlersWs = [
  productWs.addEventListener('connection', ({ client }) => {
    let catalogInterval: number | null = null
    let productInterval: number | null = null
    let cartInterval: number | null = null
    let subscribedProductId: string | null = null

    const sendCartSync = () => {
      const raw = localStorage.getItem('mock_cart')
      const stored = raw ? JSON.parse(raw) : []
      if (!stored.length) return

      const items: CartItem[] = stored.map((i: any) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
        inStock: i.inStock
      }))

      const idx = Math.floor(Math.random() * items.length)
      const item = items[idx]

      if (Math.random() > 0.6) {
        item.price = round2(item.price * (0.9 + Math.random() * 0.2))
      }

      if (Math.random() > 0.6) {
        item.inStock = !item.inStock
      }

      localStorage.setItem('mock_cart', JSON.stringify(items))

      const subtotal = round2(items.reduce((s: number, i: CartItem) => s + i.price * i.qty, 0))

      client.send(
        JSON.stringify({
          type: 'cart.synced',
          data: {
            cart: {
              items,
              subtotal,
              currency: 'USD',
              updatedAt: new Date().toISOString()
            }
          }
        })
      )
    }

    const sendProductUpdate = (productId: string) => {
      const product = PRODUCTS.find(p => p.id === productId)
      if (!product) return

      const changes = {
        price: round2(product.price * (0.9 + Math.random() * 0.2)),
        inStock: Math.random() > 0.3,
        updatedAt: new Date().toISOString()
      }

      Object.assign(product, changes)

      client.send(
        JSON.stringify({
          type: 'product.updated',
          data: { id: product.id, changes }
        })
      )
    }

    cartInterval = window.setInterval(sendCartSync, 10000)

    client.addEventListener('message', e => {
      if (typeof e.data !== 'string') return
      const msg = JSON.parse(e.data)

      if (msg.type === 'subscribe.product') {
        subscribedProductId = msg.data.productId
        if (productInterval) clearInterval(productInterval)

        productInterval = window.setInterval(() => {
          sendProductUpdate(subscribedProductId!)
        }, 3000)
      }

      if (msg.type === 'unsubscribe.product') {
        if (productInterval) clearInterval(productInterval)
        productInterval = null
        subscribedProductId = null
      }

      if (msg.type === 'subscribe.catalog') {
        if (catalogInterval) return

        catalogInterval = window.setInterval(() => {
          const product = PRODUCT_INDEX
            ? PRODUCTS[Number(PRODUCT_INDEX)]
            : PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]

          if (product) sendProductUpdate(product.id)
        }, 5000)
      }

      if (msg.type === 'unsubscribe.catalog') {
        if (catalogInterval) clearInterval(catalogInterval)
        catalogInterval = null
      }
    })

    client.addEventListener('close', () => {
      if (catalogInterval) clearInterval(catalogInterval)
      if (productInterval) clearInterval(productInterval)
      if (cartInterval) clearInterval(cartInterval)
    })
  })
]