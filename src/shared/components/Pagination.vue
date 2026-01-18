<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  page: number
  total: number
  limit: number
}

type Emit = {
  change: [page: number]
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const totalPages = computed(() => Math.ceil(props.total / props.limit))
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-3 mt-8 mb-12"
    role="navigation"
    aria-label="Pagination"
  >

    <button
      class="h-10 px-4 rounded-lg border text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
      :disabled="page === 1"
      aria-label="Previous page"
      :aria-disabled="page === 1"
      @click="emit('change', page - 1)"
    >
      Prev
    </button>

    <button
      v-for="p in totalPages"
      :key="p"
      class="h-10 min-w-[40px] px-3 rounded-lg border text-sm font-medium transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="p === page ? 'bg-blue-600 text-white border-blue-600' : ''"
      :aria-current="p === page ? 'page' : undefined"
      :aria-label="`Go to page ${p}`"
      @click="emit('change', p)"
    >
      {{ p }}
    </button>

    <button
      class="h-10 px-4 rounded-lg border text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
      :disabled="page === totalPages"
      aria-label="Next page"
      :aria-disabled="page === totalPages"
      @click="emit('change', page + 1)"
    >
      Next
    </button>
  </nav>
</template>