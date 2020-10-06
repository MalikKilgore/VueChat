<template>
  <div class="login">
    <form>
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
        <button v-on:click="createUser">
          Create
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
// import {db, userBase} from '../firebase/db.js'


export default {
  
  email: '',
  password: '',
    
  firebase: {
    email: '',
    password: '',
  },
  components: {
    
  },

  
  methods: {
    
    loginUser () {
      users.push({ email: this.email, edit: false })
    },

    createUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        alert(`Account created for ${user.email}`);
        userBase.push({ email: this.email, password: this.password, edit: false })
        this.$router.push('/home')
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