<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@shared/stores/cart'
import { useCheckoutPayment } from '@modules/checkout/composables/useCheckoutPayment'
import LoadingSpinner from '@shared/components/LoadingSpinner.vue'

const cartStore = useCartStore()

const name = ref('')
const comment = ref('')

const { isProcessing, isSuccess, orderId, error, redirectIn, pay } = useCheckoutPayment({
  customer: {
    name,
    comment
  }
})
</script>

<template>
  <div class="space-y-4">
    <div
      class="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
      role="form"
      aria-labelledby="customer-title"
    >
      <h2 id="customer-title" class="text-lg font-semibold text-slate-900">Customer details</h2>

      <input
        v-model="name"
        type="text"
        placeholder="Your name"
        class="h-11 w-full rounded-lg border border-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <textarea
        v-model="comment"
        placeholder="Comment (optional)"
        rows="3"
        class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <p v-if="error === 'INVALID_CUSTOMER'" role="alert" class="text-sm text-rose-600">
        Please enter a valid name.
      </p>

      <p
        v-if="error === 'CART_OUTDATED'"
        role="status"
        aria-live="polite"
        class="text-sm text-amber-700"
      >
        Your cart was updated. Please review the changes and try again.
      </p>
    </div>

    <div
      class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
      role="group"
      aria-label="Order subtotal"
    >
      <span class="text-slate-600">Subtotal</span>

      <span class="text-lg font-semibold text-slate-900">
        {{ cartStore.validSubtotal.toFixed(2) }} {{ cartStore.cart.currency }}
      </span>
    </div>

    <button
      v-if="!isSuccess"
      @click="pay"
      :disabled="cartStore.hasNoValidItems || isProcessing"
      :aria-disabled="cartStore.hasNoValidItems || isProcessing"
      class="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-md shadow-indigo-500/30 transition-all duration-200 hover:from-indigo-500 hover:to-indigo-400 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
    >
      <LoadingSpinner v-if="isProcessing" />
      <span v-else>
        Pay {{ cartStore.validSubtotal.toFixed(2) }} {{ cartStore.cart.currency }}
      </span>
    </button>

    <div
      v-else
      role="status"
      aria-live="polite"
      class="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800 space-y-2"
    >
      <p>
        Payment successful. Your order number is
        <span class="font-semibold">{{ orderId }}</span
        >.
      </p>

      <p class="text-xs text-emerald-700">
        You will be redirected to the homepage in {{ redirectIn }} seconds.
      </p>
    </div>
  </div>
</template>
