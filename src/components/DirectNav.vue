<template>
  <div id="directNav">

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
    renderList() {
      const database = usersCollection;
      const user = store.state.currentUser;
      const directNav = document.getElementById("directNav");

      this.unsubscribe = database.orderBy("name")
      .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            //ADDED USERS
            if (change.type === "added") {
              let userLink = document.createElement("a");
              userLink.setAttribute('user-id', change.doc.id)
              userLink.setAttribute('href', `/direct/${change.doc.id}`)
              userLink.addEventListener('click', function(e){
                  e.preventDefault()
                  router.push(`/direct/${change.doc.id}`)
              })
              userLink.style.fontSize = '40px'
              userLink.style.fontWeight = 'bold'
              userLink.style.maxHeight = '50px'
              userLink.style.color = '#18243a'
              userLink.style.backgroundColor = '#92a2e2'
              userLink.style.borderRadius = '5px'
              userLink.style.verticalAlign = 'middle'
              userLink.style.textDecoration = 'none'
              userLink.addEventListener('mouseover', function(e){
                userLink.style.color = '#c9ccf0'
              })
              userLink.addEventListener('mouseleave', function(e){
                userLink.style.color = '#18243a'
              })
 
              userLink.innerText = change.doc.data().name
                //Hides user database if it matches logged in user.
                if(change.doc.data().uid == user.uid){
                    return
                } else if (change.doc.data().uid != user.uid){
                    directNav.appendChild(userLink)
                }
            }
            //MODIFIED USERS
            if (change.type === "modified") {
              let userEdited = directNav.querySelector('[user-id=' + change.doc.id + ']');
              userEdited.innerText = change.doc.data().name
            }
            //DELETED USERS
            if (change.type === "removed") {
              let userDeleted = directNav.querySelector('[user-id=' + change.doc.id + ']');
              directNav.removeChild(userDeleted)
            }
          });
        });
    },
  },
  mounted(){
    this.renderList()
  },
  beforeUnmount(){
    const directNav = document.getElementById('directNav')
    directNav.innerHTML = '';
    directNav.textContent = '';
    while (directNav.lastElementChild) {
      directNav.removeChild(directNav.lastElementChild)
    };
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
  overflow-y: scroll;
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
