<template>
    <div id="chat-messages">

    </div>
    <br>
      <div id="chat-form-container">
        <form id="chat-form" @submit.prevent>
          <input
            id="message"
            name="message"
            type="text"
            placeholder="Send a message..."
            v-model="message.content"
            autocomplete="off"
            required
          />
          <button class="btn" v-on:click="sendMsg">Send</button>
        </form>
      </div>    
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Vuefire from 'vuefire'
import 'firebase/auth'
import router from '../router'
import store from '../store'
import {db, usersCollection, programChat, networkChat, creativeChat} from '../firebase/firebase.js'


export default {
  name: 'Messages',
  data() {
    return {
      route: {
        id: this.$route.params.chatID,
        path: this.$route.path,
      },
      message: {
        content: '',
        databaseStr: '',
        databasePln: null
      },
    }
  },

  methods: {
    //Fetch the current database and update it in VueX state
    fetchDatabase(){
      switch(this.route.path){
        case '/chatrooms/programming':
          this.message.databaseStr = `programChat`
          this.message.databasePln = programChat
          this.$store.dispatch('activeRoute', {
            message: this.message.content,
            dbStr: this.message.databaseStr,
            dbPln: this.message.databasePln
          })
          break
        case '/chatrooms/networking':
          this.message.databaseStr = `networkChat`
          this.message.databasePln = networkChat
          this.$store.dispatch('activeRoute', {
            message: this.message.content,
            dbStr: this.message.databaseStr,
            dbPln: this.message.databasePln
          })          
          break
        case '/chatrooms/creative':
          this.message.databaseStr = `creativeChat`
          this.message.databasePln = creativeChat
          this.$store.dispatch('activeRoute', {
            message: this.message.content,
            dbStr: this.message.databaseStr,
            dbPln: this.message.databasePln
          })
          break
      }      
    },

    //Send message to the database the user is currently looking at
    sendMsg(){
      //Dispatches String and plain text of current Database
      this.$store.dispatch('sendMsg', {
        message: this.message.content,
        dbStr: this.message.databaseStr,
        dbPln: this.message.databasePln
      })
    },
  },

  mounted(){
    this.$store.dispatch('activeRoute', {
      id: this.route.id,
      path: this.route.path
    }).then(this.fetchDatabase())
    this.$store.dispatch('renderDOM')
  },

//Need to clear DOM when switching routes
  beforeRouteUpdate(to, from, next){
    this.route.id = to.params.chatID
    this.route.path = to.path
    
    //Updates the route path in VueX state. Then it fetches the correct database and updates that as well.
    this.$store.dispatch('activeRoute', {
      id: this.route.id,
      path: this.route.path
    }).then(this.fetchDatabase())
    this.$store.dispatch('renderDOM')
    next()
  },

}
</script>

<style scoped lang="scss">
#chat-messages {
  background-color: #2C2F33;
  color: #ffffff;
  font-weight: bold;
  height: 300px;
  width: 3fr;
  padding: 30px;
	max-height: 500px;
	overflow-y: scroll;
}

#chat-messages .message {
	padding: 10px;
	margin-bottom: 15px;
	background-color: #99aab5;
	border-radius: 5px;
}

#chat-form-container {
  width: 100%;
}

#chat-form-container form {
  display: flex;
}

#chat-form-container input[type='text'] {
	font-size: 16px;
	padding: 5px;
	height: 40px;
	flex: 1;
}

#btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
	font-size: 17px;
}
</style>