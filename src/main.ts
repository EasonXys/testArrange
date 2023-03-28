import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Edit from './views/Edit.vue'
import Display from './views/Display.vue'
import { createPinia } from 'pinia'



const routes = [
  {
    path: '/',
    component: Display
  },
  {
    path: '/edit',
    component: Edit
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})



const app = createApp(App)
app.use(router)
app.use(createPinia())

app.mount('#app')

