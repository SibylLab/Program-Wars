<template>
<div id="stacks-area" :key="update" :class="{ active: isActive }"
    @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>

  <div style="display: flex;">
    <h3 id="main-func">{{ player.name }}_main:</h3>
    <h3 id="group-total" v-if="isGrouping">
      Grouped Points {{ groupedScore() }} / {{ groupCardValue }}
    </h3>
  </div>

  <ul id="stack-list">
    <li class="card-stack" v-for="stack in playerStacks" v-bind:key="stack.id">
      <button id="group-button" class="btn btn-sm btn-primary"
          v-if="canGroup(stack)" v-on:click="toggleGrouped(stack)">
        {{ groupText(stack) }}
      </button>
      <card-stack :stack="stack"></card-stack>
    </li>
  </ul>

</div>
</template>


<script>
import CardStack from '@/components/game/CardStack'
import {bus} from '@/components/shared/Bus'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'play-field',
  props: ['player'],
  data () {
    return {
      update: true,
      groupedStacks: new Set()
    }
  },
  components: {
   'card-stack': CardStack
  },
  computed: {
    ...mapState([
      'stacks',
      'activePlayer',
      'activeCard'
    ]),
    ...mapGetters([
      'getCurrentPlayerHand'
    ]),
    playerStacks () {
      return this.stacks.filter(s => s.playerId === this.player.id)
    },
    isActive () {
      return this.player === this.activePlayer
    },
    /**
     * Checks to see if the current player has selected a group card and
     * they have at least one stack that could be grouped.
     */
    isGrouping () {
      let areGroupableStacks = this.playerStacks.reduce((acc, stack) => {
        return acc || stack.getScore() <= this.groupCardValue
      }, false)
      return this.activeCard && this.activePlayer.id === this.player.id
             && this.activeCard.type === "GROUP" && areGroupableStacks
    },
    /**
     * The total number of points that can be grouped.
     */
    groupCardValue () {
      if (this.activeCard) {
        return this.activeCard.value
      }
      return 0
    }
  },
  methods: {
    ...mapActions([
      'addNewStack',
      'groupStacks'
    ]),
    /**
     * Handles events when a card is dropped in the playing feild.
     * If the card is an instruction it cannot be placed on any stacks,
     * So instead we add a new stack containing the card.
     */
    onDrop (evt) {
      let cardId = parseInt(evt.dataTransfer.getData('cardId'))
      let hand = this.getCurrentPlayerHand
      let card = hand.cards.find(c => c.id === cardId)

      if (card && this.player.id === this.activePlayer.id
          && card.type === "INSTRUCTION") {
        this.addNewStack({card: card, playerId: this.player.id})
      }
    },
    /**
     * Gives the total score of all the stacks in the current grouping.
     */
    groupedScore () {
      let grouped = Array.from(this.groupedStacks.values())
      return grouped.reduce((acc, stack) => {
        return acc + stack.getScore()
      }, 0)
    },
    /**
     * Sets the text for a the group buttons over each stack based
     * on whether the given stack has been grouped already or can be grouped.
     */
    groupText (stack) {
      if (this.groupedStacks.has(stack)) {
        return "Un-Group"
      }
      return "Group"
    },
    /**
     * Decide if the given stack can be added to the current grouping.
     * Also returns true for stacks that have been grouped so they
     * will still have buttons to un-group.
     */
    canGroup (stack) {
      if (!this.isGrouping || this.activePlayer.id !== stack.playerId) {
        return false
      }
      return this.groupedStacks.has(stack)
             || this.groupedScore() + stack.getScore() <= this.groupCardValue
    },
    /**
     * Group or un-group the given stack depending on whether it is already
     * in the groupedStacks or not.
     * If a stack is grouped and the groups total equals the group card's
     * value the cards are grouped and the players turn ends.
     */
    toggleGrouped (stack) {
      if (this.groupedStacks.has(stack)) {
        this.groupedStacks.delete(stack)
      } else {
        this.groupedStacks.add(stack)
      }
      if (this.groupedScore() === this.groupCardValue) {
        this.groupStacks({
          stacks: Array.from(this.groupedStacks.values()),
          groupCard: this.activeCard
        })
      }
      this.react()
    },
    // Causes the component to react to a change and update itself
    react () {
      this.update = !this.update
    }
  },
  created () {
    bus.$on('card-played', () => {
      this.react()
    })

    bus.$on('card-selected', () => {
      this.groupedStacks.clear()
    })
  }
}
</script>

<style scoped>
#stacks-area {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #44b863;
  border: solid black 4px;
  border-radius: 6px;
  overflow: auto;
  text-align: left;
}

#main-func {
  margin-top: 2px;
  margin-left: 5px;
  color: #fff;
}

#group-total {
  margin-left: 60px;
  margin-top: 2px;
  color: #000;
}


#group-button {
  position: absolute;
  left: 15%;
  top: 50%;
}

.card-stack {
  position: relative;
  display: inline-block;
  margin: 5px; 
}

.active {
  -webkit-box-shadow: 0 0 24px 4px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 4px rgba(0,230,0,1);
  box-shadow: 0 0 24px 4px rgba(0,0,255,1);
}

h3 {
  margin: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0 0 0 0;
  text-align: left;
}
</style>

