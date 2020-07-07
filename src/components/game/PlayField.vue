<template>
<div id="stacks-area" :key="update"
    @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>

  <div style="display: flex;">
    <h3 id="main-func">{{ player.name }}_main:</h3>
  </div>

  <ul id="stack-list">
    <div id="method">
      <card-stack :stack="playerMethod"></card-stack>
    </div>

    <li class="card-stack" v-for="stack in playerStacks" v-bind:key="stack.id">
      <card-stack :stack="stack"></card-stack>
    </li>
  </ul>

  <div id="info-button">
    <info-popup>
      <h3 style="margin: 0">Play Field</h3>
      <p>This area is where the player plays cards to build programs.</p>
      <p>Plain instruction and method cards can be dragged to this area to start a new stack.
         Repeat and Variable cards can be dragged onto stacks that are higlighted to
         add them to the top of the stack. Variable cards can also be used to replace
         cards of lower values.</p>
      <p>Plain instruction cards can also be dragged to the method stack. The value
         of the cards is added together (max of 9). The value of the method cards will
         update when the method stack changes value.</p>
      <p>Virus cards can be dragged onto any opponent stack that is highlighted red.
         Stacks with a Virus card on top will not be able to be added to. Those
         started with instructions cards will be worth 0 points and those started with
         Method cards will be worth 50%. Virus cards can be removed with Antivirus and
         Scan cards to restore your stacks full value</p>
      <p>The scores from each stack are added up to help the player reach the score total.</p>
    </info-popup>
  </div>

</div>
</template>


<script>
import InfoPopup from '@/components/shared/InfoPopup'
import CardStack from '@/components/game/CardStack'
import {bus} from '@/components/shared/Bus'
import {mapState, mapGetters, mapActions} from 'vuex'

/**
 * A component to hold all of the players card stacks during a game.
 * Responsible for handling drop events for cards that can start new stacks
 * and calling the appropriate actions to deal with them.
 */
export default {
  name: 'play-field',
  props: ['player'],
  data () {
    return {
      update: true
    }
  },
  components: {
   'card-stack': CardStack,
   'info-popup': InfoPopup
  },
  computed: {
    ...mapState([
      'stacks',
      'activePlayer',
      'activeCard',
      'methods'
    ]),
    ...mapGetters([
      'getCurrentPlayerHand'
    ]),
    playerStacks () {
      return this.stacks.filter(s => s.playerId === this.player.id)
    },
    playerMethod () {
      return this.methods.find(m => m.playerId === this.player.id)
    }
  },
  methods: {
    ...mapActions([
      'executeTurn'
    ]),
    /**
     * Handles events when a card is dropped in the playing feild.
     * If the card is an instruction it cannot be placed on any stacks,
     * So instead we add a new stack containing the card.
     */
    onDrop (evt) {
      let cardId = evt.dataTransfer.getData('cardId')
      let hand = this.getCurrentPlayerHand
      let card = hand.cards.find(c => c.id === cardId)

      if (card && this.player.id === this.activePlayer.id
          && (card.type === "INSTRUCTION" || card.type === "METHOD")) {
        this.executeTurn({
          playType: "startNewStack",
          card: card,
          player: this.player,
          target: undefined,
        })
      }
    },
    /**
     * Causes the component to react to a change and update itself.
     */
    react () {
      this.update = !this.update
    }
  },
  created () {
    bus.$on('card-played', () => {
      this.react()
    })
  }
}
</script>


<style scoped>
#stacks-area {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #333333;
  border: ridge #a0a0a0 8px;
  border-radius: 6px;
  overflow: auto;
  text-align: left;
}

#main-func {
  margin-top: 2px;
  margin-left: 5px;
  color: #fff;
}

#info-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

#method {
  display: inline-block;
  vertical-align: top;
  background-color: #444444;
  border: solid white 3px;
  color: white;
  width: 250px;
  height: 150px;
}

.card-stack {
  position: relative;
  display: inline-block;
  margin-left: 5px;
}

h3 {
  margin: 0;
}

ul {
  list-style: none;
  margin: 0;
  margin-top: 4px;
  padding: 0 0 0 0;
  text-align: left;
}
</style>

