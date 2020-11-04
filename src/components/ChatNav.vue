<template>
    <div id="chatNav">
        <router-link :to="{ name: 'Messages', params: { chatID: 'programming' }}"> Programming </router-link>
        <br>
        <router-link :to="{ name: 'Messages', params: { chatID: 'networking' }}"> Networking </router-link>
        <br>
        <router-link :to="{ name: 'Messages', params: { chatID: 'creative' }}"> Creative </router-link>
    </div>
    <router-view :key="$route.fullPath"/>
</template>

<script>
//Left side of screen navbar
import Vue from 'vue'
import firebase from 'firebase'
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
    //grid-auto-columns: 1;
    //grid-auto-rows: auto;

    background-color: #33436a;
    overflow-y: hidden;
    //height: 100%;
    //width: 1fr;
    padding: 30px;
    grid-area: chatNav;

  a {
    font-weight: bold;
    font-size: 40px;
    max-height: 50px;
    color: #18243a;
    background-color:  #92a2e2;
    border-radius: 5px;
    vertical-align: middle;
    text-decoration: none;

    &.router-link-exact-active {
      color: #e8edff;
    }
    &:hover {
      color: #c9ccf0;
    }
  }
}


</style>