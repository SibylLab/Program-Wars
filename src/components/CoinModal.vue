<template>
  <div id="coinStyle" style="top: 20%; left: 50%; margin-left: -200px;">
    <div id="background">
      <h4>Running Instructions in {{ message }} Path</h4>
      <radial-progress-bar :diameter="200"
                           :completed-steps="completedSteps"
                           :total-steps="totalSteps"
                           style="margin-left: auto; margin-right: auto;">
        <h5>{{ message }}</h5>
      </radial-progress-bar>
    </div>
  </div>
</template>

<script>
  import RadialProgressBar from 'vue-radial-progress'
  export default {
    data () {
      return {
        totalSteps: 1,
      }
    },
    components: {
      RadialProgressBar
    },
    computed: {
        completedSteps() {
          return this.$store.state.coinFlip;
        },
      message() {
          return this.$store.state.coinMsg;
      }
    }
  }
</script>

<style>
  #background {
    padding: 50px;
    width: 400px;
    height: 400px;
    background-color: white;
    border-radius: 30px;
  }
</style>
