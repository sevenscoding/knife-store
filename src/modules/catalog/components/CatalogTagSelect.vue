<script setup lang="ts">
type Props = {
  modelValue?: string
  options: readonly string[]
}

type Emit = {
  'update:modelValue': [value?: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const onChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value
  emit('update:modelValue', value === '' ? undefined : value)
}
</script>

<template>
  <div class="relative inline-block">
    <select
      class="appearance-none h-10 min-w-[180px] rounded-lg border border-slate-300 bg-white px-4 pr-10 text-base text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400 transition"
      :value="props.modelValue ?? ''"
      @change="onChange"
    >
      <option value="">All tags</option>

      <option v-for="tag in options" :key="tag" :value="tag">
        {{ tag }}
      </option>
    </select>

    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </div>
</template>