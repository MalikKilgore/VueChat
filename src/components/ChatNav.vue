<template>
    <div id="chatNav">
        <router-link :to="{ name: 'Messages', params: { chatID: 'programming' }}"> Programming </router-link>
        <br>
        <router-link :to="{ name: 'Messages', params: { chatID: 'networking' }}"> Networking </router-link>
        <br>
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

export default {
  name: 'ChatNav'
}
</script>

<style scoped lang="scss">
#chatNav {
    display: grid;
    grid-auto-columns: 1;
    grid-auto-rows: auto;

    background-color: #23272A;
    overflow-y: scroll;
    height: 300px;
    width: 1fr;
    padding: 30px;
    max-height: 500px;

  a {
    font-weight: bold;
    color: #99aab5;

    &.router-link-exact-active {
      color: #e8edff;
    }
  }
}


</style>