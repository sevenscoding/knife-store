import { api } from '@shared/api/client'

import type { LoginRequest, LoginResponse } from '@modules/auth/types'

export class AuthAPI {
  static async login(payload: LoginRequest) {
    return api.post<LoginResponse>('/auth/login', payload)
  }
}