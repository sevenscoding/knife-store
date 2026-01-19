import { http, HttpResponse, delay } from 'msw'
import { PRODUCTS } from '../../../../db/products'

export const productsHandlers = [
  http.get('/api/catalog', async ({ request }) => {
    const url = new URL(request.url)

    const q = normalize(url.searchParams.get('q'))
    const tag = normalize(url.searchParams.get('tag'))
    const sort = normalize(url.searchParams.get('sort')) as 'price_asc' | 'price_desc' | undefined

    const min = toNumber(url.searchParams.get('min'))
    const max = toNumber(url.searchParams.get('max'))
    const inStock = toBool(url.searchParams.get('inStock'))

    const page = Number(url.searchParams.get('page') || 1)
    const limit = Number(url.searchParams.get('limit') || 20)

    let items = [...PRODUCTS]

    // search
    if (q) {
      items = items.filter(p => p.name.toLowerCase().includes(q))
    }

    // tag
    if (tag) {
      items = items.filter(p => p.tags.includes(tag))
    }

    // inStock
    if (inStock !== undefined) {
      items = items.filter(p => p.inStock === inStock)
    }

    // price range
    if (min !== undefined) {
      items = items.filter(p => p.price >= min)
    }
    if (max !== undefined) {
      items = items.filter(p => p.price <= max)
    }

    // sort
    if (sort === 'price_asc') {
      items.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price_desc') {
      items.sort((a, b) => b.price - a.price)
    }

    const total = items.length
    const start = (page - 1) * limit

    await delay(1500)

    return HttpResponse.json({
      items: items.slice(start, start + limit),
      total,
      page,
      limit
    })
  })
]

const normalize = (v: string | null) =>
  v && v !== 'undefined' && v !== 'null' ? v.toLowerCase() : undefined

const toNumber = (v: string | null) => (v && !Number.isNaN(Number(v)) ? Number(v) : undefined)

const toBool = (v: string | null) => (v === 'true' ? true : v === 'false' ? false : undefined)
