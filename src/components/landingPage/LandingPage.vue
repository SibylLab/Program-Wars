<template>
<div>
  <page-header></page-header>

  <div id="page">
    <game-setup></game-setup>
  </div>

</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import GameSetup from '@/components/landingPage/GameSetup'
import {mapActions} from 'vuex'

export default {
  name: 'landing-page',
  components: {
    'page-header': PageHeader,
    'game-setup': GameSetup
  },
  methods: {
    ...mapActions([
      'newGame',
      'resetForHome'
    ]),
  },
  created () {
    this.resetForHome()  // to ensure a stable reset from wherever we come from
  }
}
</script>

<style scoped>
#page {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 100%;
  background-image: url('/static/backgroundImg/helloWorld.png');
}
</style>
