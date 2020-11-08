<template>
    <div id="siteNav">
        <router-link to="/">Home</router-link> 
        <router-link :to="{ name: 'Messages', params: { chatID: 'general' }}"> Chatrooms </router-link>
        <button class="btn" v-on:click="logout">Logout</button>
    </div>
  <router-view :key="$route.fullPath"/>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/auth'
import router from '../router'
import Vuex from 'vuex'
import {db, usersCollection} from '../firebase/firebase.js'

export default {
  name: 'SiteNav',
  methods: {
    //Log user out of application
    logout() {
        this.$store.dispatch('logout')
    },
  }
}
</script>

<style scoped lang="scss">
#siteNav {
  padding: 30px;
  background-color: #7289DA;
  text-align: center;
  grid-area: siteNav;

  a {
    font-weight: bold;
    font-size: 40px;
    color: #18243a;
    text-decoration: none;
    vertical-align: middle;
    padding: 7px;

    &.router-link-exact-active {
      color: #e8edff;
    }
    &:hover {
      color: #c9ccf0;
    }
  }
}

.btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
  font-size: 25px;
  position: fixed;
  right: 20px;
  
  &:hover {
    background: #a4a7c3;
  }
}
</style>