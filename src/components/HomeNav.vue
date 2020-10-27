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

    background-color: #33436a;
    overflow-y: hidden;
    height: 100%;
    width: 1fr;
    padding: 30px;

  a {
    font-weight: bold;
    font-size: 25px;
    color: #18243a;
    background-color:  #92a2e2;
    border-radius: 5px;
    max-height: 100px;

    &.router-link-exact-active {
      color: #e8edff;
    }
  }
}
</style>