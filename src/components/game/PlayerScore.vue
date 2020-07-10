<template>
<div id="player-score">

  <h5 id="score-title" :class="side">
    <b>Score:</b> <b>{{ getScore() }}/{{ scoreLimit }}</b>
  </h5>

  <meter id="score-meter" :class="side"
     :max="scoreLimit" min=0
     :value="getScore()"
     :high="scoreLimit * 0.7"
     :low="scoreLimit / 2"
     :optimum="scoreLimit * 0.9">
  </meter>

</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'player-score',
  props: ['player', 'side'],
  computed: {
    ...mapState([
      'scoreLimit'
    ])
  },
  methods: {
    /**
     * Get the players total score from their stacks.
     * Apply any special effects and round down to the nearest integer.
     */
    getScore () {
      // Must access get player scores as a getters method instead of normal
      // mapGetters to avoid caching and not returning an updated score
      let scores = this.$store.getters.getPlayerScores()
      let scoreInfo = scores.find(scr => scr.playerId === this.player.id)
      return scoreInfo.score
    }
  }
}
</script>

<style scoped>
#player-score {
  position: absolute;
  width: 100%;
  height: 100%;
}

#score-title {
  position: absolute;
  top: 0%;
}

#score-meter {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 50%;
  z-index: 20;
}

.left {
  left: 0%;
}

.right {
  right: 0%;
}

h5 {
  margin: 0;
}
</style>
