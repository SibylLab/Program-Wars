<template>
  <div class="card-overlay">
    <div id="overlay" v-if="isSelected">

      <input type="image" id="discard-button"
         title="Discard Card"
         src="static/miscIcons/trash.png"
         v-on:click="discardCard">

      <div id="targets" class="popup" v-if="isAttack">
        <h5>{{ targetsText }}</h5>
        <div id="button-wrapper">
          <button id="target-button" v-for="player in attackablePlayers"
              v-bind:key="player.id" v-on:click="playCard(player)">
            {{ player.name }}
          </button>
        </div>
      </div>

      <div id="play" class="popup" v-if="isSafety">
        <div v-if="canPlaySafety">
          <h5>Activate</h5> <!-- change this to dynamically set text like targets -->
          <div id="button-wrapper">
            <button id="safety-button" v-on:click="playSafety">
              OK
            </button>
          </div>
        </div>
        <div v-else>
          <h5>In Use</h5>
        </div>
      </div>
    </div>

    <card v-bind:cardData="card"
       v-on:cardClicked="cardClicked"
       v-on:setActiveCard="setActiveCard">
    </card>
  </div>
</template>


<script>
/* eslint-disable */
import Card from './Card'
import {mapGetters} from 'vuex'


export default {
  name: 'CardWithOverlay',
  props: ['card'],
  data () {
    return {
      type: this.card.type,
      targetsText: "Targets"
    }
  },
  components: {
    'card': Card,
  },
  computed: {
    isSelected () {
      return this.card === this.getActiveCard()
    },
    isAttack () {
      return this.type === 'VIRUS' || this.type === 'POWEROUTAGE'
    },
    /**
     * Returns a list of players that are not protected by the attack type
     * of this card. If no players are available it will change the title
     * of the target popup to "No Targets".
     */
    attackablePlayers () {
      let players = []
      for (let player of this.getPlayers()) {
        // Make sure target can be attacked
        if (player === this.getCurrentPlayer()
            || player.underAttackBy(this.type)
            || player.protectedFrom(this.type)) {
          continue
        }

        // Make sure if this is a hack that the target has one hackable stack
        if (this.type === 'H') {
          let playerStacks = this.getStacks().filter(
            s => s.playerId === player.id && s.isHackable())

          if (playerStacks.length === 0) {
            continue
          }
        }
        players.push(player)
      }

      this.targetsText = players.length > 0 ? "Targets" : "No Targets"
      return players
    },
    isSafety () {
      return (this.type === 'OVERCLOCK' || this.type === 'BATTERYBACKUP'
          || this.type === 'GENERATOR' || this.type === 'ANTIVIRUS'
          || this.type === 'FIREWALL')
    },
    canPlaySafety () {
      return !this.getCurrentPlayer().protectedBy(this.type)
    }
  },
  methods: {
    ...mapGetters([
      'getActiveCard',
      'getCurrentPlayer',
      'getPlayers',
      'getStacks'
    ]),
    cardClicked (c) {
      this.$emit('cardClicked', c)
    },
    setActiveCard (c) {
      this.$emit('setActiveCard', c)
    },
    discardCard () {
      this.$emit('discard-card')
    },
    playCard (targetPlayer) {
      this.$emit('played-card', this.card, targetPlayer)
    },
    playSafety () {
      this.playCard(this.getCurrentPlayer())
    }
  }
}
</script>


<style scoped>
#discard-button {
  position: absolute;
  left: -8px;
  top: -8px;
  width: 25px;
  height: 25px;
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
</style>
