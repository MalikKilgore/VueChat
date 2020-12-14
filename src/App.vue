<template>
  <div id="root">
    <SiteNav></SiteNav>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import SiteNav from './components/SiteNav'
import {db, usersCollection, programChat, networkChat, 
creativeChat, generalChat, bugChat, videoRooms} from './firebase/firebase'

export default {
  name: 'App',
  components: {
    SiteNav,
  },
}
</script>

<style scoped lang="scss">
#app {
  margin: 0;
  padding: 0;
  text-align: center;
  height: 100vh;
  width: 100vw;
  align-items: center;
  overflow: hidden;
}
</style>
