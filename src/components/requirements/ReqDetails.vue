<template>
<div id="req-details">

  <h3 style="margin: 5px 0px;"><b>{{ pageState.currentReq().name }}</b></h3>
  <p>{{ pageState.currentReq().description }}</p>
  <h5><b>Backlog</b></h5>
  <ol>
    <li v-for="idx in numGoals" v-bind:key="idx">
      {{ pageState.currentReq().goals[idx].goal }},
      Sprint Bonus: {{ pageState.currentReq().goals[idx].sprint }},
      End Game Bonus: {{ pageState.currentReq().goals[idx].game }}
    </li>
  </ol>

</div>
</template>

<script>
export default {
  name: 'req-details',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  computed: {
    numGoals () {
      return Array(this.pageState.currentReq().goals.length).keys()
    }
  }
}
</script>

<style scoped>
#req-details {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 5px 20px;
  text-align: left;
}

</style>
