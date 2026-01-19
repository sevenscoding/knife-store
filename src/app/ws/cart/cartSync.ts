import type { CartItem } from '@shared/types'
import { round2 } from '../utils/round'

export function sendCartSync(client: { send(data: string): void }) {
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

  const subtotal = round2(items.reduce((s, i) => s + i.price * i.qty, 0))

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
