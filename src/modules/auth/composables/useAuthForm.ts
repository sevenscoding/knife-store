import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@shared/stores/user'
import { AuthAPI } from '@modules/auth/api'
import { ROUTE_PATHS } from '@shared/constants/routes'
import { useToast } from '@shared/composables/useToast'

export const useAuthForm = () => {
  const router = useRouter()
  const userStore = useUserStore()

  const isLoading = ref(false)
  const login = ref('')

  const submit = async () => {
    try {
      isLoading.value = true

      const { token, user } = await AuthAPI.login({
        provider: 'mock',
        nickname: login.value,
        avatar: '/avatars/u1.png'
      })

      userStore.login({
        id: user.id,
        token,
        avatar: user.avatar,
        nickname: user.nickname
      })

      useToast().success('Successfully logged in')

      await router.push(ROUTE_PATHS.ROOT)
    } catch (error) {
      useToast().error('Error logging in')
    } finally {
      isLoading.value = false
    }
  }

  return {
    login,
    isLoading,
    submit
  }
}
