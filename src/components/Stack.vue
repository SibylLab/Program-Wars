<template>
  <div @dragover.prevent @drop="drop" @ontouchend="drop" id="stack" :class="stackCss" @click="stackClicked()" @click.stop>
    <h1>{{ title }}</h1>
    <ul id="example-1">
      <button v-if="!playfieldBoolean"  class="btn btn-primary" :class="buttonStyle" v-on:click="addToStackClicked">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>

      <li v-for="card in cards">
            <card :cardData="card" v-on:cardClicked="cardClickedInStack(card, $event)" :inStack="true"></card>
      </li>
      <button v-if="playfieldBoolean"  class="btn btn-primary" :class="buttonStyle" v-on:click="addToStackClicked">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
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
    addToStackClicked(event) {
          console.log('add to stack was clicked')

          if (this.$store.getters.getActiveCard !== undefined) {
            console.log('active card is not undefined')

            console.log('current active card: ' + this.$store.getters.getActiveCard)

            if (this.$store.getters.getActiveCard.type === 'I') {
              console.log('the current active card is instruction')
              console.log('current active card: ' + this.$store.getters.getActiveCard)
              this.$store.commit('addStackToPlayer', {boolSide: this.playfieldBoolean, playerId: this.playerId})
              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

              this.$store.commit('removeActiveCardFromHand')


              bus.$emit('cardDeselected')
            } else {
              // TODO: logic check for current top of the stack and type of ActiveCard
            }
          }
        },
    drop (e) {
      console.log('a card was dragged to the stack')

      if (this.$store.getters.getActiveCard !== undefined) {
        console.log('active card is not undefined')

        console.log('current active card: ' + this.$store.getters.getActiveCard)

        if (this.$store.getters.getActiveCard.type === 'I') {
          console.log('the current active card is instruction')
          console.log('current active card: ' + this.$store.getters.getActiveCard)
          this.$store.commit('addStackToPlayer', {boolSide: this.playfieldBoolean, playerId: this.playerId})
          this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

          this.$store.commit('removeActiveCardFromHand')


          bus.$emit('cardDeselected')
        } else {
          // TODO: logic check for current top of the stack and type of ActiveCard
        }

      }
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
