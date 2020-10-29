<template>
  <div class="passReset">
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
        <button class="btn" v-on:click="resetPassword">
          Send Reset E-mail
        </button>
      </div>
    </form>
  </div>    
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import Vuex from 'vuex'
import 'firebase/auth'


export default {
  data() {
    return {
      email: '',
      showSuccess: false
    }
  },
  methods: {
    async resetPassword() {
      // reset logic
    }
  },

}
</script>

<style scoped lang="scss">
 .btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
	font-size: 17px;
}
</style>