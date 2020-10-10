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
//Get users. Display user.name.

export default {
    name: 'HomeNav',
    components: {

    }
}
</script>

<style scoped lang="scss">
#homeNav {
    background-color: #23272A;
    overflow-y: scroll;
    height: 100%;
    width: 1fr;
    padding: 30px;
	max-height: 500px;
}
</style>