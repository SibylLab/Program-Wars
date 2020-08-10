<template>
<div id="select-level">

  <h4 class="sub-heading"> Level </h4>

  <div class="drop-menu">
    <div class="dropdown my-drop">
      <button class="btn btn-sm btn-warning dropdown-toggle" type="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ home.level.name }}
      </button>

      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button v-for="level in home.getLevels()" v-bind:key="level.num"
            v-on:click="select(level)" class="dropdown-item" type="button">
          {{ level.name }}
        </button>
      </div>
    </div>

    <div class="describe">
      <span v-if="home.mode !== 'agile'"> Cards: </span>
      <span style="color: red"> {{ home.level.description }} </span>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'select-level',
  computed: {
    ...mapGetters(['home'])
  },
  methods: {
    select (level) {
      this.home.level = level
    }
  }
}
</script>

<style scoped>
#select-level {
  margin: 2vh 2vw;
}

.sub-heading {
  color: black;
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.my-drop {
  margin: 1vh 1vw;
}

.describe {
  margin: 2vh 1vw;
}
</style>

