<template>
<div id="player-score" :style="{'text-align': side}">

    <h5 class="score-title">
      <b>Score:</b> <b>{{ player.getScore() }}/{{ limit }}</b>
    </h5>

    <meter class="score-meter"
       :max="limit" min=0
       :value="player.getScore()"
       :high="limit * 0.7"
       :low="limit / 2"
       :optimum="limit * 0.9">
    </meter>

</div>
</template>

<script>
export default {
  name: 'player-score',
  props: ['player', 'side'],
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  computed: {
    limit () {
      return this.pageState.scoreLimit
    }
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
