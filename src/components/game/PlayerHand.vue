<template>
<div id="player-hand">

  <div class="player-card" v-for="card in playerCards" v-bind:key="card.id">
    <img :src="cardImage(card)" class="card" v-on:mouseover="select"
      draggable v-on:dragstart="startDrag($event)" :ondragstart="canDrag">

    <div v-if="isShowing(card)" class="overlay play">
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
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'effect-card-popup': EffectCardPopup
  },
  computed: {
    playerCards () {
      return []
    },
    canDrag () {
      return false
    }
  },
  methods: {
    cardImage (card) {
      return card.image
    },
    isShowing (card) {
      return card.id
    },
    discard (card) {
      return card.id
    }
  }
}
</script>
