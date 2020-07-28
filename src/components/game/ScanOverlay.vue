<template>
<div id="scan-overlay">

  <h5>Scan</h5>

  <button class="btn btn-sm btn-primary my-btn" v-on:click="playScan()">
    Activate
  </button>

</div>
</template>


<script>
export default {
  name: 'scan-overlay',
  props: ['card', 'player'],
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  methods: {
    playScan () {
      // if there is nothing to remove add the scan effect to the player
      // if there is something to remove open the scan modal to clear something
    }
  }
}
</script>


<style scoped>
#target-overlay {
  position: absolute;
  width: 100%;
  border: solid black 2px;
  border-radius: 5px;
  background-color: white;
  z-index: 100;
}

.my-btn {
  display: block;
  width: 96%;
  margin: 2% 2%;
}

h5 {
  margin: 2%;
}
</style>


