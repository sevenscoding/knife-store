export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  inStock: boolean
  priceChanged?: {
    from: number
    to: number
  }
}

export type LoginPayload = {
  id: string
  token: string
  avatar: string
  nickname: string
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  limit: number
}

export type CatalogItem = {
  id: string
  name: string
  price: number
  rarity: string
  inStock: boolean
  tags: string[]
  image: string
  updatedAt: string
}

export interface CartResponse {
  items: CartItem[]
  subtotal: number
  currency: string
  updatedAt: string
}

export type Cart = {
  items: CartItem[]
  subtotal: number
  currency: string
  updatedAt: string
}
