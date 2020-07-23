<template>
<div id="stacks-area" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>

  <div id="main-fucntion">
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
    <play-field-info/>
  </div>

</div>
</template>


<script>
import PlayFieldInfo from '@/components/info/PlayFieldInfo'
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
      pageState: this.$store.state.pageState,
      update: true
    }
  },
  components: {
   'card-stack': CardStack,
   'play-field-info': PlayFieldInfo
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
      return this.pageState.currentPlayer().method
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


