<template>
<div id="game-mode">

  <h5 class="sub-heading">Select Game Type</h5>

  <div class="drop-menu">
    <div class="dropdown my-drop">
      <button class="btn btn-sm btn-info dropdown-toggle" type="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ state.mode }}
      </button>

      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button v-for="mode in getModes" v-bind:key="mode"
            v-on:click="state.changeMode(mode)" class="dropdown-item" type="button">
          {{ mode }}
        </button>
      </div>
    </div>

    <div class="describe">
      {{ describe }}
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'game-mode',
  computed: {
    ...mapGetters(['state']),
    getModes () {
      return ['beginner', 'standard', 'agile']
    },
    describe () {
      if (this.state.mode === 'beginner') {
        return 'Play with fewer card types and easier AI'
      } else if (this.state.mode === 'standard') {
        return 'Play with more card types and smarter AI'
      } else {
        return 'Play to complete chosen goals with a customized deck'
      }
    }
  }
}
</script>

<style scoped>
.sub-heading {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.my-drop {
  margin: 1%;
}

.describe {
  margin: 1%;
  color: black;
}
</style>
