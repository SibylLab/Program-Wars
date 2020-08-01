<template>
<div id="game-mode">

  <h5 class="sub-heading">Select Game Type</h5>

  <input type="radio" class="form-check-input" id="beginner" name="game-type"
      v-on:click="state.changeMode('beginner')">
  <label for="beginner">
    <b>Beginner:</b> Play with fewer card types and easier AI
  </label>
  <br>
  <input type="radio" class="form-check-input" id="standard" name="game-type"
      v-on:click="state.changeMode('standard')">
  <label for="standard">
    <b>Standard:</b> Play with more card types and smarter AI
  </label>
  <br>
  <input type="radio" class="form-check-input" id="agile" name="game-type"
    v-on:click="state.changeMode('agile')">
  <label for="agile">
    <b>Agile: </b> Play to complete chosen goals with a customized deck
  </label>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'game-mode',
  data () {
    return {
      checked: 'beginner'
    }
  },
  computed: {
    ...mapGetters(['state'])
  },
  mounted () {
    this.state.mode === this.checked
    $('#' + this.checked).prop('checked', true)
  }
}
</script>

<style scoped>
.sub-heading {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}
</style>
