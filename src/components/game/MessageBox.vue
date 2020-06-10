<template>
<div id="message-b" :key="message">
  {{ message }}
</div>
</template>


<script>
import {bus} from '@/components/shared/Bus'

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
      message: ""
    }
  },
  created () {
    // Somehow message box is being destroyed and created so there are two
    // listeners for this.
    bus.$on('ai-action', ({move}) => {
      this.message = "ai: " + move.playType + " " + Math.random()
    })
  }
}
</script>


<style scoped>
#message-b {
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #333333;
  border: ridge grey 8px;
  border-radius: 6px;
  color: #fff;
  font-size: 22px;
  text-align: left;
}
</style>

