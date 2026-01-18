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
        <UiButton
          :class="
            isPriceAsc
              ? 'bg-red-500 text-white ring-2 ring-red-500'
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          "
          :aria-pressed="isPriceAsc"
          @click="setSort('price_asc')"
        >
          Price ↑
        </UiButton>

        <UiButton
          :class="
            isPriceDesc
              ? 'bg-red-500 text-white ring-2 ring-red-500'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          "
          :aria-pressed="isPriceDesc"
          @click="setSort('price_desc')"
        >
          Price ↓
        </UiButton>
      </div>
    </div>
  </form>
</template>