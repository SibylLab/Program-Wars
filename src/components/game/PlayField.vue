<template>
<div id="stacks-area" :key="update" :class="{ active: isActive }"
    @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
  <div style="display: flex;">
    <h3 id="main-func">{{ player.name }}_main:</h3>
    <h3 id="group-total" v-if="isGroup">
      Grouped Points {{ groupedScore() }} / {{ groupCardSize }}
    </h3>
  </div>
  <ul id="stack-list">
    <li class="card-stack" v-for="stack in playerStacks" v-bind:key="stack.id">
      <button id="group-button" class="btn btn-sm btn-primary"
          v-if="canGroup(stack)" v-on:click="toggleGrouped(stack)">{{ groupText(stack) }}</button>
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
    isGroup () {
      return this.activeCard && this.activePlayer.id === this.player.id
             && this.activeCard.type === "GROUP"
    },
    groupCardSize () {
      if (this.activeCard !== undefined) {
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
    groupedScore () {
      let grouped = Array.from(this.groupedStacks.values())
      return grouped.reduce((acc, stack) => {
        return acc + stack.getScore()
      }, 0)
    },
    groupText (stack) {
      if (this.groupedStacks.has(stack)) {
        return "Un-Group"
      }
      return "Group"
    },
    canGroup (stack) {
      if (!this.isGroup || this.activePlayer.id !== stack.playerId) {
        return false
      }
      return this.groupedStacks.has(stack)
             || this.groupedScore() + stack.getScore() <= this.groupCardSize
    },
    toggleGrouped (stack) {
      if (this.groupedStacks.has(stack)) {
        this.groupedStacks.delete(stack)
      } else {
        this.groupedStacks.add(stack)
      }
      if (this.groupedScore() === this.groupCardSize) {
        this.groupStacks({stacks: this.groupedStacks})
      }
      this.react()
    },
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

