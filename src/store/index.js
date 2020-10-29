import { createStore } from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'
import router from '../router/index'
import { dmCollection, usersCollection, auth, programChat,
   networkChat, creativeChat } from '../firebase/firebase.js'


export default createStore({
  state: {
    userProfile: {},
    currentRoute: {},
    currentDatabase: {},
    currentUser: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setCurrentRoute(state, val) {
      state.currentRoute = val
    },
    setCurrentDatabase(state, val) {
      state.currentDatabase = val
    },
    setCurrentUser(state, val) {
      state.currentUser = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // Signs the user in
      const { user } = await auth.signInWithEmailAndPassword(form.email, form.password)
  
      // Fetches the current user profile and updates it in state
      dispatch('fetchUserProfile', user).then(alert(`Sign-in successful for ${form.email}`))
    },

    async fetchUserProfile({ commit }, user) {
      // Fetches the current user profile
      const userProfile = await usersCollection.doc(user.uid).get()
  
      // Sets user profile in state
      commit('setUserProfile', userProfile.data())

      //Sets active user in state
      commit('setCurrentUser', user)
      
      // Reroutes to dashboard/home
      router.push('/')
    },

    async createUser({ dispatch }, form) {
      // Registers user account in Firebase
      const { user } = await auth.createUserWithEmailAndPassword(form.email, form.password)
    
      // Creates user profile in usersCollections
      await usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email,
        password: form.password,
        edit: false,
        uid: user.uid
      })

      // Fetches the current user profile and updates it in state
      dispatch('fetchUserProfile', user).then(alert(`Account created for ${form.email}`))
    },

    async logout({ commit }) {
      await auth.signOut().then(alert(`You've successfully signed out`))
    
      // Clears userProfile and redirect to login page
      commit('setUserProfile', {})
      router.push('/join')
    },

    // Grabs and updates the active route/database state
    async activeRoute({ commit }, form) {
      if (form.id){
        commit('setCurrentRoute', form.id)
      } else if (form.dbPln) {
        commit('setCurrentDatabase', form.dbPln)
      }
    },

    // Adds message to the specified database firestore.
    async sendMsg({dispatch}, form) {
      const user = this.state.currentUser

      switch(form.dbStr){
        case `programChat`:
          console.log('Using programChat database')
          await programChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentBy: user.uid,
          })
          break
        case `networkChat`:
          console.log('Using networkChat database')
          await networkChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentBy: user.uid,
          })
          break
        case `creativeChat`:
          console.log('Using creativeChat database')
          await creativeChat.doc().set({
            createdOn: new Date(),
            content: form.message,
            sentBy: user.uid,
          })
          break
      }
    },
    //Deletes message in Firestore
    async dltMsg({dispatch}, id){
      const user = this.state.currentUser
      const database = this.state.currentDatabase
      const doc = await database.doc(id).get()

      if(doc.data().sentBy != user.uid){
        console.log('You cannot delete this message')
      } else {
        database.doc(id).delete()
      }
    },
    //Edits message content in Firebase
    async editMsg({dispatch}, form){
      const user = this.state.currentUser
      const database = this.state.currentDatabase
      const doc = await database.doc(form.id).get()

      if(doc.data().sentBy != user.uid){
        console.log('You cannot edit this message')
      } else {
        database.doc(form.id).set({
          createdOn: doc.data().createdOn,
          editedOn: new Date(),
          content: form.content,
          sentBy: doc.data().sentBy,
        })
      }

    }

  },

  modules: {
    
  }
})
