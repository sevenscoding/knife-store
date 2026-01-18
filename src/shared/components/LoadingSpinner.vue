<template>
  <div
    class="h-8 w-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"
    aria-label="Loading"
    role="status"
  />
</template>

<style scoped lang="scss">
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
