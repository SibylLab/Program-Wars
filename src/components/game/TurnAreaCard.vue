<template>
<div id="turn-area-card" v-on:click="select">
  <img v-if="isAiTurn" src="static/cardImages/backOfCard.png" class="card">
  <img v-else :src="card.image" class="card">

  <div v-if="isShowing" id="overlays" class="shadow">
    <input type="image" id="discard-button"
       title="Discard Card"
       src="static/miscIcons/trash.png"
       v-on:click="discard">

    <div id="targets" class="popup" v-if="isAttack">
      <h5>{{ targetText }}</h5>
      <div id="button-wrapper"> 
        <button id="target-button" v-for="player in attackablePlayers()"
            v-bind:key="player.id" v-on:click="playAttack(player)">
          {{ player.name }}
        </button>
      </div>
    </div>

    <div id="play" class="popup" v-if="isSafety">
      <h5>{{ safetyText }}</h5>
      <div id="button-wrapper"> 
        <button v-if="canPlaySafety" id="safety-button" v-on:click="playSafety">
          OK
        </button>
      </div>
    </div>

  </div>

</div> 
</template>


<script>
import {mapGetters, mapMutations, mapState} from 'vuex'

export default {
  name: 'turn-area-card',
  props: ['card'],
  data () {
    return {
      type: this.card.type,
      targetText: "Targets"
    }
  },
  components: {
  },
  computed: {
    ...mapState([
      'activeCard'
    ]),
    ...mapGetters([
      'getCurrentPlayer',
    ]),
    isAiTurn () {
      return this.getCurrentPlayer.isAi
    },
    isShowing () {
      return this.activeCard === this.card && !this.isAiTurn
    },
    isAttack () {
      return this.type === "HACK" || this.type === "VIRUS"
             || this.type === "POWEROUTAGE"
    },
    isSafety () {
      return this.type === "BATTERYBACKUP" || this.type === "OVERCLOCK"
             || this.type === "FIREWALL" || this.type === "ANTIVIRUS"
             || this.type === "GENERATOR"
    },
    canPlaySafety () {
      return !this.getCurrentPlayer.helpedBy(this.type)
    },
    safetyText () {
      return this.canPlaySafety ? "Activate" : "Protected"
    }
  },
  methods: {
    ...mapGetters([
      'getAttackableOpponents',
      'getHackableOpponents'
    ]),
    ...mapMutations([
      'setActiveCard'
    ]),
    attackablePlayers () {
      let players = []
      if (this.type === "HACK") {
        players = this.getHackableOpponents()
      } else {
        players = this.getAttackableOpponents({effect: "OVERCLOCK"})
      }
      this.targetText = players.length === 1 ? "Targets" : "No Targets"
      return players
    },
    select () {
      this.setActiveCard({newCard: this.card})
    },
    // All these will have mutations or actions to call
    discard () {
      console.log("discard: " + this.card.type)
    },
    playAttack (player) {
      console.log("Play attack on: " + player.name)
    },
    playSafety () {
      console.log("Play safety: " + this.card.type)
    }
  }
}
</script>


<style scoped>
#turn-area-card {
  position: relative;
  width: 100%;
  height: 100%;
}

#overlays {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

#discard-button {
  position: absolute;
  left: -8px;
  top: -8px;
  width: 25px;
  height: 25px; 
}

#button-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
}

#target-button {
  display: block;
}

#play-button {
  display: block;
}

.card {
  max-width: 90px;
  max-height: 134px;
}

.shadow {
  -webkit-box-shadow: 0 0 24px 4px rgba(0,255,60,1);
  -moz-box-shadow: 0 0 24px 4px rgba(0,255,60,1);
  box-shadow: 0 0 24px 4px rgba(0,255,60,1);
}

.popup {
  position: absolute;
  left: -12px;
  top: 30px;
  background-color: white;
  border: solid black 2px;
  width: 114px;
  height: auto;
}
</style>

