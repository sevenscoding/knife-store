import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useRouteQuery = <T extends Record<string, unknown>>() => {
  const route = useRoute()
  const router = useRouter()

  const query = computed<T>(() => route.query as unknown as T)

  const setQuery = (next: Partial<T>, resetPage = true) => {
    const merged = {
      ...route.query,
      ...next,
      ...(resetPage ? { page: '1' } : {})
    }

    const serialized = Object.fromEntries(
      Object.entries(merged)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => [k, String(v)])
    )

    router.push({ query: serialized })
  }

  return {
    query,
    setQuery
  }
}
