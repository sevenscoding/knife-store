<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import UiButton from '@shared/components/ui/UiButton.vue'
import NoImageBlock from '@shared/components/NoImageBlock.vue'
import { TAG_COLORS } from '@modules/catalog/constants'
import { CatalogItem } from '@shared/types'
import { useCartStore } from '@shared/stores/cart'

type Props = {
  item: CatalogItem
}

const props = defineProps<Props>()
const imageError = ref(false)

const cartStore = useCartStore()
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-xl border bg-white p-4 transition-opacity duration-200"
    :class="!item.inStock ? 'opacity-60' : ''"
    role="group"
    :aria-labelledby="`item-${item.id}-title`"
  >
    <RouterLink
      :to="`/products/${item.id}`"
      class="flex flex-col gap-3 no-underline hover:no-underline"
    >
      <ul class="flex flex-wrap gap-1">
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
          :alt="item.name"
          class="h-full w-full rounded-lg object-cover"
          loading="lazy"
          @error="imageError = true"
        />
        <NoImageBlock v-else />
      </div>

      <div>
        <h3
          class="font-medium"
          :id="`item-${item.id}-title`"
          :class="!item.inStock ? 'text-slate-500' : ''"
        >
          {{ item.name }}
        </h3>
        <p class="text-sm capitalize text-slate-500">
          {{ item.rarity }}
        </p>
      </div>

      <Transition name="price" mode="out-in">
        <div
          :key="item.price"
          class="text-xl font-bold"
          :class="item.inStock ? 'text-slate-900' : 'text-slate-500'"
        >
          ${{ item.price }}
        </div>
      </Transition>
    </RouterLink>

    <UiButton
      class="w-full transition-colors duration-200"
      size="sm"
      :disabled="!item.inStock"
      :class="
        props.item.inStock
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-slate-200 text-slate-500 cursor-not-allowed'
      "
      @click="cartStore.add(item.id)"
    >
      <Transition name="stock" mode="out-in">
        <span :key="item.inStock">
          {{ item.inStock ? 'Add to cart' : 'Out of stock' }}
        </span>
      </Transition>
    </UiButton>
  </div>
</template>

<style scoped>
.price-enter-active,
.price-leave-active {
  transition: all 0.25s ease;
}
.price-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.price-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
.stock-enter-active,
.stock-leave-active {
  transition: opacity 0.2s ease;
}
.stock-enter-from,
.stock-leave-to {
  opacity: 0;
}
</style>
