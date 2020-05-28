<template>
<div id="setup">
  <h3>Welcome to Program Wars!</h3>

  <div id="game-types">
    <h5 class="sub-heading" >Select Game Type</h5>
    <div class="col-md-6">
      <input type="radio" id="pick-ai" name="game-type" v-on:click="changeGame" checked>
      <label for="oneAI">
        <b>One Bot:</b> Play against a computer player
      </label>
    </div>
    <div class="col-md-6">
      <input type="radio" id="pick-hotseat" name="game-type" v-on:click="changeGame">
      <label for="hotseat">
        <b>Hotseat: </b>Play against a friend locally
      </label>
    </div>
  </div>

  <div id="add-players">
    <h5 class="sub-heading">Add Human Players</h5>
    <input id="enter-name" type="text" :placeholder="inputPlaceholder" maxlength="10"
        v-on:keyup.enter="addPlayer" :disabled="maxPlayersReached" autofocus>
    <button type="button" class="btn btn-primary" v-on:click="addPlayer"
        :disabled="maxPlayersReached" style="margin-left: 20px;">
      Add Player
    </button>
    <p v-if="sameName"><u style="color: red;">Someone is using that name already</u></p>
  </div>

  <div id="current-players">
    <h5 class="sub-heading">Current Players</h5>
    <ol>
      <li v-for="player in players" v-bind:key="player.name"
          style="text-align: left; position: relative;">
        {{ player.name }}
        <div style="position: absolute; top: 0px; right: 8%;">
          <a style="cursor: pointer;"
              v-on:click="removePlayer(player.name)" v-if="!player.ai">
            <u style="margin-left: 20px;">Remove</u>
          </a>
          <p style="color: red;" v-else>BOT</p>
        </div>
      </li>
    </ol>
  </div>

  <div id="go-div">
    <button id="start-button" class="btn btn-primary"
        v-on:click="startGame" v-if="maxPlayersReached">
      Let's Play!
    </button>
  </div>

</div>
</template>


<script>
import {mapActions} from 'vuex'

/**
 * This component gives a player options for creating a new game. This like
 * Adding their name and playing against a bot or a friend.
 * Is responsible for passing player information to an action to start a game.
 */
export default {
  name: 'game-setup',
  data () {
    return {
      gameType: 'ai',
      sameName: false,
      noobBot: {name: 'n00b_bot', ai: true},
      players: []
    }
  },
  computed: {
    maxPlayersReached () {
      return this.players.length >= 2
    },
    inputPlaceholder () {
      return this.maxPlayersReached ? "Reached Player Limit" : " Enter Player Name..."
    }
  },
  methods: {
    ...mapActions([
      'newGame'
    ]),
    startGame () {
      this.newGame({players: this.players})
    },
    /**
     * Removes all players except 1 human player from players and adds 1 ai player.
     */
    addBot () {
      this.removeBots()
      if (this.players.length > 0) {
        this.players = this.players.slice(0, 1)
      }
      this.players.push(this.noobBot)
    },
    /**
     * Filters all ai players from players.
     */
    removeBots () {
      this.players = this.players.filter(p => !p.ai)
    },
    /**
     * Toggle the game state and adjust the current players.
     */
    changeGame () {
      if (this.gameType === 'hotseat') {
        this.gameType = 'ai'
        this.addBot()
      } else {
        this.gameType = 'hotseat'
        this.removeBots()
      }
      this.sameName = false
    },
    /**
     * Add a new human player to the game.
     * Performs some small input validation for names and ensures the player
     * order always has a human player first.
     */
    addPlayer () {
      let textInput = document.getElementById('enter-name')
      let name = textInput.value

      // Don't allow players to reuse a name
      if (this.players.find(p => p.name === name) !== undefined) {
        this.sameName = true
      // Make sure the string isn't empty
      } else if (name.length > 0) {
        // Add in different position based on game type
        if (this.gameType === 'hotseat') {
          this.players.push({name: name, ai: false})
        } else {
          this.players.unshift({name: name, ai: false})
        }
        this.sameName = false
      }
      textInput.value = ''
    },
    removePlayer (name) {
      this.players = this.players.filter(p => p.name !== name)
    }
  },
  created () {
    this.players.push(this.noobBot)  // Always start with 1 Bot
  }
}
</script>


<style scoped>
#setup {
  position: absolute;
  top: 10px;
  left: 25%;
  width: 50%;
  height: 80%;
  padding: 1%;
  background-color: white;
  border-radius: 30px;
}

#game-types {
  width: 100%;
  height: 20%;
}

#add-players {
  width: 100%;
  height: 20%;
}

#current-players {
  margin-left: 25%;
  margin-right: 25%;
  height: 20%;
}

.sub-heading {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

h3 {
 margin: 0 0;
}

ul {
  list-style: none;
  padding: 0 0 0 0;
}

input:focus {
  outline-width: 0;
}
</style>

