import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@shared/composables/useLocalStorage'
import type { LoginPayload } from '@shared/types'
import { LogoutAPI } from '@shared/api/logout'
import { useToast } from '@shared/composables/useToast'
import { useRouter } from 'vue-router'
import { ROUTE_PATHS } from '@shared/constants/routes'

type UserState = {
  id: string | null
  token: string | null
  avatar: string | null
  nickname: string | null
}

export const useUserStore = defineStore('user', () => {
  const toast = useToast()
  const router = useRouter()

  const isLogoutLoading = ref(false)

  const state = useLocalStorage<UserState>('auth_user', {
    id: null,
    token: null,
    avatar: null,
    nickname: null
  })

  const isAuthenticated = computed(() => Boolean(state.value.id && state.value.token))

  const login = (payload: LoginPayload) => {
    state.value = {
      id: payload.id,
      token: payload.token,
      avatar: payload.avatar,
      nickname: payload.nickname
    }
  }

  const logout = async () => {
    if (isLogoutLoading.value) return

    try {
      isLogoutLoading.value = true
      await LogoutAPI.logout()

      state.value = { id: null, token: null, avatar: null, nickname: null }

      toast.success('Logged out')

      await router.push(ROUTE_PATHS.LOGIN)
    } catch {
      toast.error('Logout failed')
    } finally {
      isLogoutLoading.value = false
    }
  }

  return {
    id: computed(() => state.value.id),
    token: computed(() => state.value.token),
    avatar: computed(() => state.value.avatar),
    nickname: computed(() => state.value.nickname),
    isAuthenticated,
    isLogoutLoading,
    login,
    logout
  }
})
