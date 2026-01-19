import { ws } from 'msw'
import { PRODUCTS } from '../../../../db/products'
import { sendCartSync } from '@app/ws/cart/cartSync'
import { sendProductUpdate } from '@app/ws/product/productUpdate'

const productWs = ws.link('ws://localhost:3001')
const PRODUCT_INDEX = import.meta.env.VITE_WS_PRODUCT_INDEX

export const handlersWs = [
  productWs.addEventListener('connection', ({ client }) => {
    let catalogInterval: number | null = null
    let productInterval: number | null = null
    let cartInterval: number | null = null
    let subscribedProductId: string | null = null

    cartInterval = window.setInterval(() => {
      sendCartSync(client)
    }, 8000)

    client.addEventListener('message', e => {
      if (typeof e.data !== 'string') return
      const msg = JSON.parse(e.data)

      if (msg.type === 'subscribe.product') {
        subscribedProductId = msg.data.productId
        if (productInterval) clearInterval(productInterval)

        productInterval = window.setInterval(() => {
          sendProductUpdate(client, subscribedProductId!)
        }, 7000)
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

          if (product) {
            sendProductUpdate(client, product.id)
          }
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
