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

/**
 * Displays a button that when clicked will show the player's cards on the screen.
 *
 * @vue-prop {Player} player - The player the details are for.
 * @vue-data {bool} showHand - True if the player's cards should be shown.
 *
 * @vue-computed {string} spyStyle - The CSS class to apply to the button to
 * change its color whether it will open or close the view of the hand.
 * @vue-computed {string} spyText - The text to show on the button, 'Spy Hand' when
 * the hand is not shown and 'Stop Spying' when the hand is being shown.
 * @vue-computed {bool} canSpy - True if the player can be spied on. I.e. has
 * the spyware effect on them.
 */
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
          && !this.game.currentPlayer().isAI
    }
  },
  methods: {
    /**
     * Toggles the state of showHand to open or close the view of the player's hand.
     */
    spy () {
      this.showHand = !this.showHand
    }
  }
}
</script>

<style scoped>
#player-area {
  position: absolute;
  top: 0;
  width: 60%;
  height: 100%;
}

#hand-box {
  position: fixed;
  width: 45%;
  height: 30%;
  top: 5%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: #333333;
  border: ridge grey 0.5rem;
  border-radius: 1rem;
  z-index: 200;
}

.spy-card {
  display: inline;
  height: 8rem;
  margin: 0 2%;
}

.acs {
  margin: 3%;
}

h3 {
  color: white;
  margin-top: 1.5%;
}
</style>
