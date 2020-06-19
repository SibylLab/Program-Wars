<template>
<div id="stacks-area" :key="update"
    @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>

  <div style="display: flex;">
    <h3 id="main-func">{{ player.name }}_main:</h3>
    <h3 id="group-total" v-if="isGrouping">
      Grouped {{ grouped.score }}/{{ groupCardValue }}
    </h3>
  </div>

  <ul id="stack-list">
    <li class="card-stack" v-for="stack in playerStacks" v-bind:key="stack.id">
      <button id="group-button" :class="['btn', 'btn-sm', groupStyle(stack)]"
          v-if="canGroup(stack)" v-on:click="toggleGroup(stack)" :key="groupText(stack)">
        {{ groupText(stack) }}
      </button>
      <card-stack :stack="stack"></card-stack>
    </li>
  </ul>

  <div id="info-button">
    <info-popup>
      <h3 style="margin: 0">Play Field</h3>
      <p>This area is where the player plays cards to build programs.</p>
      <p>Plain instruction cards can be dragged to this area to start a new stack.
         Repeat and Variable cards can be dragged onto stacks that are higlighted to
         add them to the top of the stack. Variable cards can also be used to replace
         cards of lower values.</p>
      <p>Group cards can be used to group stacks with total points equal to the group
         card's value. The group card will replace all cards that are grouped in a single
         new stack.</p>
      <p>Hack cards can be dragged onto any opponent stack that is highlighted red
         to remove that stack from the opponents Playfield.</p>
      <p>The scores from each stack are added up to help the player reach the score total.
         If the player or the stack is affected by a negative effect the stack score
         will change to red. This means the stacks is not contributing it's full score.
         An example is the Malware card which reduces the players total score to 75% of
         its actual value.</p>
    </info-popup>
  </div>

</div>
</template>


<script>
import InfoPopup from '@/components/shared/InfoPopup'
import GroupedStacks from '@/classes/game/GroupedStacks'
import CardStack from '@/components/game/CardStack'
import {bus} from '@/components/shared/Bus'
import {mapState, mapGetters, mapActions} from 'vuex'

/**
 * A component to hold all of the players card stacks during a game.
 * Responsible for handling drop events for cards that can start new stacks
 * and calling the appropriate actions to deal with them.
 * It is also responsible for dealing with grouping cards and calling the
 * grouping action when the grouped stacks score equals a the group cards value.
 */
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
   'card-stack': CardStack,
   'info-popup': InfoPopup
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
        return acc || (stack.getScore() <= this.groupCardValue && stack.getTop().type !== 'VIRUS')
      }, false)
    },
    groupCardValue () {
      return this.activeCard ? this.activeCard.value : 0
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
          && card.type === "INSTRUCTION") {
        this.executeTurn({
          playType: "startNewStack",
          card: card,
          player: this.player,
          target: undefined,
        })
      }
    },
    // Next two functions determine the look of the group button
    groupText (stack) {
      return this.grouped.hasStack(stack) ? "Un-Group" : "Group"
    },
    groupStyle (stack) {
      return this.grouped.hasStack(stack) ? "btn-danger" : "btn-primary"
    },
    /**
     * Checks if a given stack can be added to the current grouping or
     * is already grouped.
     */
    canGroup (stack) {
      // prevent single group card stacks with the same value as group card
      // from showing up as groupable.
      if (stack.cards.length === 1 && stack.cards[0].type === "GROUP"
          && stack.cards[0].value === this.groupCardValue) {
        return false
      }
      return this.isGrouping && stack.getTop().type !== 'VIRUS'
             && (this.grouped.hasStack(stack)
                 || this.grouped.score + stack.getScore() <= this.groupCardValue)
    },
    /**
     * Adds or removes the stack from the grouped stacks.
     * If the grouped stacks match the group card value does the grouping
     * and ends the player's turn.
     */
    toggleGroup (stack) {
      if (this.grouped.toggleStack(stack, this.groupCardValue)) {
        this.executeTurn({
          playType: "groupStacks",
          card: this.activeCard,
          player: this.activePlayer,
          target: this.grouped.stacks
        })
        this.grouped.reset()
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
  margin-left: 20px;
  margin-top: 10px;
  color: lightgreen;
  font-size: 25px;
}

#group-button {
  position: absolute;
  left: 15%;
  top: 50%;
}

#info-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.card-stack {
  position: relative;
  display: inline-block;
  margin: 5px; 
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

