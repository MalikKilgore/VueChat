<template>
  <div class="register">
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
        <button v-on:click="createUser">
          Create an account
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
import {db, usersCollection} from '../firebase/firebase.js'


export default {
  
  email: '',
  password: '',

  methods: {

    createUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        alert(`Account created for ${this.email}`);
        usersCollection.doc(`${this.email}`).set({ 
          email: this.email, 
          password: this.password, 
          edit: false })
        .then(function() {
          console.log("Document successfully written!");
        })
      })
    },
    
  }
}
</script>

<style lang="scss">
 .btn {
	padding: 5px 15px;
	background: #5CDB95;
	color: #05386B;
	border: 0;
	border-radius: 5px;
	font-size: 17px;
}
</style>