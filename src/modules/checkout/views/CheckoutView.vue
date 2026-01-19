<script setup lang="ts">
import { useCartStore } from '@shared/stores/cart'
import CheckoutItems from '@modules/checkout/components/CheckoutItems.vue'
import CheckoutSummary from '@modules/checkout/components/CheckoutSummary.vue'
import CheckoutPaymentForm from '@modules/checkout/components/CheckoutPaymentForm.vue'

const cartStore = useCartStore()
</script>

<template>
  <section class="mx-auto max-w-3xl space-y-8 px-4 sm:px-0" :aria-busy="cartStore.loading">
    <h1 class="text-2xl font-bold text-slate-900">Checkout</h1>

    <CheckoutItems />

    <CheckoutSummary />
  </section>
</template>
