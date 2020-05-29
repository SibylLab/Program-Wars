<template>
<div id="turn-area-card" v-on:click="select">
  <img v-if="activePlayer.isAi" src="static/cardImages/backOfCard.png" class="card"> 
  <img v-else :src="card.image" class="card">

  <div v-if="isShowing" id="overlays" class="shadow">
    <input type="image" id="discard-button"
       title="Discard Card"
       src="static/miscIcons/trash.png"
       v-on:click="discardActiveCard">

    <div id="targets" class="popup" v-if="card.isAttack()">
      <h5>{{ targetText }}</h5>
      <div id="button-wrapper"> 
        <button id="target-button" class="btn btn-sm btn-primary"
            v-for="player in attackablePlayers()" v-bind:key="player.id"
            v-on:click="playSpecialCard(player)">
          {{ player.name }}
        </button>
      </div>
    </div>

    <div id="play" class="popup" v-if="card.isSafety()">
      <h5>{{ safetyText }}</h5>
      <div id="button-wrapper"> 
        <button id="safety-button" class="btn btn-sm btn-primary"
            v-if="canPlaySafety"  v-on:click="playSpecialCard(activePlayer)">
          OK
        </button>
      </div>
    </div>

  </div>

</div> 
</template>


<script>
import {bus} from '@/components/shared/Bus'
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
  computed: {
    ...mapState([
      'activeCard',
      'activePlayer'
    ]),
    isShowing () {
      return this.activeCard === this.card && !this.activePlayer.isAi
    },
    canPlaySafety () {
      return !this.activePlayer.helpedBy(this.type)
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
      'setActiveCard',
      'discardActiveCard',
      'addCardEffect'
    ]),
    /**
     * Retrieves all the players that can be attacked by the card.
     * Also, updates the text to use if there are targets or not.
     */
    attackablePlayers () {
      let players = []
      if (this.type === "HACK") {
        players = this.getHackableOpponents()
      } else {
        players = this.getAttackableOpponents({effect: this.type})
      }
      this.targetText = players.length === 1 ? "Targets" : "No Targets"
      return players
    },
    /**
     * Selects this.card as the active card.
     */
    select () {
      this.setActiveCard({newCard: this.card})
    },
    /**
     * Apply this cards affect to a player.
     * Only call when this card is a special card.
     */
    playSpecialCard (player) {
      this.addCardEffect({playerId: player.id, effect: this.type,
                          isPositive: this.isSafety})
      this.discardActiveCard()
      bus.$emit('played-effect', player.id)
    }
  },
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
  border-radius: 5px;
  width: 114px;
  height: auto;
}
</style>

