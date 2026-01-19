<script setup lang="ts">
import LogoIcon from '@shared/components/icons/LogoIcon.vue'
import AuthForm from '@modules/auth/components/AuthForm.vue'
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-slate-100">
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-6"
      role="main"
    >
      <div class="flex flex-col items-center gap-2">
        <LogoIcon class="h-10 w-10" aria-hidden="true" />
        <h1 id="login-title" class="sr-only">Login</h1>
      </div>

      <AuthForm />
    </div>
  </div>
</template>
