<template>
  <div id="directNav">
    <h1>Users:</h1>
    <router-link :to="{ name: 'directMessages', params: { directID: 'facebook' } }">
      #Facebook
    </router-link>
  </div>
  <router-view :key="$route.fullPath" />
</template>

<script>
import Vue from "vue";
import router from "../router";
import store from '../store'
import Vuex from "vuex";
import { db, usersCollection } from "../firebase/firebase.js";

export default {
  name: "DirectNav",
  data() {
    return {
      route: {
        id: this.$route.params.directID,
        path: this.$route.path,
      },
      user: {
        content: '',
        databaseStr: '',
        databasePln: null
      },
      unsubscribe: null,
    }
  },
  methods: {
    renderDOM() {
      const database = usersCollection;
      const user = store.state.currentUser;
      const directNav = document.getElementById("directNav");

      this.unsubscribe = database.orderBy("name")
      .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            //ADDED MESSAGES
            if (change.type === "added") {
              let userLink = document.createElement("a");
              userLink.setAttribute('user-id', change.doc.id)
              //userLink.setAttribute(`:to`, `"{ name: 'Messages', params: { chatID: ${change.doc.id} }}"`)
              //userLink.setAttribute('href', `/direct/${change.doc.id}`)
              userLink.addEventListener('click', function(e){
                  e.preventDefault()
                  router.push(`/direct/${change.doc.id}`)
              })
 
              userLink.innerText = change.doc.data().name


              directNav.appendChild(userLink)
            }
            //MODIFIED MESSAGES
            if (change.type === "modified") {
            }
            //DELETED MESSAGES
            if (change.type === "removed") {
            }
          });
        });
    },
  },
  mounted(){
    this.renderDOM()
  },
  beforeUnmount(){
    this.unsubscribe()
  },
};
</script>

<style scoped lang="scss">
#directNav {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  background-color: #33436a;
  overflow-y: hidden;
  padding: 20px;
  grid-area: directNav;

  a {
    font-weight: bold;
    font-size: 40px;
    max-height: 50px;
    color: #18243a;
    background-color: #92a2e2;
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
@media only screen and (max-width: 680px) {
  #directNav {
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
