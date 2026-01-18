import { http, HttpResponse, delay } from 'msw'

export const logoutHandlers = [
  http.post('/api/auth/logout', async () => {
    await delay(2000)

    return new HttpResponse(null, { status: 204 })
  })
]
