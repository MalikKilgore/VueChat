<template>
    <div class="chat-messages">

    </div>
    <br>
      <div class="chat-form-container">
        <form id="chat-form" @submit.prevent>
          <input
            id="message"
            name="message"
            type="text"
            placeholder="Send a message..."
            v-model="message"
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
import firebase from 'firebase'
import Vuefire from 'vuefire'
import 'firebase/auth'
import router from '../router'
import Vuex from 'vuex'
import {db, usersCollection} from '../firebase/firebase.js'


export default {
    name: 'Messages',
    data() {
      return {
        activeClass: 'active',
        message: {
          content: '',
          currentDatabase: ''
        },
      }
    },
    components: {

    },
    methods: {
      //Fetch the current database Messages is being used in
      fetchDatabase(){

      },

      //Send message to the database the user is currently looking at
      sendMsg(){
          this.$store.dispatch('sendMsg', {
              message: this.message.content,
          })
          // this.message.content = ''
      },
        
    },

    computed: {
      currentPage(){
        return this.$route.path;
      }
    },
}
</script>

<style scoped lang="scss">
.chat-messages {
  background-color: #2C2F33;
  height: 300px;
  width: 3fr;
  padding: 30px;
	max-height: 500px;
	overflow-y: scroll;
}

.chat-form-container {
  width: 100%;
}

.chat-form-container form {
  display: flex;
}

.chat-form-container input[type='text'] {
	font-size: 16px;
	padding: 5px;
	height: 40px;
	flex: 1;
}

.btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
	font-size: 17px;
}
</style>