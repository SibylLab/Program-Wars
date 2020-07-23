<template>
<div id="player-hand" :key="update">

  <div class="player-card" v-for="card in this.player.hand" :key="card.id">
    <img :src="cardImage(card)" :class="['card', { play: isActiveCard(card) }]"
      :draggable="canDrag" v-on:dragstart="startDrag($event, card)"
      v-on:mouseover="select(card)">

    <div v-if="isShowing(card)" class="overlay">
      <input type="image" id="discard-button" title="Discard Card"
         src="static/miscIcons/trash.png" v-on:click="discard(card)">

      <effect-card-popup/>
    </div>
  </div>

</div>
</template>

<script>
import EffectCardPopup from '@/components/game/EffectCardPopup'

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
    'effect-card-popup': EffectCardPopup
  },
  computed: {
    canDrag () {
      return false
    }
  },
  methods: {
    select (card) {
      this.pageState.currentCard = card
      this.update = !this.update
    },
    isActiveCard (card) {
      return this.pageState.currentCard === card
    },
    cardImage (card) {
      return card.image
    },
    isShowing (card) {
      card
      return false
    },
    discard (card) {
      console.log(card)
    },
    startDrag (event, card) {
      event
      card
      console.log('drag')
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
  top: 0;
  width: 100%;
  height: 100%;
}


.play {
  -webkit-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  box-shadow: 0 0 24px 8px rgba(0,230,0,1);
}
</style>
