import { ref, computed, watch } from 'vue'
import { CatalogAPI } from '@modules/catalog/api'
import { useToast } from '@shared/composables/useToast'
import { useRouteQuery } from '@shared/composables/useRouteQuery'
import type { CatalogQuery, CatalogQueryParams } from '@/modules/catalog/types'
import { CatalogItem} from '@shared/types'
import { WsEvent } from '@app/ws/types'

export const useCatalog = () => {
  const toast = useToast()
  const { query: routeQuery, setQuery } = useRouteQuery<CatalogQueryParams>()

  const items = ref<CatalogItem[]>([])
  const total = ref(0)
  const isLoading = ref(false)

  const apiQuery = computed<CatalogQuery>(() => ({
    q: routeQuery.value.q,
    tag: routeQuery.value.tag,
    min: routeQuery.value.min ? Number(routeQuery.value.min) : undefined,
    max: routeQuery.value.max ? Number(routeQuery.value.max) : undefined,
    inStock:
      routeQuery.value.inStock === 'true'
        ? true
        : routeQuery.value.inStock === 'false'
          ? false
          : undefined,
    rarity: routeQuery.value.rarity,
    sort: routeQuery.value.sort,
    page: routeQuery.value.page ? Number(routeQuery.value.page) : 1,
    limit: routeQuery.value.limit ? Number(routeQuery.value.limit) : 20
  }))

  const fetchCatalog = async () => {
    try {
      isLoading.value = true
      const res = await CatalogAPI.getCatalog(apiQuery.value)
      items.value = res.items
      total.value = res.total
    } catch {
      toast.error('Failed to load catalog')
    } finally {
      isLoading.value = false
    }
  }

  const onUpdate = (next: Partial<CatalogQueryParams>) => {
    setQuery(next)
  }

  const wsHandler = (event: WsEvent) => {
    if (event.type !== 'product.updated') return

    const item = items.value.find(i => i.id === event.data.id)
    if (!item) return

    Object.assign(item, event.data.changes)
  }

  watch(apiQuery, fetchCatalog, { immediate: true })

  return {
    items,
    total,
    isLoading,
    query: apiQuery,
    onUpdate,
    setQuery,
    wsHandler
  }
}