import { createStore } from 'vuex'
import Vue, { toDisplayString } from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'
import { dmCollection, usersCollection, auth, programChat, networkChat, creativeChat } from '../firebase/firebase.js'


export default createStore({
  state: {
    userProfile: {},
    currentRoute: {},
    currentDatabase: {}
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
    async activeRoute({ commit }, id) {
      const currentRoute = await id

      commit('setCurrentRoute', currentRoute)
      console.log(this.state.currentRoute)
    },

    // Adds message to the specified database.
    async sendMsg({commit}, form) {

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

      commit('setCurrentDatabase', form.dbPln)
      this.dispatch('renderDOM', form.dbPln)
      /*await database.doc('message').set({
        createdOn: new Date(),
        content: message.content,
        UID: auth.currentUser.uid,
        userName: state.userProfile.name,
      })*/

    },

    async renderDOM(){
      console.log('starting renderDOM')
      //Read current Database in state. Display current Database documents in the DOM
      this.state.currentDatabase.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().toString());

          const div = document.createElement('div')
          div.classList.add('message')
          div.innerHTML = `${doc.data()}`
          document.getElementById(`chat-messages`).appendChild(div)
        });
      });      
    }


  },

  modules: {
    
  }
})
