<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  modelValue: string
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  type?: string
}

type Emit = {
  'update:modelValue': [value: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const inputClasses = computed(() => [
  'w-full rounded-md border px-3 py-2 text-sm',
  'bg-white text-slate-900',
  'placeholder:text-slate-400',
  'focus:outline-none focus:ring-2',
  props.error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-slate-100 focus:border-blue-400 focus:ring-blue-200',
  props.disabled && 'bg-slate-100 cursor-not-allowed opacity-60'
])

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="block space-y-1">
    <span v-if="label" class="text-sm text-slate-500">
      {{ label }}
    </span>

    <input
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      :class="inputClasses"
      @input="onInput"
    />

    <p v-if="error" class="text-xs text-red-500">
      {{ error }}
    </p>
  </label>
</template>