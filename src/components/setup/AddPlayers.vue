<template>
<div id="add-players">

  <h5 class="sub-heading"> Add Players </h5>
  <p v-if="state.mode === 'beginner'"> Add 2 players </p>
  <p v-else> Add 2 or 4 players </p>

  <input id="enter-name" type="text" :placeholder="inputPlaceholder" maxlength="10"
    v-on:keyup.enter="addPlayer" :disabled="atPlayerLimit" autofocus>

  <button type="button" class="btn btn-primary btn-sm" v-on:click="addPlayer()"
    :disabled="atPlayerLimit"> Add Human </button>

  <button type="button" class="btn btn-danger btn-sm" v-on:click="addBot()"
    :disabled="atPlayerLimit"> Add Bot </button>

  <div class='section'>
    <ol id="player-list">
      <li v-for="player in state.players" v-bind:key="player.name">
        {{ player.name }}

        <div class="tag" v-if="player.isAI"> (BOT) </div>

        <a class="remove" v-on:click="removePlayer(player.name)">
          <u>Remove</u>
        </a>
      </li>
    </ol>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'add-players',
  computed: {
    ...mapGetters(['state']),
    atPlayerLimit () {
      if (this.state.atPlayerLimit) { // to stop an error switching states
        return this.state.atPlayerLimit()
      }
      return true
    },
    inputPlaceholder () {
      return this.atPlayerLimit ? "Reached Player Limit" : " Enter Human Name..."
    }
  },
  methods: {
    addPlayer () {
      let name = $('#enter-name').val()
      this.refresh()
      if (!name) { return }

      this.state.addPlayer(name)
    },
    addBot () {
      this.state.addBot()
      this.refresh()
    },
    removePlayer (name) {
      this.state.removePlayer(name)
      this.refresh()
    },
    refresh () {
      this.state.message = ""
      $('#enter-name').val('')
      $('#enter-name').focus()
    }
  }
}
</script>

<style scoped>
#player-list {
  margin: 0 25%;
}

#enter-name{
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}

.sub-heading {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.section {
  margin: 15px;
}

.tag {
  display: inline;
  color: red;
}

.remove {
  color: blue;
  cursor: pointer;
  float: right;
}

.btn {
  margin-left: 10px;
}
</style>
