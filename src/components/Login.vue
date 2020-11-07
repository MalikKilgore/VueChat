<template>
  <div class="login">
    <form @submit.prevent>
      <div class="form-control">
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
        <button class="btn" v-on:click="login">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/auth'
import router from '../router'
import Vuex from 'vuex'
import {db, usersCollection} from '../firebase/firebase.js'

export default {
  data() {
      return {
        email: '',
        password: '',
      }
  },

  methods: {
    login() {
      //Sends information to VueX store.
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
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