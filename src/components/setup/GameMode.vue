<template>
<div id="game-mode">

  <h5 class="sub-heading">Select Game Type</h5>

  <input type="radio" class="form-check-input" id="pick-basic" name="game-type"
      v-on:click="changeMode('basic')" checked>
  <label for="pick-basic">
    <b>Basic:</b> Play a simpler game to reach a score limit
  </label>
  <br>
  <input type="radio" class="form-check-input" id="pick-agile" name="game-type"
    v-on:click="changeMode('agile')">
  <label for="pick-agile">
    <b>SDLC: </b>Play to complete requirements during 3 sprints
  </label>

</div>
</template>

<script>
export default {
  name: 'game-mode',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  methods: {
    changeMode (newMode) {
      this.pageState.mode = newMode
    }
  }
}
</script>

<style scoped>
.sub-heading {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}
</style>
