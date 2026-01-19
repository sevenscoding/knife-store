export const ROUTE_NAMES = {
  CATALOG: 'Catalog',
  PRODUCT: 'Product',
  LOGIN: 'Login',
  CART: 'Cart',
  CHECKOUT: 'Checkout'
} as const

export const ROUTE_PATHS = {
  ROOT: '/',
  CATALOG: '/',
  PRODUCT: '/products/:id',
  LOGIN: '/login',
  CART: '/cart',
  CHECKOUT: '/checkout'
} as const

export const ROUTE_META = {
  REQUIRES_AUTH: 'requiresAuth'
} as const
