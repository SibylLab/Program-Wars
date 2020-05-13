<template>

  <div @dragover.prevent @drop="drop" @ontouchend="drop" id="stack" :class="stackCss" @click="stackClicked()" @click.stop style="text-align: center; border: 2px solid darkgrey; border-radius: 5px">
    <ul id="example-1">

      <span>Stack Score: {{ score }}</span>


      <button v-if="activeCardIsHack" class="btn btn-danger btn-sm" :class="buttonStyle" v-on:click="hackStackClicked" style="margin: 4px;">
        HACK
      </button>
      <br>

      <li v-for="card in cards" v-bind:key="card.id" style="zoom: 60%; margin: 4px; ">
            <card :cardData="card" v-on:cardClicked="cardClickedInStack(card, $event)" :inStack="true"></card>
      </li>


    </ul>
  </div>

</template>

<script>
  /* eslint-disable no-undef */

  import { bus } from './Bus'
  import Card from './Card'
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

export default {
    name: 'opponent-stack',
    props: ['playfieldBoolean', 'stackId', 'playerId'],
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        title: 'Stack',
        id: this.stackId
      }
    },
    computed: {
      cards () {
        if (this.playerId === this.getCurrentPlayerId()) {
          if (this.getCurrentPlayerStacks().length !== 0) {
            let stack = this.getCurrentPlayerStacks().find(findStack => findStack.stackId === this.stackId)
            if (stack !== undefined) {
              return stack.cards
            } else {
              return []
            }
          }
          return []
        } else {
          let stack = this.getStacks().find(findStack => findStack.stackId === this.stackId)
          if (stack !== undefined) {
            return stack.cards
          } else {
            return []
          }
        }
      },
      activeCardIsHack () {
        if (this.getActiveCard() !== undefined && this.getActiveCard().type === 'H') {
          $('.hack').modal('show')
          let stack = this.getStacks().find(findStack => findStack.stackId === this.stackId)
          return (stack !== undefined && stack.cards[0].type !== 'G')
        } else {
          return false
        }
      },
      stackCss () {
        return 'stack'
      },
      buttonStyle () {
        return ''
      },
      score () {
        let thisStack = this.getStacks().find(stack => stack.stackId === this.stackId)
        thisStack.calculateStackScore()
        return thisStack.score
      },
      selectedStacksLength () {
        let selectedStacks = this.getSelectedStacks()

        for (let stack of selectedStacks) {
          if (stack.stackId === this.stackId) { return true }
        }
        return false
      }
    },
    created: function () {
      bus.$on('cardClickedStack', (event, card) => {
      // a card was selected
        if (card.category !== 'stack') {
          if (card.selected === true) {
            this.activeCard = Object.assign({}, card)

            this.activeCard.category = 'stack'
            this.activeCard.selected = false
          }
        }
      })

      bus.$on('cardDeselected', () => {
        this.activeCard = undefined
        this.setActiveCardUndefined()
        this.removeAllSelectedStacks()
      })

      bus.$on('aiHack', (newStackId) => {
        if (this.getAiTurn() === true) {
          if (this.getActiveCard() !== undefined) {
            if (this.stackId === newStackId.stackId) {
              this.hackStackClicked()
              this.setAiTurn(false)
            }
          }
        }
      })
    },
    methods: {
      ...mapGetters([
        'getActiveCard',
        'getStacks',
        'getCurrentPlayerStacks',
        'getCurrentPlayerId',
        'getHasPlayed',
        'getTutorialState',
        'getSelectedStacks',
        'getPlayers',
        'getAiTurn'
      ]),
      ...mapState([
        'aiTurn',
        'activeCard',
        'hackedPlayer',
        'isHack'
      ]),
      ...mapMutations([
        'stackDiscard',
        'removeStack',
        'increaseFactIndex',
        'setPlayerScores',
        'setActiveCardUndefined',
        'removeAllSelectedStacks',
        'setAiTurn',
        'setActiveCard'
      ]),
      ...mapActions([
        'playerTookTurn',
        'turn'
      ]),
      cardAddClicked () {
        this.$emit('cardAddClicked', this.id)
      },
      hide () {
      },
      stackClicked () {
      },
      cardClickedInStack (event, card) {
        // not sure what was supposed to happen here, but this function was
        // empty and eslint will not allow the parameters to go unused so
        // so I have "used" them as a "fix" for now. (steve may 2020)
        event
        card
      },
      addToStack () {
        if (this.getActiveCard() !== undefined) {
          let activeCard = this.getActiveCard()
      // get the stack data model that goes with this stack component
          let thisStack = this.getStacks().find(stack => this.stackId === stack.stackId)
          switch (activeCard.type) {
            case 'H':
              this.stackDiscard({stackId: this.stackId})
              this.removeStack({stackId: this.stackId})
              this.hackedPlayer = this.getPlayers()[thisStack.playerId].name
              this.playerTookTurn()
              bus.$emit('cardDeselected')
              this.isHack = true
              setTimeout(() => {
                this.isHack = false
              }, 1250)
              break
            default:
              return ''
          }
          if (this.getHasPlayed()) {
            this.turn(true)
          }
        }
      },
      hackStackClicked () {
        this.addToStack()
        $('.hack').modal('hide')
        if (this.getTutorialState()) {
          bus.$emit('cardPlayed')
          this.increaseFactIndex()
        }
        this.setPlayerScores()
        bus.$emit('alterTipBox')
      },
      drop () {
        this.addToStack()
      }
    },
    components: {
      'card': Card
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stack{
    background-color: lightgrey;
    width: 100%;

    color: #000;
}


h1, h2 {
  font-weight: normal;
  font-size: 1em;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}


li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.value {
    font-weight: bold;
    font-size: 5em;
}
.type {
    font-weight: bold;
    font-size: 2em;
}

.selected {
    -webkit-box-shadow: 0 0 25px 4px rgba(119,194,6,1);
    -moz-box-shadow: 0 0 25px 4px rgba(119,194,6,1);
    box-shadow: 0 0 25px 4px rgba(119,194,6,1);
}


</style>
