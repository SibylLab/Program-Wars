<template>
<div id="error-page">

  <div id="container">
    <h1> Oops...
        <br>
        Looks like something went wrong </h1>

    <br>
    <h2> <b>Note...</b> Using your browser's Back, Forward, and Refresh buttons
         will not work as expected on our site. Please use provided navigation
         buttons or menu links to get around. </h2>

    <button class="btn btn-primary my-btn" v-on:click="leaveGame()">
      Back To Home
    </button>

    <a class="btn btn-danger my-btn"
        href="https://gitreports.com/issue/SibylLab/Program-Wars" target="_blank">
       Report Issue 
    </a>
  </div>

</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'error-page',
  methods: {
    ...mapActions(['leaveGame'])
  }
}
</script>

<style scoped>
#error-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom right, purple, darkblue);
}

#container {
  display: inline-block;
  padding: 2%;
  margin: 5%;
  border-radius: 2rem;
  background-color: white;
}

.my-btn {
  margin: 2%;
}
</style>
