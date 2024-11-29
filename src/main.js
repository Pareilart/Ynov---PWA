import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './style.css'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const app = createApp(App)
app.use(VueQueryPlugin, {
  queryClient,
})
app.mount('#app')
