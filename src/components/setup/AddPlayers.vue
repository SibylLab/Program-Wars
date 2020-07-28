<template>
<div id="add-players">

  <h5 class="sub-heading">Add Players</h5>
  <p v-if="pageState.mode === 'beginner'">Add 2 players</p>
  <p v-else>Add 2 or 4 players</p>

  <input id="enter-name" type="text" :placeholder="inputPlaceholder" maxlength="10"
    v-on:keyup.enter="addPlayer" :disabled="pageState.playerLimit()" autofocus>
  <button type="button" class="btn btn-primary btn-sm" v-on:click="addPlayer()"
    :disabled="pageState.playerLimit()"> Add Human </button>
  <button type="button" class="btn btn-danger btn-sm" v-on:click="addBot()"
    :disabled="pageState.playerLimit()"> Add Bot </button>

  <div class='section'>
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
      let name = $('#enter-name').val()
      this.refresh()
      if (!name) { return }

      this.pageState.addPlayer(name)
    },
    addBot () {
      this.pageState.addBot()
      this.refresh()
    },
    removePlayer (name) {
      this.pageState.removePlayer(name)
      this.refresh()
    },
    refresh () {
      this.pageState.message = ""
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
