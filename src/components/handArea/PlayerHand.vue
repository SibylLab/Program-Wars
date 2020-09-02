<template>
<div id="player-hand" :key="update">

  <div class="player-card" v-for="card in player.hand.cards" v-bind:key="card.id">
    <img :src="cardImage(card)" :class="['card', cardShadow(card)]"
      :draggable="canDrag(card)" v-on:dragstart="startDrag($event, card)"
      v-on:mouseover="select(card)">

    <input type="image" id="discard-button" title="Discard" v-if="isCurrentCard(card)"
       src="static/miscIcons/trash.png" v-on:click="discard(card)">

    <div class="overlay" v-if="showOverlay(card)">
      <scan-overlay v-if="isScan(card.type)" :card="card" :player="player"/>
      <algorithm-overlay v-if="isAlgorithm(card.type)" :card="card" :owner="player"/>
      <target-overlay v-if="isOther(card.type)" :card="card" :player="player"/>
    </div>
  </div>

</div>
</template>

<script>
import TargetOverlay from '@/components/handArea/TargetOverlay'
import ScanOverlay from '@/components/handArea/ScanOverlay'
import AlgorithmOverlay from '@/components/handArea/AlgorithmOverlay'
import { isSpecial, isAlgorithm } from '@/classes/card/cardData'
import { bus } from '@/components/shared/Bus'
import { mapGetters } from 'vuex'

/**
 * Displays the contents of a players hand.
 *
 * @vue-prop {Player} player - The player whose hand we want to display.
 * @vue-data {bool} update - When this changes value the component will redraw itself.
 */
export default {
  name: 'player-hand',
  props: ['player'],
  data () {
    return {
      update: true,
    }
  },
  components: {
    'target-overlay': TargetOverlay,
    'scan-overlay': ScanOverlay,
    'algorithm-overlay': AlgorithmOverlay
  },
  computed: {
    ...mapGetters(['game'])
  },
  methods: {
    /**
     * Checks if the given card is the currently selected card.
     *
     * Is always false if the player is an AI.
     * @param {Card} card - The card to check.
     * @return {bool} True if the card is the current card, false otherwise.
     */
    isCurrentCard (card) {
      return this.game.currentCard === card && !this.player.isAI
    },
    /**
     * Helper to check if given card type === 'SCAN'
     * @param {string} type - The card type to check.
     * @return {bool} True if the card type is 'SCAN', false otherwise.
     */
    isScan (type) {
      return type === 'SCAN'
    },
    /**
     * Wrapper for cardData.isAlgorithm as we cannot access that function drectly
     * in the component template.
     * @param {string} type - The card type to check.
     * @return {bool} True if the card type is an algorithm type, false otherwise.
     */
    isAlgorithm (type) {
      return isAlgorithm(type)
    },
    /**
     * Checks if the given card type is any special type other than scan or algorithm.
     * @param {string} type - The card type to check.
     * @return {bool} True if the card type is a special type other than a scan or
     * an algorithm, false otherwise.
     */
    isOther (type) {
      return isSpecial(type) && !this.isScan(type) && !this.isAlgorithm(type)
    },
    /**
     * Checks if the given card can be dragged.
     *
     * Only cards that are played on stacks or the play field are draggable. Also,
     * the card must be playable to be able to be dragged.
     * @param {Card} card - The card to check.
     * @return {bool} True if the card can be dragged, false otherwise.
     */
    canDrag (card) {
      return !isSpecial(card.type) && this.player.canPlay(card)
          && !this.game.wait
    },
    /**
     * Checks whether or not a a given card should have an overlay.
     * @param {Card} card - The card to check.
     * @return {bool} True if the card is the selected card and it should show
     * an overlay.
     */
    showOverlay (card) {
      return this.isCurrentCard(card) && isSpecial(card.type)
          && this.player.canPlay(card.type) && !this.game.wait
    },
    /**
     * Gets the image path for the given card.
     * @param {Card} card - The card to get the image path for.
     * @return {string} The path to the appropriate image for the card, or back
     * of card if the current player is an AI.
     */
    cardImage (card) {
      if (this.game.currentPlayer().isAI) {
        return 'static/cardImages/backOfCard.png'
      }
      return card.image
    },
    /**
     * Determines the CSS class for the higlight to show around the card.
     * @param {Card} card - The card to check.
     * @return {string} The CSS class for putting a highlight around the card.
     * Will be '' if no shadow should be shown.
     */
    cardShadow (card) {
      if (!this.isCurrentCard(card)) {
        return ''
      }
      return this.player.canPlay(card.type) ? 'play' : 'no-play'
    },
    /**
     * Selects the given card and updates the component.
     *
     * Emits a `select-card` event indicating a new card was selected.
     * @param {Card} card - The card to select.
     */
    select (card) {
      if (!this.isCurrentCard(card) && !this.game.wait) {
        this.game.setCurrentCard(card)
        this.update = !this.update
        bus.$emit('select-card')
      }
    },
    /**
     * Takes a discard card turn for the player, discarding the given card.
     * @param {Card} card - The card to discard.
     */
    discard (card) {
      if (!this.player.isAi) {
        this.game.takeTurn({
          type: "discardCard",
          player: this.player,
          card: card, cardOwner: this.player
        })
      }
    },
    /**
     * Sets up an event for dragging a given card.
     *
     * Adds the following data members to the `event`. They can be retrieved
     * in other places with `event.dataTransfer.getData('member-name')`.
     * - `cardId` = the id of the given card.
     * - `playerId` = the id of the player who owns the card.
     *
     * @param {event} event - The event that is being added to.
     * @param {Card} card - The card being dragged.
     */
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
  left: -0.5rem;
  top: -0.5rem;
  width: 1.6rem;
  height: 1.6rem; 
}

.player-card {
  position: relative;
  display: inline-block;
  margin: 0 0.5rem;
}

.card {
  border: none;
  height: 8rem;
  width: auto;
}

.overlay {
  position: absolute;
  top: 25%;
  left: -15%;
  width: 130%;
}

.play {
  -webkit-box-shadow: 0 0 0.7rem 0.7rem rgba(0,255,0,1);
  -moz-box-shadow: 0 0 0.7rem 0.7rem rgba(0,255,0,1);
  box-shadow: 0 0 0.7rem 0.7rem rgba(0,255,0,1);
}

.no-play {
  -webkit-box-shadow: 0 0 1rem 0.7rem rgba(255,0,0,1);
  -moz-box-shadow: 0 0 1rem 0.7rem rgba(255,0,0,1);
  box-shadow: 0 0 1rem 0.7rem rgba(255,0,0,1);
}
</style>
