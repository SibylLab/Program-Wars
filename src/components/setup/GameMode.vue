<template>
<div id="game-mode">

  <h5 class="sub-heading">Select Game Type</h5>

  <input type="radio" class="form-check-input" id="pick-begginer" name="game-type"
      v-on:click="pageState.changeMode('begginer')">
  <label for="pick-begginer">
    <b>Begginer:</b> Play with fewer card types and easier AI
  </label>
  <br>
  <input type="radio" class="form-check-input" id="pick-standard" name="game-type"
      v-on:click="pageState.changeMode('standard')" checked>
  <label for="pick-standard">
    <b>Standard:</b> Play with all card types and competive AI
  </label>
  <br>
  <input type="radio" class="form-check-input" id="pick-agile" name="game-type"
    v-on:click="pageState.changeMode('agile')">
  <label for="pick-agile">
    <b>Agile: </b> Play to complete chosen goals with a customized deck
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
  }
}
</script>

<style scoped>
.sub-heading {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}
</style>
