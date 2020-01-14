<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <!-- 路由出口 -->
    <router-view />
    <!-- <form-example></form-example> -->
  </div>
</template>

<script>
// import formExample from '@/components/form/index'
export default {
  name: 'App',
  components: {
    // formExample
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
