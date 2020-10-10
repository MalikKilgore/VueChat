import { createStore } from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'
import { dmCollection, usersCollection, auth } from '../firebase/firebase.js'

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
      dispatch('fetchUserProfile', user).then(alert(`Sign-in successful for ${form.email}`))
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
      await usersCollection.doc(form.name).set({
        name: form.name,
        email: form.email,
        password: form.password,
        edit: false,
        uid: user.uid
      })

    
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user).then(alert(`Account created for ${form.email}`))
    },

    async logout({ commit }) {
      await auth.signOut()
    
      // clear userProfile and redirect to login page
      commit('setUserProfile', {})
      alert('You have signed out')
      router.push('/join')
    },

    async sendMsg({ state, commit }, message) {
      //Add message to databases. TODO: Need Switch selector based on the chatroom/database. USE .set

      /*
      await roomCollection.add({
        createdOn: new Date(),
        content: message.content,
        UID: auth.currentUser.uid,
        userName: state.userProfile.name,
      }) */

    },

  },
  modules: {
  }
})
