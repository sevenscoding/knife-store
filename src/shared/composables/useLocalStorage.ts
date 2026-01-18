import { ref, watch } from 'vue'

export const useLocalStorage = <T>(key: string, initial: T) => {
  const stored = localStorage.getItem(key)

  const state = ref<T>(stored ? JSON.parse(stored) : initial)

  watch(
    state,
    v => {
      if (v === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(v))
      }
    },
    { deep: true }
  )

  return state
}