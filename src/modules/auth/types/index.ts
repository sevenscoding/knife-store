export type LoginRequest = {
  provider: 'mock'
  nickname: string
  avatar: string
}

export type LoginResponse = {
  token: string
  user: {
    id: string
    nickname: string
    avatar: string
  }
}
