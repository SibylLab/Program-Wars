<template>
<div id="deck-setup">
  <page-header/>

  <h4 id="heading">Phase 2: Adjust Deck Setup</h4>
  <h4 id="player-name">{{ players[playerNum].name.toUpperCase() }}</h4>

  <div id="deck-contents">
    <div class="deck-card-type" v-for="type in basicCardTypes" v-bind:key="type.type  + Math.random()">
      <img v-for="card in typeCards(type)" v-bind:key="card + Math.random()"
          :src="cardImage(card)" class='deck-card' ondragstart="return false;">
    </div>
  </div>

  <div id="optional-cards" :key="updateOpt">
    <img v-for="[idx, card] in listOptional()" v-bind:key="idx"
        :src="cardImage(card)" class='card-img' ondragstart="return false;"
        v-on:drop='replaceCard($event, idx)' @dragover.prevent @dragenter.prevent>
  </div>

  <div id="replacement-cards" :key="updateRep">
    <img v-for="[idx, card] in listReplacement()" v-bind:key="idx"
        :src="cardImage(card)" class='card-img' draggable
        v-on:dragstart='dragReplacement($event, idx)'>
  </div>

  <button id="choose" class="btn btn-primary" v-on:click="chooseDeck()">Choose</button>

</div>
</template>


<script>
import deckData from '@/data/decks'
import PageHeader from '@/components/shared/PageHeader'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'agile-setup-page',
  data () {
    return {
      playerNum: 0,
      optionalCards: [],
      replacementCards: [],
      updateOpt: 0,
      updateRep: 1
    }
  },
  components: {
    'page-header': PageHeader
  },
  computed: {
    ...mapState([
      'players',
      'requirements',
      'gameState'
    ]),
    basicCardTypes () {
      let cardTypes = []
      for (let [type, totals] of Object.entries(deckData.basicCards)) {
        for (let [value, num] of Object.entries(totals)) {
          cardTypes.push({type: type, value: value, number: num})
        }
      }
      return cardTypes
    }
  },
  methods: {
    ...mapMutations(['addDeck']),
    ...mapActions(['leaveGame', 'finishDecks']),
    cardImage (card) {
      return 'static/cardImages/' + card.type.toLowerCase() + card.value + '.png'
    },
    typeCards (type) {
      let cards = []
      for (let i = 0; i < type.number; i++) {
        cards.push({type: type.type, value: type.value})
      }
      return cards
    },
    listOptional () {
      let cards = []
      for (let idx in this.optionalCards) {
        cards.push([idx, this.optionalCards[idx]])
      }
      return cards
    },
    listReplacement () {
      let cards = []
      for (let idx in this.replacementCards) {
        cards.push([idx, this.replacementCards[idx]])
      }
      return cards
    },
    chooseDeck () {
      let cards = []
      for (let type of this.basicCardTypes) {
        cards = cards.concat(this.typeCards(type))
      }
      cards = cards.concat(this.optionalCards)
      this.addDeck({player: this.players[this.playerNum], cards: cards})
      
      if (this.playerNum === this.players.length - 1) {
        this.finishDecks()
      } else {
        this.playerNum += 1

        if (this.players[this.playerNum].isAi) {
          this.chooseDeck()
        }
      }
    },
    dragReplacement (event, idx) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('idx', idx)

    },
    replaceCard (event, optIdx) {
      let replaceIdx = event.dataTransfer.getData('idx')
      let temp = this.optionalCards[optIdx]
      this.optionalCards[optIdx] = this.replacementCards[replaceIdx]
      this.replacementCards[replaceIdx] = temp
      this.updateCardLists()
    },
    updateCardLists () {
      // sort cards by type and value
      this.optionalCards.sort(this.compareCards)
      this.replacementCards.sort(this.compareCards)

      // get scroll positions and change keys to update lists visually
      let optLeft = $('#optional-cards').scrollLeft()
      let repLeft = $('#replacement-cards').scrollLeft()
      this.updateOpt = !this.updateOpt
      this.updateRep = !this.updateRep

      // After the update scroll back to the position we were at
      this.$nextTick(() => {
        document.getElementById('optional-cards').scrollLeft = optLeft
        document.getElementById('replacement-cards').scrollLeft = repLeft
      })
    },
    /**
     * Comparator to sort cards by type and value.
     */
    compareCards (a, b) {
      if (a.type < b.type) {
        return -1
      } else if (a.type > b.type) {
        return 1
      } else {
        return a.value - b.value
      }
    }
  },
  mounted () {
    if (this.gameState !== 'deck') {
      this.leaveGame()
    }

    // Setup the optional cards
    let req = this.requirements.find(r => r.playerId === this.players[this.playerNum].id)
    for (let [type, totals] of Object.entries(deckData.optionalCards[req.type])) {
      for (let [value, num] of Object.entries(totals)) {
        for (let i = 0; i < num; i++) {
          this.optionalCards.push({type: type, value: value})
        }
      }
    }

    // Setup the replacement cards
    for (let [type, totals] of Object.entries(deckData.replacementCards)) {
      for (let [value, num] of Object.entries(totals)) {
        for (let i = 0; i < num; i++) {
          this.replacementCards.push({type: type, value: value})
        }
      }
    }
    // need to filter out optional cards from replacements

    this.updateCardLists()
  }
}
</script>


<style scoped>
#deck-setup {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  font-family: monospace;
}

#heading {
  position: relative;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
  z-index: 20;
  color: white;
}

#player-name {
  position: relative;
  z-index: 20;
  color: black;
}

#deck-contents {
  position: absolute;
  left: 0px;
  top: 80px;
  width: 20%;
  height: 89.5%;
  overflow: auto;
  background-color: lightgreen;
}

.deck-card-type {
  display: block;
  text-align: left;
  margin: 20px;
}

.deck-card {
  display: inline-block;
  width: 80px;
  height: auto;
  margin-right: -50px;
}

#optional-cards {
  position: absolute;
  top: 80px;
  left: 20%;
  width: 80%;
  height: 40%;
  background-color: grey;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

#replacement-cards {
  position: absolute;
  top: 50.5%;
  left: 20%;
  width: 80%;
  height: 40%;
  background-color: lightgrey;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.card-img {
  display: inline-block;
  width: 130px;
  height: auto;
  margin: 55px 20px;
}

#choose {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.active {
  -webkit-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  box-shadow: 0 0 24px 15px rgba(0,255,0,1);
}
</style>
