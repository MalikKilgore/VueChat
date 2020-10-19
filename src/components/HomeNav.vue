<template>
    <div id="homeNav">

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
//Populate this with clickable user divs from usersCollection

export default {
    name: 'HomeNav',
}
</script>

<style scoped lang="scss">
#homeNav {
    display: grid;
    grid-auto-columns: 1;
    grid-auto-rows: auto;

    background-color: #23272A;
    overflow-y: scroll;
    height: 300px;
    width: 1fr;
    padding: 15px;
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