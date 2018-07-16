<template>
  <div>
    <div id="basicUsage">00:00:00</div>
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
