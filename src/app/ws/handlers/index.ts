import { ws } from 'msw'
import { PRODUCTS } from '../../../../db/products'

const productWs = ws.link('ws://localhost:3001')
const PRODUCT_INDEX = import.meta.env.VITE_WS_PRODUCT_INDEX

export const handlersWs = [
  productWs.addEventListener('connection', ({ client }) => {
    let catalogInterval: number | null = null
    let productInterval: number | null = null
    let subscribedProductId: string | null = null

    const sendProductUpdate = (productId: string) => {
      const product = PRODUCTS.find(p => p.id === productId)
      if (!product) return

      const changes = {
        price: +(product.price * (0.9 + Math.random() * 0.2)).toFixed(2),
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

    client.addEventListener('message', e => {
      if (typeof e.data !== 'string') return
      const msg = JSON.parse(e.data)

      // ---------- PRODUCT ----------
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

      // ---------- CATALOG ----------
      if (msg.type === 'subscribe.catalog') {
        if (catalogInterval) return

        catalogInterval = window.setInterval(() => {
          const product =
            PRODUCT_INDEX !== undefined && PRODUCT_INDEX !== ''
              ? PRODUCTS[Number(PRODUCT_INDEX)]
              : PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]

          if (!product) return
          sendProductUpdate(product.id)
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
    })
  })
]