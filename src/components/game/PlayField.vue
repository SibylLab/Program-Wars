<template>
<div id="stacks-area" :key="update" :class="{ active: isActive }"
    @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>

  <div style="display: flex;">
    <h3 id="main-func">{{ player.name }}_main:</h3>
    <h3 id="group-total" v-if="isGrouping">
      Grouped Points {{ grouped.score }} / {{ groupCardValue }}
    </h3>
  </div>

  <ul id="stack-list">
    <li class="card-stack" v-for="stack in playerStacks" v-bind:key="stack.id">
      <button id="group-button" class="btn btn-sm btn-primary"
          v-if="canGroup(stack)" v-on:click="toggleGroup(stack)">
        {{ groupText(stack) }}
      </button>
      <card-stack :stack="stack"></card-stack>
    </li>
  </ul>

</div>
</template>


<script>
import GroupedStacks from '@/classes/game/GroupedStacks'
import CardStack from '@/components/game/CardStack'
import {bus} from '@/components/shared/Bus'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'play-field',
  props: ['player'],
  data () {
    return {
      update: true,
      grouped: new GroupedStacks()
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
      if (!this.activeCard || this.activePlayer.id !== this.player.id
          || this.activeCard.type !== "GROUP") {
        return false
      }
      return this.playerStacks.reduce((acc, stack) => {
        return acc || stack.getScore() <= this.groupCardValue
      }, false)
    },
    groupCardValue () {
      return this.activeCard ? this.activeCard.value : 0
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
     * Create text for the grouping button.
     */
    groupText (stack) {
      return this.grouped.hasStack(stack) ? "Un-Group" : "Group"
    },
    /**
     * Checks if a given stack can be added to the current grouping or
     * is already grouped.
     */
    canGroup (stack) {
      return this.isGrouping && (this.grouped.hasStack(stack)
             || this.grouped.score + stack.getScore() <= this.groupCardValue)
    },
    /**
     * Adds or removes the stack from the grouped stacks.
     * If the grouped stacks match the group card value does the grouping
     * and ends the player's turn.
     */
    toggleGroup (stack) {
      if (this.grouped.toggleStack(stack, this.groupCardValue)) {
        let combined = this.grouped.combine(this.activeCard)
        this.groupStacks({
          stack: combined.stack,
          cards: combined.extraCards,
          stacks: this.grouped.stacks
        })
        this.grouped.reset()
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
      this.grouped.reset()
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

#group-total {
  margin-left: 60px;
  margin-top: 2px;
  color: lightgreen;
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

