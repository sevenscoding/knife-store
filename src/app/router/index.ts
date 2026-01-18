import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@shared/stores/user'
import { ROUTE_NAMES, ROUTE_PATHS, ROUTE_META } from '@shared/constants/routes'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTE_PATHS.ROOT,
      name: ROUTE_NAMES.CATALOG,
      component: () => import('@modules/catalog/views/CatalogView.vue'),
      meta: { [ROUTE_META.REQUIRES_AUTH]: true }
    },
    {
      path: ROUTE_PATHS.LOGIN,
      name: ROUTE_NAMES.LOGIN,
      component: () => import('@modules/auth/views/AuthView.vue')
    }
  ]
})

router.beforeEach(to => {
  const userStore = useUserStore()

  if (to.meta[ROUTE_META.REQUIRES_AUTH] && !userStore.isAuthenticated) {
    return { name: ROUTE_NAMES.LOGIN }
  }

  if (to.name === ROUTE_NAMES.LOGIN && userStore.isAuthenticated) {
    return { name: ROUTE_NAMES.CATALOG }
  }
})