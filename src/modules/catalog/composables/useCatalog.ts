import { ref, computed, watch } from 'vue'
import { CatalogAPI } from '@modules/catalog/api'
import { useToast } from '@shared/composables/useToast'
import { useRouteQuery } from '@shared/composables/useRouteQuery'
import type { CatalogItem, CatalogQueryParams } from '@modules/catalog/types'

export const useCatalog = () => {
  const toast = useToast()
  const { query: routeQuery, setQuery } = useRouteQuery<CatalogQueryParams>()

  const items = ref<CatalogItem[]>([])
  const total = ref(0)
  const isLoading = ref(false)

  const query = computed(() => ({
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
    page: Number(routeQuery.value.page ?? 1),
    limit: Number(routeQuery.value.limit ?? 20)
  }))

  const fetchCatalog = async () => {
    try {
      isLoading.value = true
      const res = await CatalogAPI.getCatalog(query.value)
      items.value = res.items
      total.value = res.total
    } catch {
      toast.error('Failed to load catalog')
    } finally {
      isLoading.value = false
    }
  }

  const serializeQuery = (q: Record<string, unknown>) =>
    Object.fromEntries(
      Object.entries(q).map(([k, v]) => [k, v === undefined ? undefined : String(v)])
    )

  const onUpdate = (next: Partial<CatalogQueryParams>) => {
    setQuery(next)
  }

  watch(query, fetchCatalog, { immediate: true })

  return {
    items,
    total,
    isLoading,
    query,
    setQuery,
    onUpdate
  }
}