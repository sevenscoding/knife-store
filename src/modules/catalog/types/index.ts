import { PaginatedResponse } from '@shared/types'
import { CatalogItem } from '@shared/types'

export type CatalogQuery = {
  q?: string
  tag?: string
  min?: number
  max?: number
  inStock?: boolean
  rarity?: string
  sort?: 'price_asc' | 'price_desc'
  page?: number
  limit?: number
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
