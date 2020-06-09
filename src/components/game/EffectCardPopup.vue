<template>
<div id="effect-card-popup">

  <div id="targets" class="popup" v-if="activeCard.isAttack()">
    <h5>{{ targetText }}</h5>
    <div id="button-wrapper"> 
      <button id="target-button" class="btn btn-sm btn-primary"
          v-for="player in attackablePlayers()" v-bind:key="player.id"
          v-on:click="playSpecialCard(player)">
        {{ player.name }}
      </button>
    </div>
  </div>

  <div id="play" class="popup" v-if="activeCard.isSafety()">
    <h5>{{ safetyText }}</h5>
    <div id="button-wrapper"> 
      <button id="safety-button" class="btn btn-sm btn-primary"
          v-if="canPlaySafety"  v-on:click="playSpecialCard(activePlayer)">
        OK
      </button>
    </div>
  </div>

</div>
</template>


<script>
import {mapGetters, mapState, mapActions} from 'vuex'

export default {
  name: 'effect-card-popup',
  data () {
    return {
      targetText: "Targets"
    }
  },
  computed: {
    ...mapState([
      'activeCard',
      'activePlayer'
    ]),
    ...mapGetters([
      'getAttackableOpponents'
    ]),
    canPlaySafety () {
      return !this.activePlayer.helpedBy(this.activeCard.type)
    },
    safetyText () {
      return this.canPlaySafety ? "Activate" : "Protected"
    },

  },
  methods: {
    ...mapActions([
      'executeTurn'
    ]),
    /**
     * Retrieves all the players that can be attacked by the card.
     * Also, updates the text to use if there are targets or not.
     */
    attackablePlayers () {
      let players = this.getAttackableOpponents
      this.targetText = players.length === 1 ? "Targets" : "No Targets"
      return players
    },
    /**
     * Apply this cards affect to a given target player.
     * Only call when this card is a special card.
     * The card will be removed from the players hand and the turn will end.
     */
    playSpecialCard (target) {
      this.executeTurn({
        playType: "playSpecialCard",
        card: this.activeCard,
        player: this.activePlayer,
        target: target
      })
    }
  }
}
</script>


<style scoped>
#button-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
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
