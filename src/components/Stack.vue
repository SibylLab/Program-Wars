<template>
  <div @dragover.prevent @drop="drop" @ontouchend="drop" id="stack" :class="stackCss" @click="stackClicked()" @click.stop>
    <h1>{{ title }}</h1>
    <ul id="example-1">
      <span v-if="!playfieldBoolean">Stack Score: {{ score }}</span>

      <button v-if="!playfieldBoolean"  class="btn btn-primary" :class="buttonStyle" v-on:click="addToStackClicked">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>

      <li v-for="card in cards">
            <card :cardData="card" v-on:cardClicked="cardClickedInStack(card, $event)" :inStack="true"></card>
      </li>
      <button v-if="playfieldBoolean"  class="btn btn-primary" :class="buttonStyle" v-on:click="addToStackClicked">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
      <span v-if="playfieldBoolean">Stack Score: {{ score }}</span>

    </ul>
  </div>
</template>

<script>
import { bus } from './Bus';
import Card from './Card'


export default {
  name: 'Stack',
  props: ['playfieldBoolean', 'stackId', 'playerId'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 'Stack',
      id: this.stackId,
    }
  },
  computed: {
    cards () {

      if (this.$store.getters.getCurrentPlayerStacks.length !== 0) {
        let stack = this.$store.getters.getCurrentPlayerStacks.find(stack => stack.stackId === this.stackId)
        console.log("stack: ", stack)
        if (stack !== undefined) {
            return stack.cards
        } else {
            return []
        }
      }

    },
    currentPlayer () {

    },
    stackCss () {
      return 'stack'
    },
    buttonStyle() {
      return ''
    },
    score() {
        let thisStack = this.$store.getters.getStacks.find(stack => stack.stackId === this.stackId)
         console.log("this stacks score: ", thisStack.calculateStackScore())
         thisStack.calculateStackScore()
          return thisStack.score
    }
  },
  created: function () {
    bus.$on('cardClickedStack', (event, card) => {
      // a card was selected
      if (card.category !== 'stack') {
        console.log('hello ' + card.id + ' ' + card.value + ' ' + card.type + ' --- ' + card.selected)
        if (card.selected === true) {
          this.activeCard = Object.assign({}, card);

          this.activeCard.category = 'stack'
          this.activeCard.selected = false
        }
      }
    })

    bus.$on('cardDeselected', () => {
      // a card was selected
      this.activeCard = undefined
      console.log('no active card selected')
      //this is a test again
    })
  },
  methods: {
    cardAddClicked () {
      this.$emit('cardAddClicked', this.id)

    },
    hide () {

    },
    stackClicked () {
      console.log('The stack knows a card was clicked')
    },
    cardClickedInStack(event, card) {
      console.log('card in stack was clicked')


    },
    addToStack() {
      console.log('add to stack was clicked')

      if (this.$store.getters.getActiveCard !== undefined) {
        console.log('active card is not undefined')

        console.log('current active card: ' + this.$store.getters.getActiveCard)

        // get the active card from the store
        let activeCard = this.$store.getters.getActiveCard
        // get the stack data model that goes with this stack component
        let thisStack = this.$store.getters.getStacks.find(stack => this.stackId === stack.stackId)

        switch (activeCard.type) {
          case 'I':
            console.log('the current active card is instruction')
            console.log('current active card: ' + this.$store.getters.getActiveCard)

            if (thisStack.cards.length === 0) {

              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

              this.$store.commit('removeActiveCardFromHand')

              // the previous stack has an instruction card, give the player a new empty stack
              this.$store.commit('addStackToPlayer', {playerId: this.playerId, boolSide: this.playfieldBoolean})
              bus.$emit('cardDeselected')
              this.$store.commit('setHasPlayed', {hasPlayed: true})


            } else {
              // TODO: the stack is not empty, cannot add instuction card, display help message explaining
              // TODO: implement help message popups
              // for now, showing alert
              alert("You cannot add an instruction card to a non-empty stack. Try adding that card to a different stack. ")
            }
            break;
          case 'R':

            console.log('the current active card is repetition')
            console.log('current active card: ' + this.$store.getters.getActiveCard)

            if (thisStack.cards.length === 0) {
              alert("You cannot add a repetition card to a stack without an instruction card. Try adding that card to a stack with an instruction card.")

            } else if (thisStack.stackTopCard().type === 'I' || thisStack.stackTopCard().type === 'G') {

              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

              this.$store.commit('removeActiveCardFromHand')

              // the previous stack has an instruction card, give the player a new empty stack
              bus.$emit('cardDeselected')
              this.$store.commit('setHasPlayed', {hasPlayed: true})


            } else {
              // TODO: the stack does not have instruction or group card on top, cannot add repetition card, display help message explaining
              // TODO: implement help message popups
              // for now, showing alert
              alert("You cannot add a repetition card to a stack without an Instruction or Group card. Try adding that card to a stack with an Instruction or Group card.")
            }


            break;

          case 'V':

            console.log('the current active card is a variable')
            console.log('current active card: ' + this.$store.getters.getActiveCard)
          if (thisStack.cards.length === 0) {
            alert("You cannot add a variable card to a stack without an instruction card. Try adding that card to a stack with an instruction card.")

          } else if (thisStack.stackTopCard().type === 'R' && thisStack.stackTopCard().value === 1 ) {

              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

              this.$store.commit('removeActiveCardFromHand')

              // the previous stack has an instruction card, give the player a new empty stack
              bus.$emit('cardDeselected')

              this.$store.commit('setHasPlayed', {hasPlayed:true})


            } else if (thisStack.stackTopCard().type === 'V' && thisStack.stackTopCard().value < activeCard.value) {

                // remove the existing variable card from the stack and add it to the discard pile
                this.$store.commit('stackDiscard', {stackId: this.stackId})

                this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

              this.$store.commit('removeActiveCardFromHand')

              this.$store.commit('setHasPlayed', {hasPlayed:true})


            } else {
              // TODO: the stack does not have instruction or group card on top, cannot add repetition card, display help message explaining
              // TODO: implement help message popups
              // for now, showing alert
              alert("You cannot add a variable card to a stack without a Variable (Rx) repetition card. Try adding that card to a stack with an variable Repetition Card (Rx).")
            }


              break;

          default:
              console.log('unknown card type')
              break;

        }

      }
    },
    addToStackClicked(event) {
        console.log('the add to stack button was clicked')
        this.addToStack()
    },
    drop (e) {
      console.log('a card was dragged to the stack')

      this.addToStack()


    }
  },
  components: {
    'card': Card
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stack{
    background-color: #cff;
    min-width: 150px;
    min-height: 50px;
    color: #000;
}

h1, h2 {
  font-weight: normal;
  font-size: 1em;
}

ul {
  list-style-type: none;
  padding: 0;
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
    -webkit-box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
    -moz-box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
    box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
}


</style>
