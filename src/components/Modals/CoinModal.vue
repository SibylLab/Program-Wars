<template>
  <div id="coinStyle" style="top: 20%; left: 50%; margin-left: -200px;">
    <div id="background">
      <h5>The new active side is: </h5>
      <h4><b>{{ message }}</b></h4>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  /**
   * This is the modal that shows which is the active side to the user at the beginning of each round.
   */
  export default {
    methods: {
      ...mapGetters([
        'getCoinFlip',
        'getCoinMsg'
      ])
    },
    computed: {
      message () {
        let lower = this.getCoinMsg().toString()
        return lower.charAt(0).toUpperCase() + lower.slice(1)
      }
    }
  }
</script>

<style>
  #background {
    padding: 10px;
    width: 400px;
    height: 100px;
    background-color: white;
    border-radius: 30px;
  }
</style>
