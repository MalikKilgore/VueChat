import firebase from 'firebase'
import { createApp } from 'vue'
import 'firebase/auth'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

/*
firebase.auth.onAuthStateChanged(function(App) {
  if (!App) {
    return App = createApp(App).use(store).use(router).mount('#app')
  }
})

*/