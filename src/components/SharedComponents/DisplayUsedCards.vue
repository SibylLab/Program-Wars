<template>
<div class="container" style="max-width: 400px">
  <modal :modalId="infoModalId()" :modalTitle="modalTitle" :modalBody="modalText" :modalCards="modalCards" :modalCallback="() => {;}" data-backdrop="static" data-keyboard="false"></modal>
  <div class="row" style="position: relative">
    <input type="image" src="/static/miscIcons/info.png"
         style="position: absolute; top: 30px; right: 80px; width: 15px; height: 15px;"
         v-if="getTips().tutorial"
         v-bind:title="usedCardsTooltip"
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
        usedCardsTooltip: 'Special cards and the effects applied to you. Click for more detailed information.',
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
        this.modalTitle = 'Active Cards Information'
        this.modalText = 'The active cards area shows the Cyber Security and Cyber Attack cards that have been played on the current player. It also shows a list of status effects those cards may be applying to the player.\n\nCyber Security cards give beneficial effects, like blocking certain Cyber Attack cards from being played on the player or increasing your score. You play these cards on yourself. They will last until they protect you from a Cyber Attack card, their effect runs out, or the game ends.\n\nCyber Attack cards give negative effects, like preventing you from playing certain cards or reducing your score. These cards are played on you by other players. They will last until removed by Cyber Security cards or the end of the game.\n\nThe Active Effects list any bonuses or limitations applied to the player by the Cyber Security and Cyber Attack Cards. For example, when the Malware card is active on a player their score is reduced by 25%. This will be displayed under Active Effects.\n\nMore information on Cyber Security and Cyber Attack cards can be found in the menu under Rules.'
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
