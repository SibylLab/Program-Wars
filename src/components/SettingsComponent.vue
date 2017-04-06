<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
          </div>
          <div class="modal-body flex-container">
            <div id="addPlayer">
              <input type="text" placeholder="Add a player..." autofocus v-model="newPlayer" v-on:keyup.enter="submit">
              <button type="button" class="btn btn-primary" v-on:click="submit">Add Player</button>
            </div>
            <div id="players">
            Players So Far:
            <ol class="playerList">
              <li v-for="localPlayer in localPlayers">{{ localPlayer }}</li>
            </ol>
            </div>
            <div id="scoreSelect">
            Score to Win:
            <select class="custom-select" name="select" v-model="selected">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="submitPlayers" data-dismiss="modal">Start New Game</button>
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
        selected: '10'
      }
    },
    methods: {
      submit(e) {
        console.log(this.newPlayer)
        if(this.newPlayer.length > 0 && this.localPlayers.indexOf(this.newPlayer) < 0) {
          this.localPlayers.push(this.newPlayer)
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

//      let reload = setTimeout(() => {
//        location.reload(true)
//
//      }, 250)

      let gameEventLoopTimer = setTimeout(() => {
        $('#myModal').modal('show')

      }, 750)




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
    /*display: block;*/
    flex-shrink: 1;
    align-items: center;
  }

  select.custom-select {
    width: 30px;
    align-items: center;
  }

  .players {
    width: 50%;
  }

  a {
    color: #42b983;
  }
</style>
