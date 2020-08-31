<template>
<div id="algorithm-overlay">
  <!-- CLicking play on a card that is not a mimic will set the card type so
       that isActive(type) will return true for that type. This will show the
       component to allow the player to play that card type. Adding new
       algorithm cards should include adding a new component here with
       v-if="isActive("newCardType"). -->
  <search v-if="isActive('SEARCH')" :deck="game.getDeck()"
    :card="card" :cardOwner="owner"/> 
  <sort v-if="isActive('SORT')" :deck="game.getDeck()"
    :card="card" :cardOwner="owner"/> 

  <h5> {{ titleText }} </h5>
  <button v-if="canPlay" class="btn btn-sm btn-primary my-btn" v-on:click="play()">
    Activate
  </button>

</div>
</template>


<script>
import Search from '@/components/shared/Search'
import Sort from '@/components/shared/Sort'
import { mapGetters } from 'vuex'

/**
 * The overlay that appears over a selected algorithm card with a button to
 * activate the card.
 *
 * @vue-prop {Card} card - The algorithm card to overlay.
 * @vue-prop {Player} owner - The player that the card belongs to.
 * @vue-data {string} [active=null] - The type of the active card. Used to decide if
 * a card specific component should be shown to play that card. If its value is
 * null or a card type that does not have a component above then nothing will change.
 *
 * @vue-computed {bool} canPlay - True if the card can be played.
 * @vue-computed {string} titleText - The text to show at the top of the overlay.
 * If the card can be played it is the card type, otherwise "Not Available".
 */
export default {
  name: 'algorithm-overlay',
  props: ['card', 'owner'],
  data () {
    return {
      active: null
    }
  },
  components: {
    'search': Search,
    'sort': Sort
  },
  computed: {
    ...mapGetters(['game']),
    canPlay() {
      return !this.owner.hurtBy('STACK_UNDERFLOW')
    },
    titleText () {
      return this.canPlay ? this.card.type : 'Not Available'
    }
  },
  methods: {
    /**
     * Checks if the given type is the active type.
     * @param {string} type - The type to check.
     * @return {bool} True if the type is the active type, false otherwise.
     */
    isActive (type) {
      return this.active === type
    },
    /**
     * Plays the algorithm card.

     * If the card is not a mimic the data will change to show the component
     * for playing the active card type. If the card is a mimic then the card
     * will be played as a special card which will resolve the mimic.
     */
    play () {
      if (!this.card.isMimic) {
        this.active = this.card.type
      } else {
        this.active = 'none'
        this.game.takeTurn({
          type: 'playSpecialCard',
          card: this.card, cardOwner: this.owner,
          target: this.game.currentPlayer(), targetType: 'player',
          player: this.game.currentPlayer()
        })
      }
    }
  }
}
</script>


<style scoped>
#algorithm-overlay {
  position: absolute;
  width: 100%;
  border: solid black 0.1rem;
  border-radius: 0.5rem;
  background-color: white;
  z-index: 100;
}

.my-btn {
  display: block;
  width: 96%;
  margin: 2%;
}

h5 {
  margin: 2%;
}
</style>



