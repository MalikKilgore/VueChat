<template>
  <div id="chatNav">
    <img
      src="../assets/images/arrow-right-duotone.svg"
      class="expandNav"
      v-on:click="expand"
    />
    <ul class="chatNavList">
      <li class="listItem">
        <router-link
          :to="{ name: 'ChatMessages', params: { chatID: 'general' } }"
        >
          <img src="../assets/images/newspaper-duotone.svg"/>
          <p>General</p>
        </router-link>
      </li>

      <li class="listItem">
        <router-link
          :to="{ name: 'ChatMessages', params: { chatID: 'programming' } }"
        >
          <img src="../assets/images/desktop-tower-duotone.svg"/>
          <p>Programming</p>
        </router-link>
      </li>

      <li class="listItem">
        <router-link
          :to="{ name: 'ChatMessages', params: { chatID: 'networking' } }"
        >
          <img src="../assets/images/handshake-duotone.svg"/>
          <p>Networking</p>
        </router-link>
      </li>

      <li class="listItem">
        <router-link
          :to="{ name: 'ChatMessages', params: { chatID: 'creative' } }"
        >
          <img src="../assets/images/lightbulb-duotone.svg"/>
          <p>Creative</p>
        </router-link>
      </li>

      <li class="listItem">
        <router-link
          :to="{ name: 'ChatMessages', params: { chatID: 'bugReport' } }"
        >
          <img src="../assets/images/note-pencil-duotone.svg"/>
          <p>Bug Reports</p>
        </router-link>
      </li>
    </ul>
  </div>
  <router-view :key="$route.fullPath" />
</template>

<script>
import Vue from "vue";
import router from "../router";
import Vuex from "vuex";
import { db, usersCollection } from "../firebase/firebase.js";

export default {
  name: "ChatNav",
  methods: {
    //Changes navbar opened/closed state.
    expand() {
      let chatNav = document.getElementById("chatNav");
      chatNav.classList.toggle("nav-closed");
    },
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

#chatNav {
  z-index: 90;
  background-color: #33436a;
  overflow: hidden;
  padding: 20px;
  min-width: fit-content;
  max-width: fit-content;
  grid-area: chatNav;
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

.chatNavList {
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
  #chatNav {
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
