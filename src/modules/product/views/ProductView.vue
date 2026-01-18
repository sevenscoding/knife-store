<script setup lang="ts">
import { ref } from 'vue'
import { useProduct } from '../composables/useProduct'
import LoadingSpinner from '@shared/components/LoadingSpinner.vue'
import UiButton from '@shared/components/ui/UiButton.vue'
import NoImageBlock from '@shared/components/NoImageBlock.vue'

const { item, isLoading } = useProduct()

const imageError = ref(false)
</script>

<template>
  <div v-if="isLoading" class="min-h-[60vh] flex items-center justify-center">
    <LoadingSpinner />
  </div>

  <div v-else-if="item" class="max-w-4xl mx-auto p-6 flex gap-8">
    <div class="w-1/2 h-96">
      <img
        v-if="!imageError"
        :src="item.image"
        :alt="item.name"
        @error="imageError = true"
        class="h-full w-full rounded-xl object-cover"
      />
      <NoImageBlock v-else />
    </div>

    <div class="flex flex-col gap-4 w-1/2">
      <h1 class="text-2xl font-bold">{{ item.name }}</h1>
      <p class="text-slate-500 capitalize">{{ item.rarity }}</p>

      <Transition name="price" mode="out-in">
        <div :key="item.price" class="text-3xl font-bold">${{ item.price }}</div>
      </Transition>

      <UiButton
        size="lg"
        :disabled="!item.inStock"
        :class="
          item.inStock
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-slate-200 text-slate-500 cursor-not-allowed'
        "
      >
        {{ item.inStock ? 'Add to cart' : 'Out of stock' }}
      </UiButton>
    </div>
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
</style>