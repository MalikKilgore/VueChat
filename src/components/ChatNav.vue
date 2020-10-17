<template>
    <div id="chatNav">
        <router-link :to="{ name: 'Messages', params: { chatID: 'programming' }}"> Programming </router-link>
        <router-link :to="{ name: 'Messages', params: { chatID: 'networking' }}"> Networking </router-link>
        <router-link :to="{ name: 'Messages', params: { chatID: 'creative' }}"> Creative </router-link>
    </div>
    <router-view />
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

//Populate this with clickable divs
//Get users. Display user.name. If router-link active, database is __
//Might be worth using dynamic routes. Files to look at are Messages.vue, ChatNav, Chatrooms, and store
//https://stackoverflow.com/questions/49944760/pass-dynamic-data-to-router-link

export default {
  name: 'ChatNav',
  methods: {

  },
}
</script>

<style scoped lang="scss">
#chatNav {
    display: grid;
    grid-auto-columns: 1;
    grid-auto-rows: 0;

    background-color: #23272A;
    overflow-y: scroll;
    height: 300px;
    width: 1fr;
    padding: 30px;
    max-height: 500px;

    &.router-link-exact-active {
      color: #e8edff;
    }
}


</style>