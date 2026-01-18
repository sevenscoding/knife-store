<script setup lang="ts">
import { useCatalog } from '../composables/useCatalog'
import Pagination from '@shared/components/Pagination.vue'
import CatalogFilters from '../components/CatalogFilters.vue'
import CatalogGrid from '../components/CatalogGrid.vue'
import LoadingSpinner from '@shared/components/LoadingSpinner.vue'

const { items, isLoading, query, total, onUpdate, setQuery } = useCatalog()
</script>

<template>
  <div class="px-4 pt-6 pb-8">
    <CatalogFilters :q="query.q" :sort="query.sort" :tag="query.tag" @update="onUpdate" />
  </div>

  <div v-if="isLoading" class="min-h-[60vh] flex items-center justify-center">
    <LoadingSpinner />
  </div>

  <div
    v-else-if="items.length === 0"
    class="min-h-[40vh] flex flex-col items-center justify-center gap-2 text-center"
  >
    <div class="text-lg font-medium text-slate-700">No products found</div>
    <div class="text-sm text-slate-500">Try changing search or filters</div>
  </div>

  <div v-else class="flex flex-col gap-6">
    <CatalogGrid :items="items" :loading="isLoading" />

    <Pagination
      :page="query.page"
      :limit="query.limit"
      :total="total"
      @change="p => setQuery({ page: String(p) }, false)"
    />
  </div>
</template>