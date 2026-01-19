<script setup lang="ts">
import UiInput from '@shared/components/ui/UiInput.vue'
import UiButton from '@shared/components/ui/UiButton.vue'
import CatalogTagSelect from './CatalogTagSelect.vue'
import { TAGS } from '@modules/catalog/constants'
import { useCatalogFilters } from '../composables/useCatalogFilters'

type Props = {
  q?: string
  sort?: 'price_asc' | 'price_desc'
  tag?: string
}

type Emit = {
  update: [
    {
      q?: string
      sort?: 'price_asc' | 'price_desc'
      tag?: string
    }
  ]
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const { search, isPriceAsc, isPriceDesc, setSort, setTag } = useCatalogFilters(props, payload =>
  emit('update', payload)
)
</script>

<template>
  <form
    class="bg-white p-4 rounded-xl shadow-sm"
    role="search"
    aria-label="Catalog filters"
    @submit.prevent
  >
    <div class="flex flex-col gap-4 md:flex-row md:items-center">
      <div class="flex flex-col gap-4 md:flex-row md:items-center">
        <UiInput
          class="w-full md:w-64"
          placeholder="Search products"
          v-model="search"
          aria-label="Search products"
        />

        <CatalogTagSelect
          class="w-full md:w-48"
          :model-value="tag"
          :options="TAGS"
          aria-label="Filter by tag"
          @update:model-value="setTag"
        />
      </div>

      <div class="flex gap-2 md:ml-auto" role="group" aria-label="Sort by price">
        <button
          type="button"
          :aria-pressed="isPriceAsc"
          :class="[
            'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
            isPriceAsc
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          ]"
          @click="setSort('price_asc')"
        >
          Price ↑
        </button>

        <button
          type="button"
          :aria-pressed="isPriceDesc"
          :class="[
            'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400',
            isPriceDesc
              ? 'bg-pink-500 text-white shadow-md'
              : 'bg-pink-100 text-pink-800 hover:bg-pink-200'
          ]"
          @click="setSort('price_desc')"
        >
          Price ↓
        </button>
      </div>
    </div>
  </form>
</template>