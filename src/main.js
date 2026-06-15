import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import { loadDistribution } from '@/classes/deck/distributionConfig'

const app = createApp(App)
app.use(router)
app.use(store)

// Load the live card distribution before mounting so the first deck built uses
// it. Mount regardless of the outcome - loadDistribution falls back to the
// in-code default on failure.
loadDistribution().finally(() => app.mount('#app'))
