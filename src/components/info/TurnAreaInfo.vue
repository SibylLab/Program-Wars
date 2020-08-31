<template>
<div id="turn-area-info">

  <info-popup>
    <h3 style="margin: 0">Turn Area</h3>
    <p>Play instruction cards by dragging them to your play area.</p>
    <p>Other cards can be played on stacks with the top card higlighted.</p>
    <p>Special cards will tell you where you can play them. You can activate or
       play a special card by clicking the button that appears over it when it is
       useable.</p>
    <p>Any card can be discarded by clicking the trash icon in the left corner when
       the card is selected</p>
    <p>You can discard your entire hand if you don't like your options. You will draw a
       fresh new hand to replace it.</p>
    <p>Any of the above actions will end your turn.</p>
  </info-popup>

</div>
</template>

<script>
import InfoPopup from '@/components/shared/InfoPopup'

/**
 * Displays some basic help information for the {@link HandArea} of the
 * game screen using an {@link InfoPopup}.
 */
export default {
  name: 'turn-area-info',
  components: {
    'info-popup': InfoPopup
  }
}
</script>
