<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@shared/stores/cart'
import CartItemRow from '@modules/cart/components/CartItemRow.vue'
import { useCartSync } from '@shared/composables/useCartSync'

const cartStore = useCartStore()

useCartSync()

onMounted(() => {
  cartStore.fetchCart()
})
</script>

<template>
  <section class="mx-auto max-w-3xl space-y-6">
    <h1 class="text-2xl font-bold text-slate-900">Cart</h1>

    <ul v-if="cartStore.items.length" class="space-y-3" role="list" aria-live="polite">
      <CartItemRow
        v-for="item in cartStore.items"
        :key="item.id"
        :item="item"
        :currency="cartStore.cart.currency"
      />
    </ul>

    <div
      v-else
      class="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500"
      role="status"
    >
      Cart is empty
    </div>

    <div
      class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
      aria-live="polite"
    >
      <span class="text-slate-600"> Subtotal </span>

      <span class="text-xl font-semibold text-slate-900">
        {{ cartStore.subtotal }} {{ cartStore.cart.currency }}
      </span>
    </div>
  </section>
</template>