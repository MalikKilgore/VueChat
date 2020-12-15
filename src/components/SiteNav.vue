<template>
    <div id="siteNav">
        <router-link to="/">
        <img src="../assets/images/newspaper-duotone.svg"/>
        Home</router-link> 
        <router-link to="/chatrooms"> 
        <img src="../assets/images/chat-teardrop-dots-duotone.svg"/>
        Chatrooms </router-link>
        <router-link to="/direct"> 
        <img src="../assets/images/users-duotone.svg"/>
        Direct </router-link>
        <button class="btn" v-on:click="logout">
          <img src="../assets/images/sign-out-duotone.svg"/>
          Logout</button>
    </div>
  <router-view :key="$route.fullPath"/>
</template>

<script>
import Vue from 'vue'
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
    font-weight: 500;
    font-size: 2.7rem;
    color: #18243a;
    text-decoration: none;
    vertical-align: middle;
    padding: 3rem;

    &.router-link-exact-active {
      color: #e8edff;
      background-color: #33436a;
    }
    &:hover {
      color: #c9ccf0;
    }
  }
  img {
      width: 2.5rem;
      height: 2.5rem;
  }
  button img {
    width: 2rem;
    height: 2rem;
  }
}

.btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
  font-size: 2rem;
  position: absolute;
  right: 1rem;
  
  &:hover {
    background: #a4a7c3;
  }
}


</style>