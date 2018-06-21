<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  /**
   * This is the main component of any vue application, this is what will be injected into the index.html file.
   */
  export default {
    name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}

body {
  min-height: 100%;
}

html,body{
  min-height:100%;
}

body {
  height: 100vh;
}
body {
  min-height: 100vh;
}
</style>
