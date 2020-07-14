<template>
<div id="add-players">

  <h5 class="sub-heading">Add Players</h5>
  <p>You can play with 2-4 players</p>

  <input id="enter-name" type="text" :placeholder="inputPlaceholder" maxlength="10"
    v-on:keyup.enter="addPlayer" :disabled="pageState.playerLimit()" autofocus>
  <button type="button" class="btn btn-primary btn-sm" v-on:click="addPlayer"
    :disabled="pageState.playerLimit()"> Add Human </button>
  <button type="button" class="btn btn-danger btn-sm" v-on:click="addBot()"
    :disabled="pageState.playerLimit()"> Add Bot </button>

  <h5 class="sub-heading">Current Players</h5>
  <ol id="player-list">
    <li v-for="player in pageState.players" v-bind:key="player.name">
      {{ player.name }}
      <div class="tag" v-if="player.isAI">(BOT)</div>
      <a class="remove" v-on:click="removePlayer(player.name)">
        <u>Remove</u>
      </a>
    </li>
  </ol>

</div>
</template>

<script>
export default {
  name: 'add-players',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  computed: {
    inputPlaceholder () {
      return this.pageState.playerLimit() ? "Reached Player Limit" : " Enter Human Name..."
    }
  },
  methods: {
    addPlayer () {
      let input = document.getElementById('enter-name')
      let name = input.value
      if (!name) { return }

      if (this.pageState.nameInUse(name)) {
        this.pageState.message = "That name is already taken"
      } else {
        this.pageState.addPlayer(name)
        this.pageState.message = ""
      }

      input.value = ''
    },
    addBot () {
      this.pageState.message = ""
      this.pageState.addBot()
    },
    removePlayer (name) {
      this.pageState.message = ""
      this.pageState.removePlayer(name)
    }
  }
}
</script>

<style scoped>
#player-list {
  margin: 0 25%;
}

.sub-heading {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.tag {
  display: inline;
  color: red;
}

.remove {
  cursor: pointer;
  float: right;
}
</style>
