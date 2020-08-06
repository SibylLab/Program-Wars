<template>
<div id="spy-accessor">

  <button id="spy-button" v-if="canSpy" :class="['acs', 'btn', 'btn-sm', spyStyle]" 
      v-on:click="spy()">
    {{ spyText }}
  </button>

  <div id="hand-box" v-if="showHand">
    <h3> {{ player.name }}'s hand </h3>
    <div style="margin-top: 3%;">
      <img v-for="card in player.hand.cards" v-bind:key="card.id"
          :src="card.image" class="spy-card" :draggable="false">
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'spy-accessor',
  props: ['player'],
  data () {
    return {
      showHand: false
    }
  },
  computed: {
    ...mapGetters(['game']),
    spyStyle () {
      return this.showHand ? 'btn-danger' : 'btn-success'
    },
    spyText () {
      return this.showHand ? 'Stop Spying' : 'Spy Hand'
    },
    canSpy () {
      return this.player.effects.hasNegative('SPYWARE', this.game.currentPlayer())
    }
  },
  methods: {
    spy () {
      this.showHand = !this.showHand
    }
  }
}
</script>

<style scoped>
#player-area {
  position: absolute;
  top: 0px;
  width: 60%;
  height: 100%;
}

#hand-box {
  position: fixed;
  width: 45%;
  height: 30%;
  min-width: 650px;
  min-height: 200px;
  top: 50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: #333333;
  border: solid grey 3px;
  border-radius: 5px;
  z-index: 200;
}

.spy-card {
  display: inline;
  width: 15%;
  height: auto;
  margin: 0 2%;
}

.acs {
  margin: 2px;
}

h3 {
  color: white;
  margin-top: 1.5%;
}
</style>
