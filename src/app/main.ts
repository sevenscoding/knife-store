import { createApp } from 'vue'
import App from '@app/App.vue'
import { router } from '@app/router'
import { createPinia } from 'pinia'

import '@app/styles/tailwind.css'
import '@app/styles/index.scss'

const { worker } = await import('@app/mocks/browser')
await worker.start()

createApp(App).use(createPinia()).use(router).mount('#app')
