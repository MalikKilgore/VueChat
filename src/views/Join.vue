<template>
  <div class="join-container">
    <header class="join-header">
		<h1>VueChat</h1>
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
  components: {
	Login,
	Register,
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

	h1 {
		font-size: 30px;
		margin: 2px;
	}

	a {
    font-weight: bold;
	color: #2c3e50;
	font-size: 24px;
	text-decoration: none;

    	&.router-link-exact-active {
      		color: #e8edff;
		}
    	&:hover {
      		color: #c9ccf0;
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
	margin-bottom: 2px;
	margin-top: 2px;
	font-size: 20px;
}
.join-main input [type='text'] {
	height: 40px;
	width: 100%;
	font-size: 20px;
  	border-radius: 5px;
  	background-color: #3a3c3f;
  	color: #ffffff;
	padding: 5px;
}

.join-main .btn {
	padding: 5px 15px;
	margin-top: 30px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
	font-size: 25px;
  
  &:hover {
    background: #a4a7c3;
  }
}
</style>