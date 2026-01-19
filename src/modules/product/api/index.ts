import { api } from '@shared/api/client'
import type { CatalogItem } from '@shared/types'

export class ProductAPI {
  static getById(id: string): Promise<CatalogItem> {
    return api.get<CatalogItem>(`/products/${id}`)
  }
}
