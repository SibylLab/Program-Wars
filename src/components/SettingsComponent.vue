<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="background-color: indianred">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
          </div>
          <div class="modal-body flex-container">
            <div id="addPlayer">
              <input type="text" placeholder="Add a player..." v-model="newPlayer" v-on:keyup.enter="submit" autofocus :disabled="maxPlayer">
              <button type="button" class="btn btn-primary" v-on:click="submit" :disabled="maxPlayer">Add Player</button>
            </div>
            <div id="players">
            Players So Far:
            <ol class="playerList">
              <li v-for="(localPlayer, index) in localPlayers">{{ localPlayer }}
                <a style="cursor:pointer; color:black" @click="removePlayer(index)"><u style="font-size: x-small; margin-left: 5px">Remove</u></a></li>
            </ol>
              <p v-if="maxPlayer" style="color: red">Maximum Players Reached</p>
            </div>
            <div id="scoreSelect">
            Score to Win:
            <select class="custom-select" name="select" v-model="selected">
              <option value="1">TESTING</option>
              <option value="10">Short (score 10)</option>
              <option value="20">Medium (score 20)</option>
              <option value="30">Long (score 30)</option>
            </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="submitPlayers" data-dismiss="modal" :disabled="noPlayers">Start New Game</button>
          </div>
        </div>
      </div>
    </div>
    </div>

</template>

<script>

  import PlayerInfoPanel from './PlayerInfoPanel'
  import Playfield from './Playfield'

  import OpponentStacks from './OpponentStacks'

  import Card from '../classes/Card'
  import Player from '../classes/Player'

  export default {
    name: 'settings-component',
    data () {
      return {
        idCounter:0,
        dataToggle: false,
        modalTitle: "Welcome to a new game of Programming Wars!",
        localPlayers: [],
        newPlayer: '',
        gameStart: false,
        selected: '10',
        noPlayers: true,
        maxPlayer: false
      }
    },
    methods: {
      submit() {
        if(this.newPlayer.length > 0 && this.localPlayers.indexOf(this.newPlayer) < 0) {
          this.localPlayers.push(this.newPlayer);
          this.noPlayers = false;
        }
        if(this.localPlayers.length >= 4) {
          this.maxPlayer = true;
        }
        this.newPlayer = ""

      },
      submitPlayers() {
        this.$store.commit('addPlayers', {list: this.localPlayers});
        this.$store.commit('setScoreLimit', {scoreLimit: this.selected})
        this.gameStart = true;

        setTimeout(() => {
          this.$router.push('game')
        }, 550)

      },
      removePlayer(e) {
        if(this.localPlayers[e] !== '') {
          this.localPlayers.splice(e, 1);
        } else
          return;

      },
      initGame(){
        this.$store.commit('initDeck');

      },
      fillHands() {
        for(let player of this.$store.getters.getPlayers) {
          this.$store.commit('addHandToPlayer', player.id)
        }
      },
      addStacksToPlayers() {
        for(let player of this.$store.getters.getPlayers) {
          this.$store.commit('addStackToPlayer', {playerId: player.id, boolSide: true})
          this.$store.commit('addStackToPlayer', {playerId: player.id, boolSide: false})
        }
      }
    },
    computed: {
      currentPlayerId() {
        return this.$store.getters.getCurrentPlayerId;
      },
      players() {
        return this.$store.getters.getPlayers.filter(player => player.id !== this.$store.getters.getCurrentPlayerId);
      }

    },
    components: {
      'player-info-panel': PlayerInfoPanel,
      'playfield': Playfield,
      'opponent-stacks': OpponentStacks
    },
    created: function () {
      this.$store.commit('resetState')
      setTimeout(() => {$('#myModal').modal('show')}, 750)
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .playerList {
    list-style-position:inside;
  }

  .flexcontainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1, h2 {
    font-weight: normal;
  }

  ol {
    padding: 0px;

  }

  .addPlayer {
    flex-shrink: 1;
    align-items: center;
  }

  select.custom-select {
    width: 160px;
    align-items: center;
  }

  .players {
    width: 50%;
  }

  a {
    color: #42b983;
  }
</style>
