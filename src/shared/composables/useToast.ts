import { ref } from 'vue'

type Toast = {
  message: string
  type: 'error' | 'success'
}

const messages = ref<Toast[]>([])

export function useToast() {
  const push = (message: string, type: Toast['type']) => {
    messages.value.push({ message, type })

    setTimeout(() => {
      messages.value.shift()
    }, 3000)
  }

  const error = (msg: string) => push(msg, 'error')
  const success = (msg: string) => push(msg, 'success')

  return {
    messages,
    error,
    success
  }
}
