<template>
  <div id="settingsPage">
    <rules-modal id="rulesModal" class="modal fade rules" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: yellowgreen"></rules-modal>
    <credits-modal id="creditsModal" class="modal fade credits" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: mediumpurple"></credits-modal>
    <div class="header">
      <div class="title" style="float: left">
        <h4><b>Programming Wars</b></h4>
      </div>
      <div class="headerBtn">
        <button class="btn btn-primary headerBtn" data-toggle="modal" data-target=".rules">Rules</button>
        <button class="btn btn-primary headerBtn" data-toggle="modal" data-target=".credits">Credits</button>
      </div>
    </div>
    <div class="container settingMenu">
      <div class="row">
        <div class="col-md-12">
          <h4>Welcome to a new game of Programming Wars!</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" id="addPlayer">
          <input type="text" placeholder="Add a player..." v-model="newPlayer" v-on:keyup.enter="submit" autofocus :disabled="maxPlayer">
          <button type="button" class="btn btn-primary" v-on:click="submit" :disabled="maxPlayer">Add Player</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" id="players">
          <p>Players So Far:</p>
          <ol class="playerList">
            <li v-for="(localPlayer, index) in localPlayers">{{ localPlayer }}
              <a style="cursor:pointer; color:black" @click="removePlayer(index)"><u style="font-size: x-small; margin-left: 5px">Remove</u></a></li>
          </ol>
          <p v-if="maxPlayer" style="color: red">Maximum Players Reached</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" id="scoreSelect">
          <p>Score to Win:
          <select class="custom-select" name="select" v-model="selected">
            <option value="10">Short (score 10)</option>
            <option value="20">Medium (score 20)</option>
            <option value="30">Long (score 30)</option>
          </select></p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" style="text-align: right">
          <button type="button" class="btn btn-primary" @click="submitPlayers" :disabled="noPlayers">Start New Game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import PlayerInfoPanel from './PlayerInfoPanel'
  import Playfield from './Playfield'
  import OpponentStacks from './OpponentStacks'

  import RulesModal from './RulesModal.vue'
  import CreditsModal from './CreditsModal.vue'

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
        }, 100)

      },
      removePlayer(e) {
        if(this.localPlayers[e] !== '') {
          this.localPlayers.splice(e, 1);
          if(this.localPlayers.length < 4) {
            this.maxPlayer = false;
          }
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
      },


    },
    components: {
      'player-info-panel': PlayerInfoPanel,
      'playfield': Playfield,
      'opponent-stacks': OpponentStacks,
      'rules-modal': RulesModal,
      'credits-modal': CreditsModal
    },
    beforeMount() {
      this.$store.commit('resetState');
      this.localPlayers = [];
      if(this.$store.state.players.length > 0) {
        for(let i = 0; i < this.$store.state.players.length; i++) {
          this.newPlayer = this.$store.state.players[i].name;
          this.submit();
        }
        this.$store.state.players = [];
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #settingsPage {
    background-image: url("/static/backgroundImg/helloWorld.png");
    min-height: inherit;
    min-width: inherit;
  }

  .settingMenu {
    background-color: white;
    padding:30px;
    max-width:  50%;
    min-width: 100px;
    border-radius: 30px;
    box-shadow: 2px 2px 50px 5px black;
    margin-top: 10%;

  }

  .playerList {
    list-style-position:inside;
  }

  .header {
    background-color: white;
    padding: 5px;
    padding-right:50px;
  }

  .headerBtn {
    text-align: right;
  }

  .col-md-12 {
    margin: 5px;
  }
  h1, h2 {
    font-weight: normal;
  }
  li {
    margin-right: 25px;
  }

  select.custom-select {
    width: 160px;
    align-items: center;
  }

</style>
