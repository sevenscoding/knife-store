import { PaginatedResponse} from '@shared/types'

export type CatalogQuery = {
  q?: string
  min?: number
  max?: number
  inStock?: boolean
  rarity?: string
  sort?: 'price_asc' | 'price_desc'
  page?: number
  limit?: number
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

export type CatalogQueryParams = {
  q?: string
  tag?: string
  min?: string
  max?: string
  inStock?: string
  rarity?: string
  sort?: 'price_asc' | 'price_desc'
  page?: string
  limit?: string
}

export type CatalogResponse = PaginatedResponse<CatalogItem>
