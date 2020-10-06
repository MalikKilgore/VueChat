import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chatrooms from '../views/Chatrooms.vue'
import Join from '../views/Join.vue'
import { auth } from 'firebase'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chatrooms',
    name: 'Chatrooms',
    component: Chatrooms,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/join',
    name: 'Join',
    component: Join
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

// Navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/join')
  } else {
    next()
  }
})

export default router
