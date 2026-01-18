export const ROUTE_NAMES = {
  CATALOG: 'Catalog',
  PRODUCT: 'Product',
  LOGIN: 'Login'
} as const

export const ROUTE_PATHS = {
  ROOT: '/',
  CATALOG: '/',
  PRODUCT: '/products/:id',
  LOGIN: '/login'
} as const

export const ROUTE_META = {
  REQUIRES_AUTH: 'requiresAuth'
} as const
