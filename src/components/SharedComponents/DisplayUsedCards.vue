<template>
<div class="container" style="max-width: 400px">
  <div class="row">
    <div id="cards">
    <ul class="list-inline">
      <h4 class="modal-title" :style="pIPTextColour()"> Cybersecurity </h4>
      <li v-for="(card) in usedBonusCards" style="max-width: 90px; margin-right: 5px">
        <card :cardData="card"></card>
      </li>
    </ul>
  </div>
  </div>
  <div class="row">
    <div id="cards2">
      <ul id="example-1" class="list-inline" style="padding: 10px">
        <h4 class="modal-title" :style="pIPTextColour()"> Cyberattack </h4>
        <li v-for="(card) in attackedCards" style="max-width: 90px; margin-right: 5px">
          <card :cardData="card"></card>
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div id="effects">
      <ul class="list-inline">
        <h4 class="modal-title" :style="pIPTextColour()"> Active Effects </h4>
        <li v-for="(effect) in cardEffect" style="max-width: 350px; margin-right: 5px">
          <p> {{ effect }} </p>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  import Card from './Card'
  import {mapGetters, mapState} from 'vuex'

  /**
   * This component shows any attack cards used against the player, or any safety / overclock cards used.
   * This is used in the player info panel.
   */
  export default {
    data () {
      return {
        player: this.getCurrentPlayer()// ,
        // showCardEffect: null,
        // cardEffect: showCardEffect(card)
      }
    },
    /* created () {
      Bus.$on('cardEffect', (showCardEffect) => {
      this.showCardEffect = showCardEffect;
      });
    }, */
    components: {
      'card': Card

    },
    methods: {
      ...mapGetters([
        'getCurrentPlayer'
      ]),
      ...mapState([
        'pIPTextColour',
        'pIPBackgroundColour'
      ])
    },
    computed: {
      attackedCards () {
        let cards = this.getCurrentPlayer().attackedCards
        if (cards === null) {
          return []
        } else {
          for (let card in cards) {
            cards[card].isUsed = true
          }
          return cards
        }
      },
      usedBonusCards () {
        let cards = this.getCurrentPlayer().usedBonusCards
        if (cards === null) {
          return []
        } else {
          for (let card in cards) {
            cards[card].isUsed = true
          }
          return cards
        }
      },
      cardEffect () {
        let effects = []
        let cards = this.getCurrentPlayer().attackedCards.concat(this.getCurrentPlayer().usedBonusCards)
        for (let card in cards) {
          switch (cards[card].type) {
            case 'VIRUS' :
              effects.push('-25% score')
              break
            case 'POWEROUTAGE' :
              effects.push('Unable to play base cards')
              break
            case 'GENERATOR' :
              effects.push('Protected from power outage')
              break
            case 'BATTERYBACKUP' :
              effects.push('Protected from next power outage')
              break
            case 'FIREWALL' :
              effects.push('Protected from hackers')
              break
            case 'ANTIVIRUS' :
              effects.push('Protected from virus')
              break
            case 'OVERCLOCK' :
              effects.push('+25% score')
              break
            default :
              effects.push('Undefined effect')
              break
          }
        }
        return effects
      }
    }
  }
</script>

<style scoped>
  ul  {
    list-style-type: none;
    display: inline;
    padding: 0;
  }

  .selected {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }


</style>
