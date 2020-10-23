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
    messagesDOM: []
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
    setMessagesDOM(state, val) {
      state.messagesDOM = val
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
      
      // Reroutes to dashboard/home
      router.push('/')
    },

    async createUser({ dispatch }, form) {
      // Registers user account in Firebase
      const { user } = await auth.createUserWithEmailAndPassword(form.email, form.password)
    
      // Creates user profile in usersCollections
      await usersCollection.doc(form.name).set({
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

    // Grabs and updates the active route state
    async activeRoute({ commit }, form) {

      if (form.id){
        commit('setCurrentRoute', form.id)
        console.log(`Setting route to ${this.state.currentRoute}`)
      } else if (form.dbPln) {
        commit('setCurrentDatabase', form.dbPln)
        console.log(`Setting database to ${this.state.currentDatabase}`)
      }
      
    },

    // Adds message to the specified database firestore.
    async sendMsg({dispatch}, form) {

      switch(form.dbStr){
        case `programChat`:
          console.log('Using programChat database')
          await programChat.doc().set({
            createdOn: new Date(),
            content: form.message,
          })
          break
        case `networkChat`:
          console.log('Using networkChat database')
          await networkChat.doc().set({
            createdOn: new Date(),
            content: form.message,
          })
          break
        case `creativeChat`:
          console.log('Using creativeChat database')
          await creativeChat.doc().set({
            createdOn: new Date(),
            content: form.message,
          })
          break
      }
    },

    /*async renderMsg(doc){
      const msg = document.createElement('li')
      msg.setAttribute('data-id', doc.id)
      msg.textContent = doc.data().content
      document.getElementById(`msgList`).appendChild(msg)
    },

    async removeMsg(doc){
      const msgList = document.getElementById('msgList')
      let msg = msgList.querySelector('[data-id=' + doc.id + ']')
      msgList.removeChild(msg)
    },*/

    async renderDOM({dispatch}){
      console.log('starting renderDOM')
      //Read current Database in state. Display current Database documents in the DOM
      const database = this.state.currentDatabase
      const msgList = document.getElementById('msgList')

      database.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {

        if (change.type === "added") {
          console.log("New message: ", change.doc.data());
          const msg = document.createElement('li')
          msg.setAttribute('data-id', change.doc.id)
          msg.textContent = change.doc.data().content
          document.getElementById(`msgList`).appendChild(msg)
          //dispatch('renderMsg', change.doc)
        }
        if (change.type === "modified") {
          console.log("Modified message: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed message: ", change.doc.data());
          let rmMsg = msgList.querySelector('[data-id=' + change.doc.id + ']')
          msgList.removeChild(rmMsg)
        }

        });
      });

    }

  },

  modules: {
    
  }
})
