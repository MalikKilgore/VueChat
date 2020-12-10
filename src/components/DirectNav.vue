<template>
  <div id="directNav">
    <img
      src="../assets/images/arrow-right-duotone.svg"
      class="expandNav"
      v-on:click="expand"
    />
    <ul class="directNavList">

    </ul>


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
    //Changes navbar opened/closed state.
    expand() {
      let chatNav = document.getElementById("chatNav");
      chatNav.classList.toggle("nav-closed");
    },
    renderList() {
      const database = usersCollection;
      const user = store.state.currentUser;
      const directNavList = document.querySelector(".directNavList");

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
              userLink.style.fontSize = '2rem'
              userLink.style.fontWeight = '500'
              userLink.style.maxHeight = '50px'
              userLink.style.color = 'black'
              userLink.style.backgroundColor = 'grey'
              userLink.style.verticalAlign = 'middle'
              userLink.style.textDecoration = 'none'
              userLink.addEventListener('mouseover', function(e){
                userLink.style.color = '#dbdbdb'
              })
              userLink.addEventListener('mouseleave', function(e){
                userLink.style.color = '#18243a'
              })
 
              userLink.innerText = change.doc.data().name
                //Hides user database if it matches logged in user.
                if(change.doc.data().uid == user.uid){
                    return
                } else if (change.doc.data().uid != user.uid){
                    directNavList.appendChild(userLink)
                }
            }
            //MODIFIED USERS
            if (change.type === "modified") {
              let userEdited = directNavList.querySelector('[user-id=' + change.doc.id + ']');
              userEdited.innerText = change.doc.data().name
            }
            //DELETED USERS
            if (change.type === "removed") {
              let userDeleted = directNavList.querySelector('[user-id=' + change.doc.id + ']');
              directNavList.removeChild(userDeleted)
            }
          });
        });
    },
  },
  mounted(){
    this.renderList()
  },
  beforeUnmount(){
    const directNavList = document.querySelector('.directNavList')
    directNavList.innerHTML = '';
    directNavList.textContent = '';
    while (directNavList.lastElementChild) {
      directNavList.removeChild(directNavList.lastElementChild)
    };
    this.unsubscribe()
  },
};
</script>

<style scoped lang="scss">
:root {
  /* border radius */
  --radius: 0.2rem;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#directNav {
  z-index: 90;
  min-width: fit-content;
  max-width: fit-content;
  background-color: #33436a;
  overflow-y: scroll;
  padding: 20px;
  grid-area: directNav;

  .expandNav {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    fill: grey;
    background-color: #e0e0e0;
    padding: 3px;
    z-index: 99;
    position: relative;
    cursor: pointer;
    transform: rotatez(-180deg);
    transition: transform 200ms ease-in-out;
    &:hover {
      background-color: #b8b8b8;
    }
  }
}

.directNavList {
  display: flex;
  flex-direction: column;
  .listItem {
    transition: all 200ms ease-in;
    list-style: none;
    padding: 1rem 1.5rem;
    border-left: 6px solid transparent;
    cursor: pointer;
    &:hover {
      background-color: grey;
    }
    a {
      display: flex;
      gap: 1rem;
      align-items: center;
      color: rgb(0, 0, 0);
      text-decoration: none;
      font-size: 2rem;
      padding: 7px;
      font-weight: 500;
      vertical-align: middle;
      &.router-link-exact-active {
        color: #dbdbdb;
        background-color: grey;
      }
      &:hover {
        color: #dbdbdb;
      }
    }
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}

//close state
.nav-closed .expandNav {
  transform: rotatez(0deg);
}
.nav-closed .listItem p {
  display: none;
}

@media only screen and (max-width: 480px) {
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
