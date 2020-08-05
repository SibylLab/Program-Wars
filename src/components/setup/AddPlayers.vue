<template>
<div id="add-players">

  <h4 class="sub-heading"> Players </h4>
  <p style="color: red;"> {{ howManyPlayers }} </p>

  <input id="enter-name" type="text" :placeholder="inputPlaceholder" maxlength="10"
    v-on:keyup.enter="addPlayer" :disabled="home.atPlayerLimit()" autofocus>

  <button type="button" class="btn btn-info btn-sm" v-on:click="addPlayer()"
    :disabled="home.atPlayerLimit()"> Add Human </button>

  <button type="button" class="btn btn-danger btn-sm" v-on:click="addBot()"
    :disabled="!canAddBot"> Add Bot </button>

  <div class='section'>
    <ol id="player-list">
      <li v-for="player in home.players" v-bind:key="player.name">
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
import { bus } from '@/components/shared/Bus'
import { mapGetters } from 'vuex'

export default {
  name: 'add-players',
  computed: {
    ...mapGetters(['home']),
    howManyPlayers () {
      return 'add 2 players'
    },
    inputPlaceholder () {
      return this.home.atPlayerLimit() ? "Reached Player Limit" : " Enter Human Name..."
    },
    canAddBot () {
      // will need to be adjusted if more than 2 players are allowed
      return !this.home.atPlayerLimit() && !this.home.hasBot()
    }
  },
  methods: {
    addPlayer () {
      let name = $('#enter-name').val()
      this.refresh()

      if (!name) {
        this.home.message = 'Please enter a name'
        return
      }

      this.home.addPlayer(name)
    },
    addBot () {
      this.home.addBot()
      this.refresh()
    },
    removePlayer (name) {
      this.home.removePlayer(name)
      this.refresh()
    },
    refresh () {
      this.home.message = ""
      $('#enter-name').val('')
      $('#enter-name').focus()
    },
    removeBots () {
      this.home.removeBots()
    }
  },
  created () {
    bus.$on('change-mode', this.removeBots)
  },
  beforeDestroy() {
    bus.$off('change-mode', this.removeBots)
  }
}
</script>

<style scoped>
#add-players {
  margin: 2%;
}

#player-list {
  margin: 0 25%;
}

#enter-name{
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}

.sub-heading {
  color: black;
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
