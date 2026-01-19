import { PRODUCTS } from '../../../../db/products'
import { round2 } from '../utils/round'

export function sendProductUpdate(client: { send(data: string): void }, productId: string) {
  const product = PRODUCTS.find(p => p.id === productId)
  if (!product) return

  const changes = {
    price: round2(product.price * (0.9 + Math.random() * 0.2)),
    inStock: Math.random() > 0.5,
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
