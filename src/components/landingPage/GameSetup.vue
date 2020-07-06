<template>
<div id="setup">
  <h3>Welcome to Program Wars!</h3>

  <div id="game-types">
    <h5 class="sub-heading" >Select Game Type</h5>
    <input type="radio" id="pick-basic" name="game-type" v-on:click="changeGame('ai')" checked>
    <label for="pick-basic"> <b>Basic:</b> Play a simpler game to reach a score limit </label>
    <br>
    <input type="radio" id="pick-agile" name="game-type" v-on:click="changeGame('free')">
    <label for="pick-agile"> <b>Agile: </b>Play to complete requirements during 3 sprints </label>
  </div>


  <div id="player-types">
    <h5 class="sub-heading" >Select Player Types</h5>
    <input type="radio" id="pick-ai" name="player-type" v-on:click="changePlayers('ai')" checked>
    <label for="pick-ai"> <b>One Bot:</b> Play against a computer player </label>
    <br>
    <input type="radio" id="pick-free" name="player-type" v-on:click="changePlayers('free')">
    <label for="pick-free"> <b>Free For All: </b>Play against 3 computer players </label>
    <br>
    <input type="radio" id="pick-hotseat" name="player-type" v-on:click="changePlayers('hotseat')">
    <label for="pick-hotseat"> <b>Hotseat: </b>Play against a friend locally </label>
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
 * Takes player information and uses it to launch a new game.
 * Setup for the game such as game type and player names.
 */
export default {
  name: 'game-setup',
  data () {
    return {
      gameType: 'basic',
      playerType: 'ai',
      sameName: false,
      bots: [
        {name: 'n00b_bot', ai: true, personality: 'standard'},
        {name: 'l33t_g34rs', ai: true, personality: 'aggresive'},
        {name: 'R0B0_vac', ai: true, personality: 'defensive'}
      ],
      players: []
    }
  },
  computed: {
    maxPlayersReached () {
      if (this.playerType === 'free') {
        return this.players.length >= 4
      }
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
      this.newGame({type: this.type, players: this.players})
    },
    changeGame (type) {
      this.gameType = type
    },
    /**
     * Removes all players except 1 human player from players and adds numBots ai players.
     * Always keeps 1 human player if needed and adds the bots after it.
     */
    addBots (numBots) {
      this.removeBots()
      if (this.players.length > 0) {
        this.players = this.players.slice(0, 1)
      }
      for (let i=0; i < numBots; i++) {
        this.players.push(this.bots[i])
      }
    },
    /**
     * Filters all ai players from player list.
     */
    removeBots () {
      this.players = this.players.filter(p => !p.ai)
    },
    /**
     * Toggle the game state and adjust the current players in the player list.
     */
    changePlayers (type) {
      if (type === 'ai') {
        this.addBots(1)
      } else if (type === 'hotseat') {
        this.removeBots()
      } else {
        this.addBots(3)
      }
      this.playerType = type
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
    /**
     * Remove a player from the player list.
     */
    removePlayer (name) {
      this.players = this.players.filter(p => p.name !== name)
    }
  },
  created () {
    // We always start in AI game mode with 1 bot
    this.players.push(this.bots[0])
  }
}
</script>


<style scoped>
#setup {
  width: 100%;
  height: 100%;
  padding: 1%;
  background-color: white;
  border-radius: 30px;
}

#player-types {
  font-size: 15px;
}

#add-players {
  font-size: 15px;
}

#current-players {
  margin-left: 25%;
  margin-right: 25%;
  font-size: 15px;
}

#go-div {
  position: relative;
}

#start-button {
  position: absolute;
  width: 150px;
  left: 50%;
  bottom: 25px;
  margin: -75px;
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

