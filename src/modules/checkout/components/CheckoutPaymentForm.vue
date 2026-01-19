<script setup lang="ts">
import { ref } from 'vue'
import { useCheckoutPayment } from '@modules/checkout/composables/useCheckoutPayment'

const name = ref('')
const comment = ref('')

const { error } = useCheckoutPayment({
  customer: {
    name,
    comment
  }
})
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
    <h2 class="text-lg font-semibold text-slate-900">Customer details</h2>

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
  </div>
</template>
