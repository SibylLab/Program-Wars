<template>
<div>

  <two-player-template>
    <template v-slot:modals>
      <winner-modal-beginner id="winner-modal" class="modal fade"
        data-backdrop='static' data-keyboard='false'/>
    </template>

    <template v-slot:p1-stack-area>
      <play-field :player="game.getPlayer(0)"/>
    </template>

    <template v-slot:p2-stack-area>
      <play-field :player="game.getPlayer(1)"/>
    </template>
  </two-player-template>

</div>
</template>

<script>
import TwoPlayerTemplate from '@/pages/TwoPlayerTemplate'
import WinnerModalBeginner from '@/components/modals/WinnerModalBeginner'
import PlayField from '@/components/stackArea/PlayField'
import { mapGetters } from 'vuex'

export default {
  name: 'beginner-game',
  components: {
    'two-player-template': TwoPlayerTemplate,
    'winner-modal-beginner': WinnerModalBeginner,
    'play-field': PlayField
  },
  computed: {
    ...mapGetters(['game'])
  }
}
</script>
