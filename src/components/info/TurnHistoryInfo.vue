<template>
<div id="turn-history-info">

  <info-popup>
    <h3 style="margin: 0">Turn History</h3>
    <p>The last 8-10 actions taken by players will be displayed with images
       in the Turn History Box.
    </p>
    <p>The main portion of the image shows the card that was played. The
       value of the card is in the top right corner.</p>
    <p>The image of the player who played the card will appear over the top
       right corner of the card image. If the card targeted another player
       the image for that player will appear over the bottom right corner.
    </p>
    <p>The leftmost image is always the last turn that was taken.</p>
  </info-popup>

</div>
</template>

<script>
import InfoPopup from '@/components/shared/InfoPopup'

/**
 * Displays some basic help information for the {@link TurnHistory} area of the
 * game screen using an {@link InfoPopup}.
 */
export default {
  name: 'turn-history-info',
  components: {
    'info-popup': InfoPopup
  }
}
</script>

