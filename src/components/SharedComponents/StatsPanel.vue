<template>
  <div class="container-fluid rounded" id="disabilityPanel">
    <div class="row">
      <div class="col-sm">
        <div class="panel panel-default" id="my-panel" style="border-radius: 10px; width: 250px">
          <div class="panel-heading" style="border-radius: 10px">Perks/Disabilities</div>
          <div class="panel-body" v-if="getCurrentPlayer.hasVirus">You have a Virus</div>
          <div class="panel-body" v-if="getCurrentPlayer.hasOverclock">You've Overclocked</div>
          <div class="panel-body" v-if="getCurrentPlayer.hasPowerOutage">You have a Power Outage!</div>
          <div class="panel-body" v-if="getCurrentPlayer.hasAntiVirus">You're Protected From Viruses </div>
          <div class="panel-body" v-if="getCurrentPlayer.hasGenerator">You're Protected From Power Outages </div>
          <div class="panel-body" v-if="getCurrentPlayer.hasFirewall">You're Protected From Hacks </div>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    methods: {
      ...mapGetters([
        'getCurrentPlayer'
      ])
    },
    computed: {
      getCurrentPlayer() {
        return this.getCurrentPlayer();
      }
    }
  }
</script>

<style scoped>

  div.panel-body {
    margin-top: 0;
    padding: 5px;

  }
</style>
