import { createApp } from 'vue'
import App from '@app/App.vue'
import { router } from '@app/router'
import { createPinia } from 'pinia'

import '@app/styles/tailwind.css'
import '@app/styles/index.scss'

async function bootstrap() {
  const { worker } = await import('@app/mocks/browser')

  await worker.start({
    onUnhandledRequest: 'bypass'
  })

  createApp(App).use(createPinia()).use(router).mount('#app')
}

bootstrap()
