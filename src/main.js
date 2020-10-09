import firebase from 'firebase'
import { createApp } from 'vue'
import 'firebase/auth'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase/firebase'

const app = createApp(App).use(store).use(router).mount('#app')

/*
auth.onAuthStateChanged(function(app) {
  if (!app) {
    return app = createApp(app).use(store).use(router).mount('#app')
  }
}) */