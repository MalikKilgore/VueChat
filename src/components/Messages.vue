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
    //Fetch the current database Messages is being used in
    fetchDatabase(){
      switch(this.route.path){
        case '/chatrooms/programming':
          this.message.databaseStr = `programChat`
          this.message.databasePln = programChat
          break
        case '/chatrooms/networking':
          this.message.databaseStr = `networkChat`
          this.message.databasePln = networkChat
          break
        case '/chatrooms/creative':
          this.message.databaseStr = `creativeChat`
          this.message.databasePln = creativeChat
          break
      }      
    },
    //Renders messages in the database to the Virtual DOM
    displayDatabase(){
      //Read current Database in state. Display current Database documents in the DOM
      this.$store.state.currentDatabase.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          const div = document.createElement('div')
          div.classList.add('message')
          div.innerHTML = `${doc.content}`
          document.getElementById(`chat-messages`).appendChild(div)
        });
      });
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

  firestore: {

  },

  mounted(){
    this.$store.dispatch('activeRoute', {
      id: this.route.id,
      path: this.route.path
    }).then(this.fetchDatabase())
  },

  beforeRouteUpdate(to, from, next){
    this.route.id = to.params.chatID
    this.route.path = to.path
    this.$store.dispatch('activeRoute', {
      id: this.route.id,
      path: this.route.path
    }).then(this.fetchDatabase())
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