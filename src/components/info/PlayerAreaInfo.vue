<template>
<div id="player-area-info">

  <info-popup>
    <h3 style="margin: 0">Player Info</h3>
    <p>This area shows information about a player. On the players turn their picture
       is highlighted green.</p>
    <p>Score shows the players current progress toward the score limit. This score
       will be adjusted to reflect any modifiers the player has that affect score,
       like the Malware card.</p>
    <p>Threat prevention shows all the safety and remedy cards that are active on the
       player. You can mouse over them to be reminded of what their effect is.</p>
    <p>Active Threats shows all the cyber attack cards that are active on the player.
       These effects can be removed or prevented by safety cards.
       eg) Antivirus removes all malware effects.</p>
  </info-popup>

</div>
</template>

<script>
import InfoPopup from '@/components/shared/InfoPopup'
export default {
  name: 'player-area-info',
  props: ['player', 'side'],
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'info-popup': InfoPopup
  }
}
</script>
