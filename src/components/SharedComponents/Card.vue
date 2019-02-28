<template>
  <div id="card" :class="cardCss" class="panel panel-default" @click="cardClicked ($event)" @click.stop draggable="true" @dragstart="cardDragged">
    <img src="../../../static/cardImg/backOfCard.png" alt="back of Card" :width ="cardWidth" height="cardHeight" v-if="showCard">
    <img class="cardImg" :src="cardGraphics" alt="Playing Card" :width ="cardWidth" :height="cardHeight" v-else>
  </div>
</template>

<script>
import { bus } from './Bus'
import {mapGetters} from 'vuex'

/**
 * This component works off of the Card.js object. This handles all of the visual representation of the card.
 */
export default {
  name: 'Card',
  props: ['cardData', 'inStack'],
  data () {
    return {
      msg: 'Program Wars',
      valueCss: 'value',
      typeCss: 'type',
      showFace: false
    }
  },
  computed: {

    isAi () {
      return (this.getCurrentPlayer().isAi && !this.inStack)
    },
    cardGraphics () {
      return this.cardData.cardImg
    },
    cardCss () {
      let classString = 'card'

      if (this.cardData.selected) {
        classString = classString + ' selected'
      }
      if (this.inStack) {
        classString = classString + ' stack'
      }

      return classString
    },
    cardWidth () {
      if (this.cardData.isUsed) {
        return 90 * 2 / 3
      } else {
        return 90
      }
    },
    cardHeight () {
      if (this.cardData.isUsed) {
        return 134 * 2 / 3
      } else {
        return 134
      }
    },
    title () {
      return 'Card'
    },
    cardType () {
      if (this.cardData.type === 'R' && this.cardData.value === 1) {
        return 'Rx'
      } else {
        return this.cardData.type
      }
    },
    cardValue () {
      if (this.cardData.type === 'R' && this.cardData.value === 1) {
        return '_'
      } else {
        return this.cardData.value
      }
    },
    showCard () {
      return (this.isAi && !this.cardData.showFace && (this.cardData.type !== 'GENERATOR' || this.cardData.type !== 'FIREWALL' || this.cardData.type !== 'ANTIVIRUS' ||
        this.cardData.type !== 'VIRUS' || this.cardData.type !== 'POWEROUTAGE' || this.cardData.type !== 'OVERCLOCK'))
    }
  },
  methods: {
    ...mapGetters([
      'getCurrentPlayer',
      'getHasPlayed',
      'getTutorialState',
      'getCurrentPlayerHand',
      'getHasPlayed'
    ]),

    cardClicked (e) {
      if (this.getHasPlayed() === false) {
        this.$emit('cardClicked', this.cardData)

        if (this.cardData.value !== '+') {
          bus.$emit('cardClickedStack', e, this.cardData)
        }
      } else {
        return ''
      }
    },
    hide () {

    },
    cardDragged (e) {
      if (this.getTutorialState()) {
        if (this.getCurrentPlayerHand()[0] === this.cardData) {
          if (this.getHasPlayed() === false) {
            this.$emit('setActiveCard', this.cardData)
            bus.$emit('cardClickedStack', e, this.cardData)
          } else {
            return ''
          }
        }
      } else {
        if (this.getHasPlayed() === false) {
          this.$emit('setActiveCard', this.cardData)
          bus.$emit('cardClickedStack', e, this.cardData)
        } else {
          return ''
        }
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#card{


    background-color: #fff;
    max-width: 90px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    max-height: 134px;
    border: 0 solid #000;
    border-radius: 10px;
    /*padding: 10px 0px 10px 0px;*/
    margin: 0 0 0 0;
    }

.flex-container {
  flex-direction:column;
  padding: 0;

}

h1, h2 {
  font-weight: normal;
  font-size: 1em;
}

ul {
  list-style-type: none;
  display: inline;
  padding: 0;
}

li {
  display: inline;
  margin: 0 5px;
}

a {
  color: #42b983;
}

.value {
    font-weight: bold;
    font-size: 1.5em;
}
.type {
    font-weight: bold;
    font-size: 1.5em;
}

.selected {
  -webkit-box-shadow: 0 0 24px 4px rgba(0,255,60,1);
  -moz-box-shadow: 0 0 24px 4px rgba(0,255,60,1);
  box-shadow: 0 0 24px 4px rgba(0,255,60,1);
}

#card.stack {
    align-content: center;
    background-color: #fff;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0;
    margin: 0;
    min-height:50px;
    min-width: 50px;
    max-width: 20px;
}

#card.addCard {

  border-style: dashed;
  border-width: thin;
}

#card.addCard .value, #card.addCard .type {
  font-weight: normal;
  font-size: 1em;
}

#card.stack .value, #card.stack .type {
  font-weight: bold;
  font-size: 1em;
}
</style>
