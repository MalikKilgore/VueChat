<template>
  <div class="join-container">
    <header class="join-header">
    	<h1>Chatter</h1>
		<router-link to="/">Login</router-link> |
		<router-link to="/join/register">Register</router-link>
    </header>
    <main class="join-main">
		<router-view/>
    </main>
	
  </div>
</template>

<script>
import Vue from 'vue'
import Login from '../components/Login'
import Register from '../components/Register'

export default {
  name: 'Join',
  props: {

  },
  components: {
	Login,
	Register
  }
}
</script>

<style lang="scss">
.join-container {
	max-width: 600px;
	margin: 250px auto;
	color: #fff;
}
.join-header {
	text-align: center;
	padding: 20px;
	background: #7289DA;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;

	a {
    font-weight: bold;
    color: #2c3e50;

    	&.router-link-exact-active {
      	color: #e8edff;
    	}
  	}
}

.join-main {
	padding: 40px 50px;
	background: #3e4247;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	font-family: Avenir, Helvetica, Arial, sans-serif;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  	text-align: center;
  	color: #2c3e50;
}
.join-main p {
	margin-bottom: 20px;
}
.join-main .form-control {
	margin-bottom: 20px;
}
.join-main label {
	display: block;
	margin-bottom: 5px;
}
.join-main input [type='text'] {
	font-size: 16px;
	padding: 5px;
	height: 40px;
	width: 100%;
}
.join-main select {
	font-size: 16px;
	padding: 5px;
	height: 40px;
	width: 100%;
}
.join-main .btn {
	margin-top: 20px;
	width: 100%;
}
</style>