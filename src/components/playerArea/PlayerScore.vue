<template>
<div id="player-score" :style="{ 'text-align': side }">

    <h5 class="score-title">
      <b>Score:</b> <b>{{ player.getScore() }}/{{ game.scoreLimit }}</b>
    </h5>

    <meter class="score-meter"
       :max="game.scoreLimit" min=0
       :value="player.getScore()"
       :high="game.scoreLimit * 0.66"
       :low="game.scoreLimit * 0.33"
       :optimum="game.scoreLimit * 0.9">
    </meter>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'player-score',
  props: ['player', 'side'],
  computed: {
    ...mapGetters(['game']),
  }
}
</script>

<style scoped>
#player-score {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
}

.score-title {
  margin: 0;
  margin-top: 5%;
}

.score-meter {
  width: 80%;
  height: 30px;
}
</style>
