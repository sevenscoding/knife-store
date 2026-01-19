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
    :class="[
      !item.inStock
        ? 'border-slate-300 bg-slate-100 opacity-70'
        : item.priceChanged
          ? 'border-amber-400 bg-amber-50'
          : 'border-slate-200 bg-white'
    ]"
  >
    <div>
      <h3 class="font-medium text-slate-900">{{ item.name }}</h3>

      <p class="text-sm text-slate-500">{{ item.price.toFixed(2) }} {{ currency }} / item</p>

      <p v-if="!item.inStock" class="mt-1 text-xs font-medium text-rose-600">Out of stock</p>

      <p v-else-if="item.priceChanged" class="mt-1 text-xs font-medium text-amber-700">
        Price changed from ${{ item.priceChanged.from.toFixed(2) }} to ${{
          item.priceChanged.to.toFixed(2)
        }}
      </p>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="h-8 w-8 rounded border disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="!item.inStock || item.qty <= 1"
        @click="cartStore.updateQty(item.id, item.qty - 1)"
      >
        −
      </button>

      <span class="font-semibold">{{ item.qty }}</span>

      <button
        class="h-8 w-8 rounded border disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="!item.inStock"
        @click="cartStore.updateQty(item.id, item.qty + 1)"
      >
        +
      </button>
    </div>

    <div class="font-semibold">{{ (item.price * item.qty).toFixed(2) }} {{ currency }}</div>

    <div class="flex flex-col items-end gap-2">
      <button
        v-if="item.priceChanged && item.inStock"
        class="rounded-md bg-amber-600 px-3 py-1 text-xs font-medium text-white"
        @click="cartStore.confirmPrice(item.id)"
      >
        Apply
      </button>

      <button
        class="text-sm hover:text-rose-600 disabled:text-slate-300"
        @click="cartStore.remove(item.id)"
      >
        Remove
      </button>
    </div>
  </li>
</template>
