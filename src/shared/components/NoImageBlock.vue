<script setup lang="ts">
type Props = {
  alt?: string
}

withDefaults(defineProps<Props>(), {
  alt: 'Image not available'
})
</script>

<template>
  <div
    class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-slate-100"
    role="img"
    :aria-label="alt"
  >
    <img
      src="../assets/img/no-image.png"
      :alt="alt"
      class="max-h-full max-w-full object-contain opacity-40 grayscale"
      aria-hidden="true"
    />

    <div class="absolute inset-0 bg-white/40" aria-hidden="true" />
  </div>
</template>