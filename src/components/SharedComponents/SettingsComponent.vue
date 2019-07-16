<template>
  <div id="settingsPage">
    <backstory-modal id="backstoryModal" class="modal fade backstory" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"></backstory-modal>
    <themes-modal id="themesModal" class="modal fade themes" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"></themes-modal>
    <rules-modal id="rulesModal" class="modal fade rules" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: yellowgreen"></rules-modal>
    <credits-modal id="creditsModal" class="modal fade credits" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: mediumpurple"></credits-modal>
    <div class="header" :style="mainBackgroundColour()">
      <div class="title" style="float: left">
        <h4 :style="mainTextColour()"><b>Settings and Credits</b></h4>
      </div>
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
        <a href="#" data-toggle="modal" data-target=".backstory">Backstory</a>
        <a href="#" data-toggle="modal" data-target=".rules">Rules</a>
        <a href="#" data-toggle="modal" data-target=".credits">Credits</a>
        <a href="#" data-toggle="modal" data-target=".themes">Themes</a>
        <!-- <a href="#" data-toggle="modal" data-target=".backstory">Backstory</a> -->
        <a href="https://gitreports.com/issue/johnanvik/program-wars" target="_blank">Report Issue</a>
      </div>

      <!-- Use any element to open the sidenav -->
      <img @click="openNav()" src="/static/miscIcons/burgerIcon.png" style="width: 36px; height: 36px; float: right">
    </div>
    <div class="container settingMenu">
      <div class="row">
        <div class="col-md-12">
          <h4>Welcome to a new game of Programming Wars!</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" id="aiPlayers">
          <h6>Choose the number of opponents you wish to face:</h6>
          <div class="container gameTypes">
            <div class="col-md-2">
              <input type="radio" id="hotseat" name="gameType" value="hotseat" @click="checkStoredPlayers()">
              <label for="hotseat"><b>Hotseat: </b><br>Add two player names for local multiplayer</label>
            </div>
            <div class="col-md-2">
              <input type="radio" id="oneAI" name="gameType" value="oneAI" @click="addAI(1)">
              <label for="oneAI"><b>One bot: </b><br>Face off against an AI opponent in a 1v1 grudge match</label>
            </div>
            <!-- The div below is commented out because its the only version that still causes issues and I want to do a pull request for a working version tonight. Will try to fix tomorrow morning -->
            <!--<div class="col-md-2">
              <input type="radio" id="threeAI" name="gameType" value="threeAI" @click="addAI(3)">
              <label for="threeAI"><b>Three bots: </b><br>A free-for-all against 3 AI opponents</label>
            </div>-->
          </div>
          <br>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" id="addPlayer">
          <h6>Choose your player name:</h6>
          <input type="text" placeholder="Add a player..." maxlength="10" v-model="newPlayer" v-on:keyup.enter="submit" autofocus :disabled="inputDisable" style="margin-left: 20px">
          <button type="button" class="btn btn-primary" v-on:click="submit" :disabled="maxPlayer">Add Player</button>
          <p v-if="maxChar && !maxPlayer" class="infoMsg">Maximum Characters Reached</p>
          <p v-if="isRepeat && !maxPlayer" class="infoMsg">Player Already exists</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" id="players">
          <p>Players So Far:</p>
          <ol class="playerList">
            <li v-for="(localPlayer, index) in localPlayers">{{ localPlayer.name }}
              <a style="cursor:pointer; color:black" @click="removePlayer(index)"><u style="font-size: x-small; margin-left: 5px">Remove</u></a></li>
          </ol>
          <p v-if="maxPlayer" style="color: red">Maximum Players Reached</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" id="scoreSelect">
          <p>Goal: Score {{ selected }} on a path before your opponents!</p>
        </div>
      </div>
      <div id="HASH" class="row">
        <div id="HASH2" class="col-md-12" style="text-align: right">
          <button type="button" class="btn btn-primary" @click="startTutorial" data-toggle="modal" data-target=".tutorial">Take the Tutorial</button>
          <button type="button" class="btn btn-primary" @click="submitPlayers" :disabled="noPlayers">Start New Game</button>
        </div>
      </div>
      <!-- <div v-if="openBackstory === true">
        <a data-toggle="modal" data-target=".backstory"></a>
      </div> -->
    </div>
  </div>
</template>

<script>
  import BackstoryModal from '../Modals/BackstoryModal.vue'
  import RulesModal from '../Modals/RulesModal.vue'
  import CreditsModal from '../Modals/CreditsModal.vue'
  import Themes from '../Modals/ThemesModal'
  
  import {mapGetters, mapMutations, mapState} from 'vuex'

  /**
   * This is the main screen that the user sees when they go to the website.
   * It handles all of the input from the user.
   */
  export default {
    name: 'settings-component',
    data () {
      return {
        idCounter: 0,
        dataToggle: false,
        modalTitle: 'Welcome to a Program Wars!',
        localPlayers: [{name: '', isAi: false}],
        storedPlayers: [],
        newPlayer: '',
        gameStart: false,
        selected: '75',
        noPlayers: true,
        inputDisable: false,
        maxPlayer: false,
        isRepeat: false,
        aiSelect: 'noAiSelected',
        aiOpponents: ['', 'n00b_bot mk.1', 'codeMaster3000', 'sudo_bot mk.5'],
        isTutorial: false,
        tutorialBegin: false
      }
    },
    methods: {
      /**
       * The following two functions call initiate the getters and setters we need from VueX
       */
      ...mapGetters([
        'getTutorialState'
      ]),
      ...mapMutations([
        'setTutorial'
      ]),
      ...mapState([
        'mainTextColour',
        'mainBackgroundColour'
      ]),
      openNav () {
        this.sideNavOpen = !this.sideNavOpen
        if (this.sideNavOpen) {
          document.getElementById('mySidenav').style.width = '250px'
        } else {
          document.getElementById('mySidenav').style.width = '0'
        }
      },
      closeNav () {
        this.sideNavOpen = !this.sideNavOpen
        document.getElementById('mySidenav').style.width = '0'
      },
      /**
       * Called whenever the 'Add Player' button has been clicked, for the purpose of adding the player
       */
      submit () {
        let pass = true
        for (let player of this.localPlayers) {
          pass = this.repeatCheck(player).passFail
          this.isRepeat = this.repeatCheck(player).repeat
        }
        if (this.newPlayer.length > 0 && pass) {
          this.localPlayers.push({name: this.newPlayer, isAi: false})
        }
        this.numPlayersCheck()
        this.newPlayer = ''
        this.aiSelect = 'noAiSelected'
      },

      /**
       * Checks for repeat names in localPlayers
       */
      repeatCheck (player) {
        if (player.name === this.aiSelect || player.name === this.newPlayer || this.maxPlayer) {
          return {passFail: false, repeat: true}
        } else {
          return {passFail: true, repeat: false}
        }
      },

      /**
       * sets the value of maxPlayers and noPlayers
       */
      numPlayersCheck () {
        if (this.localPlayers.length >= 2) {
          this.maxPlayer = true
        }
        if (this.localPlayers.length > 1) {
          this.noPlayers = false
        }
      },

      /**
       * Start the tutorial mode with just the player and one AI
       */
      startTutorial () {
        this.isTutorial = true
        this.setTutorial({gameType: true})
        this.localPlayers = []
        this.localPlayers.push({name: 'You', isAi: false})
        this.localPlayers.push({name: 'training_bot', isAi: true})
        this.$store.commit('addPlayers', {list: this.localPlayers})
        this.$store.commit('setScoreLimit', {scoreLimit: 50})
        this.gameStart = true
        setTimeout(() => {
          this.$router.push('tutorial')
        }, 100)
      },

      /**
       * Called whenever the submit button is pressed to
       */
      submitPlayers () {
        this.$store.commit('addPlayers', {list: this.localPlayers})
        this.$store.commit('setScoreLimit', {scoreLimit: this.selected})
        this.gameStart = true

        setTimeout(() => {
          this.$router.push('game')
        }, 100)
      },

      /**
       * Called when the remove button beside a players name is called, for the purpose of removing that player.
       * @param e The player to be removed.
       */
      removePlayer (e) {
        if (this.localPlayers[e] !== '') {
          this.localPlayers.splice(e, 1)
          if (this.localPlayers.length < 2) {
            this.maxPlayer = false
          }
          if (this.localPlayers.length < 2) {
            this.noPlayers = true
          }
        } else { return }
      },

      /**
       * Automatically adds AI players according to the gameType option selected by the player
       */
      addAI (num) {
        let players = this.localPlayers
        this.clearAI()
        while (num > 0) {
          players.push({name: this.aiOpponents[num], isAi: true})
          num--
        }
        this.numPlayersCheck()
      },

      /**
       * Clears the localPlayers list of any players
       */
      clearAI () {
        let players = this.localPlayers
        if (players !== []) {
          for (let index in players) {
            if (players[index].isAi === true && players[index].name !== '') {
              this.$delete(players, index)
              this.maxPlayer = false
            } else if (players[index].isAi === false && players[index].name !== '') {
              if (isUser > 0) {
                this.storedPlayers.push(players[index].name)
                this.$delete(players, index)
                this.maxPlayer = false
              }
              isUser++
            }
          }
        }
      },
      checkStoredPlayers () {
        this.clearAI()
        for (let player in this.storedPlayers) {
          this.localPlayers.push({name: this.storedPlayers[player], isAi: false})
        }
        this.numPlayersCheck()
        this.storedPlayers = []
      }
    },
    computed: {
      currentPlayerId () {
        return this.$store.getters.getCurrentPlayerId
      },
      players () {
        return this.$store.getters.getPlayers.filter(player => player.id !== this.$store.getters.getCurrentPlayerId)
      },
      maxChar () {
        return (this.newPlayer.length >= 10)
      }
    },
    watch: {
      /**
       * This watches the AI selector dialog box and is called when it changes.
       */
      aiSelect () {
        if (this.aiSelect === 'noAiSelected' || this.aiSelect === 'none') {
          this.inputDisable = false
        } else {
          this.inputDisable = true
          this.newPlayer = ''
        }
      }
    },
    components: {
      'backstory-modal': BackstoryModal,
      'rules-modal': RulesModal,
      'credits-modal': CreditsModal,
      'themes-modal': Themes
    },
    beforeMount () {
      this.$store.commit('resetState')
      this.localPlayers = []
      if (this.$store.state.players.length > 0) {
        for (let i = 0; i < this.$store.state.players.length; i++) {
          if (this.$store.state.players[i].isAi) {
            this.aiSelect = this.$store.state.players[i].name
          } else {
            this.newPlayer = this.$store.state.players[i].name
          }
          this.submit()
        }
        this.$store.state.players = []
      }
    },
    mounted () {
      if (this.$store.state.showBackstory === true) {
        $('#backstoryModal').modal('show')
        this.$store.state.showBackstory = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .infoMsg {
    font-size: smaller;
    color: red;
    margin-top: 5px;
    margin-bottom: -10px
  }

  #HASH #HASH2{
    display: flex;
    justify-content: space-evenly;
  }

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

  .gameTypes {
    max-width: 800px;
    display: flex;
    justify-content: space-evenly;
  }

  .playerList {
    list-style-position:inside;
  }

  .header {
    background-color: white;
    padding: 5px;
    height: 45px;
    width: 100%;
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

  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.5s;
    right: 0;
  }

  .sidenav a {
    padding: 0px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
  }

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 3px;
    font-size: 36px;
    margin-left: 50px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }

</style>
