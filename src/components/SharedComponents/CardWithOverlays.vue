<template>
  <div class="card-overlay">
    <div id="overlay" v-if="isSelected">

      <input type="image" id="discard-button"
         title="Discard Card"
         src="static/miscIcons/trash.png"
         v-on:click="discardCard">
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
      type: this.card.type
    }
  },
  components: {
    'card': Card,
  },
  computed: {
    isSelected () {
      return this.card === this.getActiveCard()
    }
  },
  methods: {
    ...mapGetters([
      'getActiveCard'
    ]),
    cardClicked (c) {
      this.$emit('cardClicked', c)
    },
    setActiveCard (c) {
      this.$emit('setActiveCard', c)
    },
    discardCard () {
      this.$emit('discard-card')
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
</style>
