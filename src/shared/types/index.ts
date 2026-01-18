export type ListResponse<T> = {
  items: T[]
}

export type CartItem = {
  id: number
  qty: number
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
