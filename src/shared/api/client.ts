import { BASE_URL } from '@shared/constants'

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {})
      }
    })

    if (!response.ok) {
      let data: any = null
      try {
        data = await response.json()
      } catch {}

      throw data ?? { status: response.status }
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    if (response.status === 204) {
      return undefined as T
    }

    return (await response.json()) as T
  }

  public get<T>(
    url: string,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<T> {
    const cleanParams = params
      ? Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined))
      : undefined

    const query = cleanParams
      ? `?${new URLSearchParams(
          Object.entries(cleanParams).map(([k, v]) => [k, String(v)])
        ).toString()}`
      : ''

    return this.request<T>(`${url}${query}`, { method: 'GET' })
  }

  public post<T, B = unknown>(url: string, body: B): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }
}

export const api = new ApiClient(BASE_URL)
