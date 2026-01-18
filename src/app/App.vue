<script setup lang="ts">
import MainLayout from '@app/components/MainLayout.vue'
import ToastContainer from '@shared/components/ToastContainer.vue'
import HeaderBlock from '@app/components/HeaderBlock.vue'
</script>

<template>
  <div class="app-view">
    <ToastContainer />
    <HeaderBlock />
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
</template>