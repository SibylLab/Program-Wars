<template>
<div id="player-hand" :key="update">

  <div class="player-card" v-for="card in this.player.hand" :key="card.id">
    <img :src="cardImage(card)" :class="['card', cardShadow(card)]"
      :draggable="canDrag(card)" v-on:dragstart="startDrag($event, card)"
      v-on:mouseover="select(card)">

    <input type="image" id="discard-button" title="Discard Card" v-if="isActiveCard(card)"
       src="static/miscIcons/trash.png" v-on:click="discard(card)">

    <div class="overlay" v-if="showOverlay(card)">
      <target-overlay :card="card" :player="player"/>
    </div>
  </div>

</div>
</template>

<script>
import TargetOverlay from '@/components/game/TargetOverlay'
import { bus } from '@/components/shared/Bus'

export default {
  name: 'player-hand',
  props: ['player'],
  data () {
    return {
      pageState: this.$store.state.pageState,
      update: true
    }
  },
  components: {
    'target-overlay': TargetOverlay
  },
  methods: {
    canDrag (card) {
      return !card.isSpecial() && this.pageState.canPlayCard(card)
    },
    select (card) {
      this.pageState.currentCard = card
      this.update = !this.update
      bus.$emit('select-card')
    },
    isActiveCard (card) {
      return this.pageState.currentCard === card
    },
    showOverlay (card) {
      return this.isActiveCard(card) && card.isSpecial()
    },
    cardImage (card) {
      if (this.pageState.currentPlayer().isAi) {
        return 'static/cardImages/backOfCard.png'
      }
      return card.image
    },
    cardShadow (card) {
      if (!this.isActiveCard(card)) {
        return ''
      }
      return this.pageState.canPlayCard(card) ? 'play' : 'no-play'
    },
    discard (card) {
      if (!this.player.isAi) {
        this.pageState.takeTurn({
          type: "discardCard", player: this.player, card: card,
          cardOwner: this.player
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
