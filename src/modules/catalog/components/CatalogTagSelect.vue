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
  <div class="relative">
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

    <svg
      class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</template>