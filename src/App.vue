<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  /**
   * This is the main component of any vue application.
   * It is injected into the index.html file and contains all other pages
   * and components pushed by the router.
   */
  export default {
    name: 'app'
  }
</script>

<style>
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
