import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './routes'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


createApp(App).use(router).use(VueQueryPlugin).use(PrimeVue, {
  theme: {
    preset: Aura
  }
}).mount('#app')
