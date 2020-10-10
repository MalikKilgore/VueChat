<template>
  <div class="register">
    <form @submit.prevent>
      <div class="form-control">
        <label for="firstName">First name</label>
        <input
          id="firstName"
          v-model="firstName"
          type="text"
          name="firstName"
          placeholder="Enter your first name..."
          required
        >
        <label for="lastName">Last name</label>
        <input
          id="lastName"
          v-model="lastName"
          type="text"
          name="lastName"
          placeholder="Enter your last name..."
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
import firebase from 'firebase'
import Vuefire from 'vuefire'
import Vuex from 'vuex'
import 'firebase/auth'
import {db, usersCollection} from '../firebase/firebase.js'


export default {
  
  data() {
      return {
        firstName:'',
        lastName:'',
        email: '',
        password: '',
      }
  },

  methods: {

    createUser() {
        //Sends information to VueX store.
        this.$store.dispatch('createUser', {
        email: this.email,
        password: this.password,
        name: this.firstName + '  ' + this.lastName,
        title: this.title
        })
    },
    
  }
}
</script>

<style scoped lang="scss">
label {
  color: #e4ece8;
}

 .btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
	font-size: 17px;
}
</style>