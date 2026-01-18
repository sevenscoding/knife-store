import { ref, watch, type Ref } from 'vue'

export const useDebounce = <T>(value: Ref<T>, delay = 300) => {
  const debounced = ref(value.value) as Ref<T>
  let timer: number | undefined

  watch(value, v => {
    if (timer) clearTimeout(timer)

    timer = window.setTimeout(() => {
      debounced.value = v
    }, delay)
  })

  return debounced
}