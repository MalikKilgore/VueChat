<template>
    <div id="chatNav">

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

//Populate this with clickable divs
//Get users. Display user.name

export default {
    name: 'ChatNav',
    components: {

    },
    methods: {

    }    
}
</script>

<style scoped lang="scss">
#chatNav {
    background-color: #23272A;
    overflow-y: scroll;
    height: 300px;
    width: 1fr;
    padding: 30px;
	max-height: 500px;
}
</style>