<template>
  <div class="register">
    <form @submit.prevent>
      <div class="form-control">
        <label for="userName">Username</label>
        <input
          id="userName"
          v-model="userName"
          type="text"
          name="userName"
          placeholder="Enter your username..."
          required
        >
        <label for="email">E-mail</label>
        <input
          id="email"
          v-model="email"
          type="text"
          name="email"
          placeholder="Enter your e-mail address..."
          required
        >
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="text"
          name="password"
          placeholder="Enter your password..."
          required
        >
        <button class="btn" v-on:click="createUser">
          Create account
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import 'firebase/auth'
import {db, usersCollection} from '../firebase/firebase.js'


export default {
  
  data() {
      return {
        userName: '',
        email: '',
        password: '',
      }
  },

  methods: {
    createUser() {
        //Sends user information to VueX store.
        this.$store.dispatch('createUser', {
        email: this.email,
        password: this.password,
        name: this.userName,
        title: this.title
        })
    },
    
  }
}
</script>

<style scoped lang="scss">
label {
  color: #e4ece8;
  font-weight: bold;
	text-align: center;
}

input {
  display: flex;
  font-size: 20px;
	padding: 5px;
	height: 40px;
  width: 100%;
	flex: 1;
}

 .btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
  font-size: 17px;
  &:hover {
    background: #a4a7c3;
  }
}
</style>