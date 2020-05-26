<template>
  <div>
    <div id="basicUsage" class="p-3 mb-2 bg-primary text-white">00:00:00</div>
    <!--<label id='minutes'>00</label>:<label id='seconds'>00</label>-->
  </div>
</template>

<script>
import Timer from 'easytimer'
import {mapMutations} from 'vuex'

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
      'setTimer'
    ])
  },
  created () {
    let timer = new Timer()
    this.setTimer({timer: timer})
    timer.start()
    // eslint-disable-next-line no-unused-vars
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
    padding: 2px;
    margin-top: 0px;
    border: solid black 2px;
    border-radius: 5px;
    vertical-align: baseline;
  }
</style>
