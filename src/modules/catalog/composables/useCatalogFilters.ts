import { ref, computed, watch } from 'vue'
import { useDebounce } from '@shared/composables/useDebounce'

type Sort = 'price_asc' | 'price_desc'

type Params = {
  q?: string
  sort?: Sort
  tag?: string
}

export const useCatalogFilters = (props: Params, emit: (payload: Params) => void) => {
  const search = ref(props.q ?? '')
  const debouncedSearch = useDebounce(search, 700)

  watch(debouncedSearch, v => {
    emit({
      q: v || undefined,
      tag: props.tag,
      sort: props.sort
    })
  })

  watch(
    () => props.q,
    v => {
      if (v !== search.value) search.value = v ?? ''
    }
  )

  const isPriceAsc = computed(() => props.sort === 'price_asc')
  const isPriceDesc = computed(() => props.sort === 'price_desc')

  const setSort = (next: Sort) => {
    emit({
      sort: props.sort === next ? undefined : next
    })
  }

  const setTag = (tag?: string) => {
    emit({ tag })
  }

  return {
    search,
    isPriceAsc,
    isPriceDesc,
    setSort,
    setTag
  }
}
