<template>
    <div id="homeNav">

    </div>
    <router-view/>
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
  data() {
    return {
      dynamicParams: null,
      dynamicTo: null,
      unsubscribe: null
    }
  },
  methods: {
    fetchUserCollection(){
      this.unsubscribe = usersCollection.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {

        if (change.type === "added") {
          console.log("New user: ", change.doc.data());
          let user = document.createElement('router-link')
          user.innerHTML = change.doc.data().name

          document.getElementById(`homeNav`).appendChild(user)
        }
        if (change.type === "modified") {
          console.log("Modified user: ", change.doc.data());

        }
        if (change.type === "removed") {
          console.log("Deleted user account: ", change.doc.data());

        }

        });
      });
    }
  },
  mounted(){
    console.log('MOUNTED')
    /*this.$store.dispatch('activeRoute', {
      id: this.route.id,
      path: this.route.path
    }).then(this.fetchDatabase())
   this.renderDOM()*/
   this.fetchUserCollection()
  },

  beforeUnmount(){
    console.log('UNSUBBED')
    this.unsubscribe()
  },
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