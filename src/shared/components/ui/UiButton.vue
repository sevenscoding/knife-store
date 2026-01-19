<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}

type Emit = {
  click: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const buttonClasses = computed(() => [
  'w-full rounded-md px-4 py-2.5 text-sm font-medium transition',
  'bg-blue-500 text-white',
  'hover:bg-sky-600',
  'focus:outline-none focus:ring-2 focus:ring-sky-400',
  (props.disabled || props.loading) && 'opacity-60 cursor-not-allowed'
])

const onClick = () => {
  if (props.disabled || props.loading) return
  emit('click')
}
</script>

<template>
  <button
    :type="type ?? 'button'"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="onClick"
  >
    <slot />
  </button>
</template>
