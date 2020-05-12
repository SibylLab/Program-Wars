<template>
  <div>
    <div id="basicUsage" class="p-3 mb-2 bg-primary text-white">00:00:00</div>
    <!--<label id='minutes'>00</label>:<label id='seconds'>00</label>-->
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import Timer from 'easytimer'
  export default {
    data () {
      return {
        minutesLabel: undefined,
        secondsLabel: undefined,
        timer: undefined
      }
    },
    methods: {
      ...mapMutations([
        'setTimerInterval'
      ])
    },
    created () {
      let timer = new Timer()
      this.setTimerInterval(timer)
      timer.start()
      timer.addEventListener('secondsUpdated', function (e) {
        $('#basicUsage').html(timer.getTimeValues().toString())
      })
    }
  }
</script>

<style scoped>
  #basicUsage {
    font-size: 13px;
    text-decoration: blue;
    padding: 5px;
    margin-top: 0px;
    border: solid black 2px;
    border-radius: 5px;
    vertical-align: baseline;
  }
</style>
