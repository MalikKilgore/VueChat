<template>
    <div class="chat-messages">

    </div>
    <div class="chat-form-container">
      <!--TODO: This form SUBMITS a send request. Make it so the two separate buttons don't both submit.
      chatForm is event listener. START THERE-->
      <form id="chat-form" @submit.prevent>
        <input
          id="msg"
          type="text"
          placeholder="Enter Message"
          autocomplete="off"
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
    components: {

    },
    methods: {
        sendMsg(){

        }
    },
}
</script>

<style lang="scss">
.chat-messages {
    background-color: #2C2F33;
    height: 100%;
    width: 3fr;
    padding: 30px;
	max-height: 500px;
	overflow-y: scroll;
}
</style>