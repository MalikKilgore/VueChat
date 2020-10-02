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
        <button @click="submitEmail">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
//import firebase from 'firebase'

export default {
  
  email: '',
  id: '',
    
  /*firebase: {
    name: ''
  },
  submitEmail () {
    users.push({ email: this.email, edit: false })
  } */
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