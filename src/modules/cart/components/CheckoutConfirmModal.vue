<script setup lang="ts">
type Emits = {
  close: []
  accept: []
}
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="absolute inset-0 z-30 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="emit('close')" />

    <div
      class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      role="dialog"
      aria-modal="true"
      @click.stop
    >
      <h2 class="text-lg font-semibold text-slate-900">Proceed to checkout?</h2>

      <p class="mt-3 text-sm leading-relaxed text-slate-600">
        Items that are currently out of stock or have updated prices will not be included in your
        checkout.
      </p>

      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="emit('close')"
          class="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          Cancel
        </button>

        <button
          @click="emit('accept')"
          class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
</template>
