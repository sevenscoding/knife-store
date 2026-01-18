import { http, HttpResponse, delay } from 'msw'
import { BASE_URL} from '@shared/constants'

export const authHandlers = [
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as {
      provider: string
      nickname: string
      avatar: string
    }

    await delay(2000)

    return HttpResponse.json(
      {
        token: 'fake-jwt-token',
        user: {
          id: 'user-xFgehjdiIue',
          nickname: body?.nickname || 'anonymous',
          avatar: body.avatar
        }
      },
      { status: 200 }
    )
  })
]