import { createStore } from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'
import { usersCollection, auth } from '../firebase/firebase.js'

export default createStore({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await auth.signInWithEmailAndPassword(form.email, form.password)
  
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },

    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await usersCollection.doc(user.uid).get()
  
      // set user profile in state
      commit('setUserProfile', userProfile.data())
      
      // change route to dashboard/home
      router.push('/')
    },

    async createUser({ dispatch }, form) {
      // sign user up
      const { user } = await auth.createUserWithEmailAndPassword(form.email, form.password)
    
      // create user profile object in userCollections
      await usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email,
        password: form.password,
        edit: false
      })
    
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },

  },
  modules: {
  }
})
