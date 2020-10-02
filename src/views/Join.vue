<template>
  <div class="join-container">
    <header class="join-header">
      <h1><i class="fas fa-comments"/> Chatter</h1>
    </header>
    <main class="join-main">
      <Login></Login>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import Login from '../components/Login'

export default {
  name: 'Join',
  props: {

  },
  components: {
    Login
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
	background: #05386B;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.join-main {
	padding: 40px 50px;
	background: #379683;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
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