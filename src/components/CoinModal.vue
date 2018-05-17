<template>
  <div id="coinStyle" style="top: 20%; left: 50%; margin-left: -200px;">
    <div id="background">
      <h4>Determining the Path</h4>
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
          let lower = this.$store.state.coinMsg.toString();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
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
