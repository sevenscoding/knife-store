import { api } from '@shared/api/client'

export class LogoutAPI {
  static async logout(): Promise<void> {
    await api.post<void, {}>('/auth/logout', {})
  }
}
