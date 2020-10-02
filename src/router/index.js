import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chatrooms from '../views/Chatrooms.vue'
import Join from '../views/Join.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/chatrooms',
    name: 'Chatrooms',
    component: Chatrooms
  },
  {
    path: '/',
    name: 'Join',
    component: Join
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
