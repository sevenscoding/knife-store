<script setup lang="ts">
import CartIcon from '@shared/components/icons/CartIcon.vue'
import { useCartStore } from '@shared/stores/cart'
import { RouterLink, useRoute } from 'vue-router'
import { ROUTES } from '@app/types/routes'
import { useUserStore } from '@shared/stores/user'
import LoadingSpinner from '@shared/components/LoadingSpinner.vue'
import LogoIcon from '@shared/components/icons/LogoIcon.vue'
import { ROUTE_PATHS } from '@shared/constants/routes'

const cartStore = useCartStore()
const userStore = useUserStore()
const route = useRoute()

const logout = () => {
  userStore.logout()
}
</script>

<template>
  <header
    v-if="userStore.isAuthenticated"
    class="flex items-center justify-between px-8 py-3 border-b bg-white"
    role="banner"
  >
    <RouterLink
      :to="ROUTE_PATHS.ROOT"
      class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      aria-label="Go to home"
    >
      <LogoIcon class="h-7 w-7 text-blue-600" aria-hidden="true" />
      <span class="text-lg font-semibold text-slate-800">
        <span class="text-blue-600">Knife</span> Store
      </span>
    </RouterLink>

    <div class="flex items-center gap-4">
      <div class="text-sm font-medium text-slate-700" aria-label="User nickname">
        {{ userStore.nickname }}
      </div>

      <RouterLink
        v-if="route.path !== ROUTES.CART"
        :to="ROUTES.CART"
        class="relative inline-flex items-center justify-center rounded-lg p-2 text-slate-800 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Open cart"
      >
        <CartIcon class="h-6 w-6" aria-hidden="true" />

        <span
          v-if="cartStore.count > 0"
          class="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white"
        >
          {{ cartStore.count }}
        </span>
      </RouterLink>

      <LoadingSpinner v-if="userStore.isLogoutLoading" aria-label="Logging out" />

      <button
        v-else
        type="button"
        @click="logout"
        class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  </header>
</template>