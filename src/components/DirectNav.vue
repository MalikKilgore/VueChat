<template>
  <div id="directNav">
    <!--
      <img
      src="../assets/images/arrow-right-duotone.svg"
      class="expandNav"
      v-on:click="expand"
      /> 
    -->
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
      let directNav = document.getElementById("directNav");
      directNav.classList.toggle("nav-closed");
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
              let listItem = document.createElement('li')
              listItem.classList = 'listItem'
              listItem.style.transition = "all 200ms ease-in"
              listItem.style.listStyle = 'none'
              listItem.style.padding = '1rem 1.5rem'
              listItem.style.borderLeft = '6px solid transparent'
              listItem.style.cursor = 'pointer'
              listItem.addEventListener('mouseover', function(e){
                listItem.style.backgroundColor = 'grey'
              })
              listItem.addEventListener('mouseleave', function(e){
                listItem.style.backgroundColor = ''
              })
 
              let paragraph = document.createElement('p')
              paragraph.innerText = change.doc.data().name

              let anchor = document.createElement("a");
              anchor.setAttribute('user-id', change.doc.id)
              anchor.setAttribute('href', `/direct/${change.doc.id}`)
              anchor.addEventListener('click', function(e){
                  e.preventDefault()
                  router.push(`/direct/${change.doc.id}`)
              })
              anchor.style.fontSize = '2rem'
              anchor.style.fontWeight = '500'
              anchor.style.maxHeight = '50px'
              anchor.style.color = 'black'
              anchor.style.verticalAlign = 'middle'
              anchor.style.textDecoration = 'none'
              anchor.addEventListener('mouseover', function(e){
                anchor.style.color = '#dbdbdb'
              })
              anchor.addEventListener('mouseleave', function(e){
                anchor.style.color = '#18243a'
              })
                //Hides user database if it matches logged in user.
                if(change.doc.data().uid == user.uid){
                    return
                } else if (change.doc.data().uid != user.uid){
                    anchor.appendChild(paragraph)
                    listItem.appendChild(anchor)
                    directNavList.appendChild(listItem)
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
