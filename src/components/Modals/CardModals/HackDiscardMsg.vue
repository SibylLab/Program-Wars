<template>
  <div class="screen">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12" id="playerTurn">
          <h4 id="text" v-if="isHack">{{ currentPlayer }} <b style="color: red;">hacked</b> {{ hackedPlayer }} </h4>
          <h4 id="text" v-else>{{ currentPlayer }} discarded</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  /**
   * The Modal for when the Hack card is discarded.
   */
  export default {
    methods: {
      /**
       * These mapping functions map local functions to the vuex functions or state.
       */
      ...mapGetters([
        'getIsHack',
        'currentPlayerName',
        'getHackedPlayer'
      ])
    },
    computed: {
      currentPlayer() {
        return this.currentPlayerName();
      },
      hackedPlayer() {
        return this.getHackedPlayer();
      },
      isHack() {
        return this.getIsHack();
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
