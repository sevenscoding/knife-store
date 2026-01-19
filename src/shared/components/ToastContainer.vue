<script setup lang="ts">
import { useToast } from '@shared/composables/useToast'

const { messages } = useToast()
</script>

<template>
  <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3">
    <div
      v-for="(msg, i) in messages"
      :key="i"
      class="rounded-md px-4 py-3 text-sm font-medium text-white shadow-md animate-[toast-in_0.25s_ease-out]"
      :class="
        msg.type === 'error' ? 'bg-red-500' : msg.type === 'info' ? 'bg-yellow-500' : 'bg-green-500'
      "
    >
      {{ msg.message }}
    </div>
  </div>
</template>

<style>
@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
