import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import './assets/styles.css'
import { auth } from './firebase/firebase'


let app
auth.onAuthStateChanged(user => {
  if (!app) {
    return app = createApp(App).use(store).use(router).mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})