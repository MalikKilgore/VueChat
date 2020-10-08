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
        <button v-on:click="loginUser">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import Vuefire from 'vuefire'
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
    /*
    loginUser () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(
        alert(`Sign-in successful for ${this.email}`),
        this.$router.push('/')
      )
    }, */

    login() {
      //Sends email and password to VueX store. Will replace previous function
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped lang="scss">
 .btn {
	padding: 5px 15px;
	background: #5CDB95;
	color: #05386B;
	border: 0;
	border-radius: 5px;
	font-size: 17px;
}
</style>