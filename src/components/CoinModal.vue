<template>

  <div style="text-align: center; background-color: white">
    <div id="background">
      <h3>Active Side is: </h3>
      <radial-progress-bar :diameter="200"
                           :completed-steps="completedSteps"
                           :total-steps="totalSteps"
                           style="margin-left: auto; margin-right: auto;">
        <!--<h5>{{ message }}</h5>-->
      </radial-progress-bar>
    </div>
  </div>
</template>

<script>
  import RadialProgressBar from 'vue-radial-progress'
  export default {
//    props: ['message', 'completedSteps'],
    data () {
      return {
//        completedSteps: 0,
        totalSteps: 1,
      }
    },
    components: {
      RadialProgressBar
    },
    computed: {
        completedSteps() {
          console.log(this.$store.state.coinFlip);
          return this.$store.state.coinFlip;
        }
    }
  }
</script>

<style>

</style>
