<template>
    <div id="chatNav">
        <router-link :to="{ name: 'ChatMessages', params: { chatID: 'general' }}"> #General </router-link>
        <router-link :to="{ name: 'ChatMessages', params: { chatID: 'programming' }}"> #Programming </router-link>
        <router-link :to="{ name: 'ChatMessages', params: { chatID: 'networking' }}"> #Networking </router-link>
        <router-link :to="{ name: 'ChatMessages', params: { chatID: 'creative' }}"> #Creative </router-link>
        <router-link :to="{ name: 'ChatMessages', params: { chatID: 'bugReport' }}"> #Bug Reports </router-link>
    </div>
    <router-view :key="$route.fullPath"/>
</template>

<script>
import Vue from 'vue'
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
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    background-color: #33436a;
    overflow-y: hidden;
    padding: 20px;
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
  h1 {
    font-weight: bold;
    font-size: 50px;
    max-height: 50px;
    color: #e8edff;
    vertical-align: middle;
    margin: 0;
  }
}
@media only screen and (max-width:680px){
  #chatNav{
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    a {
      font-weight: bold;
      font-size: 23.5px;
      max-height: max-content;
      margin: 2px;
      vertical-align: middle;
    }
    h1 {
      font-weight: bold;
      font-size: 25px;
      max-height: 30px;
      margin: 0;
    }
  }
}
</style>