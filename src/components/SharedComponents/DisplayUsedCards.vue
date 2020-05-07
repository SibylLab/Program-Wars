<template>
<div class="container" style="max-width: 400px">
  <modal :modalId="infoModalId()" :modalTitle="modalTitle" :modalBody="modalText" :modalCards="modalCards" :modalCallback="() => {;}" data-backdrop="static" data-keyboard="false"></modal>
  <div class="row">
    <img src="/static/miscIcons/info.png"
         style="float:right; margin-right: 20px; width: 15px; height: 15px;"
         v-if="getTips().tutorial"
         v-bind:title="usedCardsInfoText"
         v-on:click="showInfoModal">
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
  import Modal from '../Modals/Modal'
  import {mapGetters, mapState} from 'vuex'

  /**
   * This component shows any attack cards used against the player, or any safety / overclock cards used.
   * This is used in the player info panel.
   */
  export default {
    data () {
      return {
        player: this.getCurrentPlayer(),
        usedCardsInfoText: 'Special cards and the effects applied to you. Click for more detailed information.',
        modalTitle: '',
        modalText: '',
        modalCards: []
      }
    },
    components: {
      'card': Card,
      'modal': Modal
    },
    methods: {
      ...mapGetters([
        'getCurrentPlayer',
        'getTips'
      ]),
      ...mapState([
        'pIPTextColour',
        'pIPBackgroundColour'
      ]),
      infoModalId () {
        return 'display-used-cards-infoModal'
      },
      showInfoModal () {
        this.modalTitle = 'Used Cards Area Information'
        this.modalText = 'some information about the defense and attack cards and status effects'
        this.modalCards = []
        $('#' + this.infoModalId()).modal('show')
      }
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
