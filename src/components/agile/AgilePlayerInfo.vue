<template>
<div id='agile-player-info'>

  <player-info :player="player" :side="side">
    <h5 :class="side" style="position: absolute; top: 10%;">
      <b>Score:</b> <b>{{ getScore() }}</b>
    </h5>
  </player-info>

</div>
</template>

<script>
import PlayerInfo from '@/components/game/PlayerInfo'

export default {
  name: 'agile-player-info',
  props: ['player', 'side'],
  components: {
    'player-info': PlayerInfo
  },
  methods: {
    /**
     * Get the players total score from their stacks.
     * Apply any special effects and round down to the nearest integer.
     */
    getScore () {
      let scores = this.$store.getters.getPlayerScores()
      let scoreInfo = scores.find(scr => scr.playerId === this.player.id)
      return scoreInfo.score
    }
  }
}
</script>

<style scoped>
#agile-player-info {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
