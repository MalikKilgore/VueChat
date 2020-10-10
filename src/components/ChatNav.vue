<template>
    <div id="chatNav">
        <router-link id="programming" value="programming"> Programming </router-link>
    </div>
</template>

<script>
//Left side of screen navbar
import Vue, { onActivated } from 'vue'
import firebase from 'firebase'
import Vuefire from 'vuefire'
import 'firebase/auth'
import router from '../router'
import Vuex from 'vuex'
import {db, usersCollection} from '../firebase/firebase.js'
import { RouterLink } from 'vue-router'

//Populate this with clickable divs
//Get users. Display user.name. If router-link active, database is __
//Might be worth using dynamic routes. Files to look at are Messages.vue, ChatNav, Chatrooms, and store

function onActivated(RouterLink){
    switch(this.value){
        case 'programming':
            break
        case 'networking':
            break
        case 'creative':
            break
    }
};

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

    &.router-link-exact-active {
      color: #e8edff;
    }
}


</style>