<template>
<div id="algorithm-overlay">
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
    isActive (type) {
      return this.active === type
    },
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
  border: solid black 2px;
  border-radius: 5px;
  background-color: white;
  z-index: 100;
}

.my-btn {
  display: block;
  width: 96%;
  margin: 2% 2%;
}

h5 {
  margin: 2%;
}
</style>



