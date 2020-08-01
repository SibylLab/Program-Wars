<template>
<div id="player-score" :style="{ 'text-align': side }">

    <h5 class="score-title">
      <b>Score:</b> <b>{{ player.getScore() }}/{{ state.scoreLimit }}</b>
    </h5>

    <meter class="score-meter"
       :max="state.scoreLimit" min=0
       :value="player.getScore()"
       :high="state.scoreLimit * 0.66"
       :low="state.scoreLimit * 0.33"
       :optimum="state.scoreLimit * 0.9">
    </meter>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'player-score',
  props: ['player', 'side'],
  computed: {
    ...mapGetters(['state']),
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
