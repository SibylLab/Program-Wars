<template>
<div id="side-objectives-info">

  <info-popup>
    <h3 style="margin: 0">Side Objectives</h3>
    <p>This area tracks a player's progress toward side objectives that will award
       bonus points at the end of the game. The bonus points do not contribute to
       the players progress toward the score limit.</p>
    <p>Each objective is written in the form of an <b>if</b> statement. The text
       inside the round brackets represents the condition that must be met for the
       objective. The portion in the curly brackets is the reward if the condition
       is met. When a condition is met the reward will appear green and the total
       at the top of the window will be increased</p>
    <p>Some objectives are applied for each card of that type that is played, or
       for each stack that meets a condition. Other objectives track the state
       of the player and update when a player gains or loses an effect.</p>
  </info-popup>

</div>
</template>

<script>
import InfoPopup from '@/components/shared/InfoPopup'

/**
 * Displays some basic help information for the {@link SideObjectives} area of the
 * game screen using an {@link InfoPopup}.
 */
export default {
  name: 'side-objectives-info',
  components: {
    'info-popup': InfoPopup
  }
}
</script>

