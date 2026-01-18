<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '@shared/components/ui/UiButton.vue'
import type { CatalogItem as Item } from '../types'
import { TAG_COLORS } from '@modules/catalog/constants'
import NoImageBlock from '@shared/components/NoImageBlock.vue'

type Props = {
  item: Item
}

defineProps<Props>()

const imageError = ref(false)
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-xl border bg-white p-4"
    role="group"
    :aria-labelledby="`item-${item.id}-title`"
  >
    <ul class="flex flex-wrap gap-1" aria-label="Product tags">
      <li
        v-for="tag in item.tags"
        :key="tag"
        class="rounded-full px-2 py-0.5 text-xs font-medium"
        :class="TAG_COLORS[tag] ?? 'bg-slate-100 text-slate-700'"
      >
        {{ tag }}
      </li>
    </ul>

    <div class="h-40 w-full">
      <img
        v-if="!imageError"
        :src="item.image"
        :alt="`${item.name} product image`"
        class="h-full w-full rounded-lg object-cover"
        loading="lazy"
        @error="imageError = true"
      />

      <NoImageBlock v-else :alt="`${item.name} image not available`" />
    </div>

    <div>
      <h3 class="font-medium" :id="`item-${item.id}-title`">
        {{ item.name }}
      </h3>
      <p class="text-sm capitalize text-slate-500">
        {{ item.rarity }}
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-3">
      <div class="text-xl font-bold text-slate-900" aria-label="Price">${{ item.price }}</div>

      <UiButton
        class="w-full"
        size="sm"
        :disabled="!item.inStock"
        :aria-disabled="!item.inStock"
        :aria-label="item.inStock ? 'Add item to cart' : 'Item out of stock'"
      >
        {{ item.inStock ? 'Add to cart' : 'Out of stock' }}
      </UiButton>
    </div>
  </div>
</template>