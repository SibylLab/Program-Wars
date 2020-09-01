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

/**
 * Allows user to add players during game setup.
 *
 * Only allows 2 players total right now and only 1 can be an AI.
 * The home state keeps track of all of the player information so this component
 * only interacts with that page state. The component displays the player list
 * and calls page state methods to add and remove players. These methods will
 * actually do any work updating the state or validating the data given to them.
 * The methods in this component work mostly as callbacks that refresh the input
 * box after passing the data on to the state.
 *
 * @vue-computed {string} howManyPlayers - A string indicating how many
 * players can be added total.
 * @vue-computed {string} inputPlaceholder - The string to show in the player
 * name input box when there is not name in it. Changes when the max number of
 * players has been reached.
 * @vue-computed {bool} canAddBot - True if an AI player can be added.
 */
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
    /**
     * Adds a human player to the list of players if a name was entered.
     *
     * The addition of the player will be validated by the page state.
     */
    addPlayer () {
      let name = $('#enter-name').val()
      this.refresh()

      if (!name) {
        this.home.message = 'Please enter a name'
        return
      }

      this.home.addPlayer(name)
    },
    /**
     * Adds an AI player to the list of players.
     *
     * The addition of the bot will be validated by the page state.
     */
    addBot () {
      this.home.addBot()
      this.refresh()
    },
    /**
     * Removes a player with the given name from the list of players.
     * @param {string} name - The name of the player to remove.
     */
    removePlayer (name) {
      this.home.removePlayer(name)
      this.refresh()
    },
    /**
     * Clears the home state's message and the player name input box, and sets
     * focus back to the input so that players can add more names without having
     * to click it again.
     */
    refresh () {
      this.home.message = ""
      $('#enter-name').val('')
      $('#enter-name').focus()
    }
  },
  created () {
    // Add a listener to remove all AI players when mode is changed
    bus.$on('change-mode', this.home.removeBots)
  },
  beforeDestroy() {
    // Remove listener when component is destroyed
    bus.$off('change-mode', this.home.removeBots)
  }
}
</script>

<style scoped>
#add-players {
  margin: 0.5rem 1rem;
}

#player-list {
  margin: 0 25%;
  padding: 0;
}

#enter-name{
  border: none;
  border-bottom: 0.1vh solid black;
  outline: none;
}

.sub-heading {
  color: black;
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.section {
  margin: 0.5rem 1rem;
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
  margin-left: 1rem;
}
</style>
