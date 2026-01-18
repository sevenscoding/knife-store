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
