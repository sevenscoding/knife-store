<script setup lang="ts">
import { useCartStore } from '@shared/stores/cart'
import type { CartItem } from '@shared/types'

type Props = {
  item: CartItem & {
    priceChanged?: {
      from: number
      to: number
    }
  }
  currency: string
}

defineProps<Props>()
const cartStore = useCartStore()
</script>

<template>
  <li
    class="grid grid-cols-[1fr_auto_auto_auto] items-center gap-6 rounded-xl border p-4 transition"
    :class="item.priceChanged ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white'"
  >
    <div>
      <h3 class="font-medium text-slate-900">{{ item.name }}</h3>

      <p class="text-sm text-slate-500">{{ item.price.toFixed(2) }} {{ currency }} / item</p>

      <p v-if="item.priceChanged" class="mt-1 text-xs font-medium text-amber-700">
        Price changed from ${{ item.priceChanged.from.toFixed(2) }} to ${{
          item.priceChanged.to.toFixed(2)
        }}
      </p>
    </div>

    <div class="flex items-center gap-2">
      <button class="h-8 w-8 rounded border" @click="cartStore.updateQty(item.id, item.qty - 1)">
        −
      </button>

      <span class="font-semibold">{{ item.qty }}</span>

      <button class="h-8 w-8 rounded border" @click="cartStore.updateQty(item.id, item.qty + 1)">
        +
      </button>
    </div>

    <div class="font-semibold">{{ (item.price * item.qty).toFixed(2) }} {{ currency }}</div>

    <div class="flex flex-col items-end gap-2">
      <button
        v-if="item.priceChanged"
        class="rounded-md bg-amber-600 px-3 py-1 text-xs font-medium text-white"
        @click="cartStore.confirmPrice(item.id)"
      >
        Apply
      </button>

      <button class="text-sm text-slate-400 hover:text-rose-600" @click="cartStore.remove(item.id)">
        Remove
      </button>
    </div>
  </li>
</template>
