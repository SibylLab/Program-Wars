<template>
<div id="turn-area-card" v-on:mouseover="select"
    draggable v-on:dragstart="startDrag($event)" :ondragstart="ondragstart">

  <img v-if="activePlayer.isAi" src="static/cardImages/backOfCard.png" class="card">
  <img v-else :src="card.image" class="card">

  <div v-if="isShowing" id="overlays" :class="shadow">
    <input type="image" id="discard-button"
       title="Discard Card"
       src="static/miscIcons/trash.png"
       v-on:click="discard">

    <effect-card-popup></effect-card-popup>

  </div>
</div> 
</template>


<script>
import EffectCardPopup from '@/components/game/EffectCardPopup'
import {mapMutations, mapState, mapActions} from 'vuex'

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
    'effect-card-popup': EffectCardPopup
  },
  computed: {
    ...mapState([
      'activeCard',
      'activePlayer'
    ]),
    isShowing () {
      return this.activeCard === this.card && !this.activePlayer.isAi
    },
    /**
     * Determines which css class to use for the shadow around the active card.
     */
    shadow () {
      if (this.card.type === "INSTRUCTION"
           && this.activePlayer.hurtBy("POWEROUTAGE")) {
        return 'noplay'
      }
      return 'play'
    },
    canDrag () {
      if (this.card.type === "INSTRUCTION"
          && this.activePlayer.hurtBy("POWEROUTAGE")) {
        return false
      }
      return !this.card.isSpecial()
    },
    ondragstart () {
      // The ondragstart attribute requires a string "return bool;" so here
      // we are building one to make sure special cards can't be dragged.
      return "return " + this.canDrag
    }
  },
  methods: {
    ...mapMutations([
      'setActiveCard',
      'discardActiveCard',
    ]),
    ...mapActions([
      'endTurn'
    ]),
    /**
     * Selects this.card as the active card.
     */
    select () {
      this.setActiveCard({newCard: this.card})
    },
    /**
     * Discard the activeCard and end the activePlayers turn.
     */
    discard () {
      this.discardActiveCard()
      this.endTurn({draw: true})
    },
    /**
     * Action to take when card starts being dragged.
     * Sets up the dragging event with the necessary data.
     */
    startDrag (evt) {
      if (this.canDrag) {
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('cardId', this.card.id)
      }
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

.card {
  max-width: 90px;
  max-height: 134px;
}

.play {
  -webkit-box-shadow: 0 0 24px 4px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 4px rgba(0,230,0,1);
  box-shadow: 0 0 24px 4px rgba(0,230,0,1);
}

.noplay {
  -webkit-box-shadow: 0 0 24px 3px rgba(230,0,0,0.8);
  -moz-box-shadow: 0 0 24px 3px rgba(230,0,0,0.8);
  box-shadow: 0 0 24px 3px rgba(230,0,0,0.8);
}
</style>

