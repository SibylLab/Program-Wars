<template>
<div id="play-field-info">

  <info-popup>
    <h3 style="margin: 0">Play Field</h3>
    <p>This area is where the player plays cards to build programs.</p>
    <p>Plain instruction and method cards can be dragged to this area to start a new stack.
       Repeat and Variable cards can be dragged onto stacks that are higlighted to
       add them to the top of the stack. Variable cards can also be used to replace
       cards of lower values.</p>
    <p>Plain instruction cards can also be dragged to the method stack. The value
       of the cards is added together (max of 9). The value of the method cards will
       update when the method stack changes value.</p>
    <p>Virus cards can be dragged onto any opponent stack that is highlighted red.
       Stacks with a Virus card on top will not be able to be added to. Those
       started with instructions cards will be worth 0 points and those started with
       Method cards will be worth 50%. Virus cards can be removed with Antivirus and
       Scan cards to restore your stacks full value</p>
    <p>The scores from each stack are added up to help the player reach the score total.</p>
  </info-popup>

</div>
</template>

<script>
import InfoPopup from '@/components/shared/InfoPopup'

/**
 * Displays some basic help information for the {@link PlayField} area of the
 * game screen using an {@link InfoPopup}.
 */
export default {
  name: 'play-field-info',
  components: {
    'info-popup': InfoPopup
  }
}
</script>

