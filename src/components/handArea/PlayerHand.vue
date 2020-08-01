<template>
<div id="player-hand" :key="update">

  <div class="player-card" v-for="card in player.hand.cards" v-bind:key="card.id">
    <img :src="cardImage(card)" :class="['card', cardShadow(card)]"
      :draggable="canDrag(card)" v-on:dragstart="startDrag($event, card)"
      v-on:mousemove="select(card)">

    <input type="image" id="discard-button" title="Discard" v-if="isCurrentCard(card)"
       src="static/miscIcons/trash.png" v-on:click="discard(card)">

    <div class="overlay" v-if="showOverlay(card)">
      <scan-overlay v-if="isScan(card)" :card="card" :player="player"/>
      <target-overlay v-else :card="card" :player="player"/>
    </div>
  </div>

</div>
</template>

<script>
import TargetOverlay from '@/components/handArea/TargetOverlay'
import ScanOverlay from '@/components/handArea/ScanOverlay'
import { isSpecial } from '@/classes/card/cardData'
import { bus } from '@/components/shared/Bus'
import { mapGetters } from 'vuex'

export default {
  name: 'player-hand',
  props: ['player'],
  data () {
    return {
      update: true,
      active: false
    }
  },
  components: {
    'target-overlay': TargetOverlay,
    'scan-overlay': ScanOverlay
  },
  computed: {
    ...mapGetters(['state'])
  },
  methods: {
    isCurrentCard (card) {
      return this.state.currentCard === card && !this.player.isAI
    },
    isScan (card) {
      return card.type === 'SCAN'
    },
    canDrag (card) {
      return !isSpecial(card.type) && this.player.canPlay(card)
    },
    showOverlay (card) {
      return this.isCurrentCard(card) && isSpecial(card.type)
          && this.player.canPlay(card)
    },
    cardImage (card) {
      if (this.state.currentPlayer().isAI) {
        return 'static/cardImages/backOfCard.png'
      }
      return card.image
    },
    cardShadow (card) {
      if (!this.isCurrentCard(card)) {
        return ''
      }
      return this.player.canPlay(card.type) ? 'play' : 'no-play'
    },
    select (card) {
      if (!this.isCurrentCard(card)) {
        this.state.setCurrentCard(card)
        this.update = !this.update
        bus.$emit('select-card')
      }
    },
    discard (card) {
      if (!this.player.isAi) {
        this.state.takeTurn({
          type: "discardCard",
          player: this.player,
          card: card, cardOwner: this.player
        })
      }
    },
    startDrag (event, card) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('cardId', card.id)
      event.dataTransfer.setData('playerId', this.player.id)
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

.player-card {
  position: relative;
  display: inline-block;
  margin: 0.5em;
  max-width: 90px;
  max-height: 134px;
}

.card {
  max-width: 90px;
  max-height: 134px;
}

.overlay {
  position: absolute;
  top: 25%;
  left: -15%;
  width: 130%;
}

.play {
  -webkit-box-shadow: 0 0 24px 10px rgba(0,255,0,1);
  -moz-box-shadow: 0 0 24px 10px rgba(0,255,0,1);
  box-shadow: 0 0 24px 10px rgba(0,255,0,1);
}

.no-play {
  -webkit-box-shadow: 0 0 24px 10px rgba(255,0,0,1);
  -moz-box-shadow: 0 0 24px 10px rgba(255,0,0,1);
  box-shadow: 0 0 24px 10px rgba(255,0,0,1);
}
</style>
