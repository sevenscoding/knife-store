<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@shared/stores/cart'
import CartItemRow from '@modules/cart/components/CartItemRow.vue'
import { useCartSync } from '@shared/composables/useCartSync'
import { useCheckoutConfirm } from '@modules/cart/composables/useCheckoutConfirm'
import CheckoutConfirmModal from '@modules/cart/components/CheckoutConfirmModal.vue'

const cartStore = useCartStore()
const { isOpen, close, accept } = useCheckoutConfirm()

useCartSync()

onMounted(() => {
  cartStore.fetchCart()
})
</script>

<template>
  <section class="mx-auto max-w-3xl space-y-6" :aria-busy="cartStore.loading">
    <h1 id="cart-title" class="text-2xl font-bold text-slate-900">Cart</h1>

    <ul
      v-if="cartStore.items.length"
      class="space-y-3"
      role="list"
      aria-live="polite"
      aria-labelledby="cart-title"
    >
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
      aria-live="polite"
    >
      Cart is empty
    </div>

    <div
      class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
      role="group"
      aria-label="Cart subtotal"
      aria-live="polite"
    >
      <span class="text-slate-600">Subtotal</span>

      <span class="text-xl font-semibold text-slate-900">
        {{ cartStore.subtotal }} {{ cartStore.cart.currency }}
      </span>
    </div>

    <button
      v-if="cartStore.items.length && !cartStore.hasNoValidItems"
      @click="isOpen = true"
      aria-haspopup="dialog"
      aria-controls="checkout-confirm-dialog"
      :aria-disabled="cartStore.loading"
      class="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-md shadow-indigo-500/30 transition-all duration-200 hover:from-indigo-500 hover:to-indigo-400 hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
    >
      Proceed to Checkout
    </button>
  </section>

  <CheckoutConfirmModal
    v-if="isOpen"
    id="checkout-confirm-dialog"
    role="dialog"
    aria-modal="true"
    aria-labelledby="checkout-confirm-title"
    aria-describedby="checkout-confirm-description"
    @close="close"
    @accept="accept"
  />
</template>
