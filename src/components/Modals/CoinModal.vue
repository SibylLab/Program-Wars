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
  import {mapGetters} from 'vuex'

  /**
   * This is the modal that shows which is the active side to the user at the beginning of each round.
   */
  export default {
    data () {
      return {
        totalSteps: 1
      }
    },
    methods: {
      ...mapGetters([
        'getCoinFlip',
        'getCoinMsg'
      ])
    },
    components: {
      RadialProgressBar
    },
    computed: {
      completedSteps () {
        return this.getCoinFlip()
      },
      message () {
        let lower = this.getCoinMsg().toString()
        return lower.charAt(0).toUpperCase() + lower.slice(1)
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
