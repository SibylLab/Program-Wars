<template>
<div id="game-mode">

  <h4 class="sub-heading"> Game Type </h4>

  <div class="drop-menu">
    <div class="dropdown my-drop">
      <button class="btn btn-sm btn-primary dropdown-toggle" type="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ home.mode }}
      </button>

      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button v-for="mode in getModes" v-bind:key="mode"
            v-on:click="home.changeMode(mode)" class="dropdown-item" type="button">
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
    ...mapGetters(['home']),
    getModes () {
      return ['beginner', 'standard']
    },
    describe () {
      if (this.home.mode === 'beginner') {
        return 'Play with fewer card types and easier AI'
      } else {
        return 'Play with more card types and smarter AI'
      }
    }
  }
}
</script>

<style scoped>
#game-mode {
  margin: 2%;
}

.sub-heading {
  color: black;
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.my-drop {
  margin: 1%;
}

.describe {
  margin: 1%;
}
</style>
