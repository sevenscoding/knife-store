<script setup lang="ts">
import UiInput from '@shared/components/ui/UiInput.vue'
import UiButton from '@shared/components/ui/UiButton.vue'
import { useAuthForm } from '@modules/auth/composables/useAuthForm'
import LoadingSpinner from '@shared/components/LoadingSpinner.vue'

const { login, isLoading, submit } = useAuthForm()
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="submit">
    <UiInput
      v-model="login"
      label="Login"
      placeholder="Enter your nickname"
      autocomplete="username"
    />

    <div v-if="isLoading" class="flex justify-center">
      <LoadingSpinner  />
    </div>

    <UiButton v-else type="submit"> Login </UiButton>
  </form>
</template>