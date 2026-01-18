import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ProductAPI } from '@modules/product/api'
import { useToast } from '@shared/composables/useToast'
import type { CatalogItem } from '@shared/types'
import type { WsEvent } from '@app/ws/types'
import { wsManager } from '@app/ws/wsManager'

export const useProduct = () => {
  const route = useRoute()
  const toast = useToast()
  const productId = route.params.id as string

  const item = ref<CatalogItem | null>(null)
  const isLoading = ref(false)

  const fetchProduct = async () => {
    try {
      isLoading.value = true
      item.value = await ProductAPI.getById(route.params.id as string)
    } catch {
      toast.error('Failed to load product')
    } finally {
      isLoading.value = false
    }
  }

  const wsHandler = (event: WsEvent) => {
    if (event.type !== 'product.updated') return
    if (!item.value) return
    if (event.data.id !== item.value.id) return

    Object.assign(item.value, event.data.changes)
  }

  onMounted(async () => {
    await fetchProduct()
    wsManager.subscribeToProduct(productId, wsHandler)
  })

  onUnmounted(() => {
    wsManager.unsubscribeFromProduct(productId, wsHandler)
  })

  return {
    item,
    isLoading
  }
}