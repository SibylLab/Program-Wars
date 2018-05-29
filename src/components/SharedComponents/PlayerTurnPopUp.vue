<template>
  <div class="screen">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12" id="playerTurn">
          <h4 v-if="isAi">{{ displayAi }}</h4>

          <h4 v-else>{{ currentPlayer }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    /**
     * Displays the appropriate message for players in the tutorial or the real game.
     * @returns {string} The message to be displayed.
     */
    currentPlayer() {
      if(this.$store.getters.getTutorialState)
        return 'It\'s your turn!';
      else {
        return this.$store.getters.currentPlayerName + ', it\'s your turn.';
      }
    },
    /**
     * Checks if the current player is an AI.
     * @returns {default.computed.isAi|(function())|boolean|*} True if the play is AI.
     */
    isAi() {
      return this.$store.getters.getCurrentPlayer.isAi ;
    },
    /**
     * Displays the AI's output message.
     * @returns {string} The output message.
     */
    displayAi() {
      return this.$store.getters.currentPlayerName + ' (Computer), it\'s your turn.'
    }
  }
}
</script>

<style>
.screen {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
}

  #playerTurn {
    border-radius: 30px;
    width: 500px;
    height: 50px;
    position: fixed;
    top:35%;
    left: 50%;
    margin-left: -250px;
    background-color: white;
    box-shadow: 5px 5px 20px 3px rgba(42, 42, 42, 0.84);
  }

  #text {
    text-align: center;
  }
</style>
