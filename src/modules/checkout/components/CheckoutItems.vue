<script setup lang="ts">
import { useCartStore } from '@shared/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div
    v-if="cartStore.hasNoValidItems"
    role="status"
    aria-live="polite"
    class="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800"
  >
    Some items are unavailable or require confirmation before checkout.
  </div>

  <div v-else class="rounded-xl border border-slate-200 bg-white">
    <ul role="list" class="divide-y">
      <li
        v-for="item in cartStore.validItems"
        :key="item.id"
        class="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="font-medium text-slate-900">
            {{ item.name }}
          </p>

          <p class="text-sm text-slate-500">
            {{ item.price.toFixed(2) }}
            {{ cartStore.cart.currency }}
            × {{ item.qty }}
          </p>
        </div>

        <div class="font-semibold text-slate-900 sm:text-right">
          {{ (item.price * item.qty).toFixed(2) }}
          {{ cartStore.cart.currency }}
        </div>
      </li>
    </ul>
  </div>
</template>
