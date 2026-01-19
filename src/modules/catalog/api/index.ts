import { api } from '@shared/api/client'
import { CatalogQuery, CatalogResponse } from '@modules/catalog/types'

export class CatalogAPI {
  static getCatalog(params?: CatalogQuery): Promise<CatalogResponse> {
    return api.get<CatalogResponse>('/catalog', params)
  }
}
