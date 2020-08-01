<template>
<div id="select-level">

  <h5 class="sub-heading"> Select Level </h5>

  <div class="drop-menu">
    <div class="dropdown my-drop">
      <button class="btn btn-sm btn-warning dropdown-toggle" type="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ currentLevel.name }}
      </button>

      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button v-for="level in state.getLevels()" v-bind:key="level.num"
            v-on:click="select(level)" class="dropdown-item" type="button">
          {{ level.name }}
        </button>
      </div>
    </div>

    <div class="describe">
      <span v-if="state.mode !== 'agile'" style="color: black;"> Cards: </span>
      {{ currentLevel.description }}
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'select-level',
  computed: {
    ...mapGetters(['state']),
    currentLevel () {
      if (this.state.level) { // stop error when changing pages
        return this.state.level
      }
      return { name: 'null', description: 'null' }
    },
  },
  methods: {
    select (level) {
      this.state.level = level
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
  color: red;
}
</style>

