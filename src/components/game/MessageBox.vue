<template>
<div id="message-box" :key="messages.length">
  <p v-for="message in messages" v-bind:key="message.id">
    {{ message.text }}
  </p>
</div>
</template>


<script>
import {bus} from '@/components/shared/Bus'
import {mapState} from 'vuex'

/**
 * A message area to show messages related to the game.
 * Messages may include identifying the start of a players turn, or informing
 * the player of the action the AI took on it's turn, or game tips like what
 * the active card does.
 * Will respond to events like card-played and others with the message text
 * passed in the event payload.
 */
export default {
  name: 'message-box',
  data () {
    return  {
      messages: ['']
    }
  },
  computed: {
    ...mapState([
      'stacks',
      'players',
      'turnNumber'
    ])
  },
  methods: {
    addMessage (message) {
      this.messages.unshift({id: this.messages.length, text: message})
    }
  },
  created () {
    bus.$on('ai-action', ({move}) => {
      const name = move.player.name
      if (move.playType === 'startNewStack') {
        this.addMessage(name + " started a new stack worth " + move.card.value
            + " points")

      } else if (move.playType === 'playCardOnStack') {
        const newStack = this.stacks.find(s => s.stackId === move.target.stackId)
        if (newStack.isComplete()) {
          this.addMessage(name + " completed a stack worth " + newStack.getScore()
              + " points")
        } else {
          this.addMessage(name + " added a " + move.card.type.toLowerCase() +
              " card to a stack for a new value of " + newStack.getScore() + " points")
        }

      } else if (move.playType === 'hackStack') {
        const targetPlayer = this.players.find(p => p.id === move.target.playerId)
        this.addMessage(name + " hacked " + targetPlayer.name + " and removed a stack worth "
            + move.target.getScore() + " points")

      } else if (move.playType === 'playSpecialCard') {
        let targetName = move.target.name === move.player.name ? "itself" : move.target.name
        this.addMessage(name + " played " + move.card.type.toLowerCase() + " on " + targetName)

      } else if (move.playType === 'groupStacks') {
        this.addMessage(name + " grouped " + move.target.size + " stacks worth a total of "
            + move.card.value + " points")

      } else if (move.playType === 'REDRAW') {
        this.addMessage(name + " drew a new hand")

      } else {
        this.addMessage(name + " did " + move.playType + " you should probably report an error!")
      }
    })
  }
}
</script>


<style scoped>
#message-box {
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #333333;
  border: ridge grey 8px;
  border-radius: 6px;
  color: #fff;
  font-size: 18px;
  text-align: left;
  line-height: 22px;
  padding: 5px;
  overflow: auto;
}
</style>

