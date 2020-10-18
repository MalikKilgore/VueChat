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
//Left side of screen navbar
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Vuefire from 'vuefire'
import 'firebase/auth'
import router from '../router'
import store from '../store'
import {db, usersCollection} from '../firebase/firebase.js'


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
        currentDatabase: ''
      },
    }
  },

  methods: {
    //Fetch the current database Messages is being used in
    fetchDatabase(){
      //Fetch or create a database with this Route's path ID.
    },

    //Send message to the database the user is currently looking at
    sendMsg(){
      console.log(this.message.content)

      this.$store.dispatch('sendMsg', {
        message: this.message.content,
        database: this.message.currentDatabase
      })
    },
  },

  mounted(){
    this.$store.dispatch('activeRoute', {
      id: this.route.id,
      path: this.route.path
    })
  },

  beforeRouteUpdate(to, from, next){
    this.route.id = to.params.chatID
    this.route.path = to.path
    this.$store.dispatch('activeRoute', {
      id: this.route.id,
      path: this.route.path
    })
    next()
  },

}
</script>

<style scoped lang="scss">
#chat-messages {
  background-color: #2C2F33;
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