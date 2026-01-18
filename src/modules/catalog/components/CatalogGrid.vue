<script setup lang="ts">
import CatalogItem from './CatalogItem.vue'
import type { CatalogItem as Item } from '@shared/types'

type Props = {
  items: Item[]
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <CatalogItem v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>