<template>

  <div class="container" @dragover.prevent @drop="drop" @ontouchend="drop"  @click="stackClicked()" @click.stop style="text-align: left; color: black;">
    <modal :modalId="modalId2" :modalTitle="groupSelectConfirm" :modalBody="groupSelectText" :cancel="true" :modalCards="[]" :modalCallback="() => {groupStacks()}" data-backdrop="static" data-keyboard="false"></modal>
    <div class="row">
      <div class="col-md-12">
        <span style="padding: 10px; font-size: 16px" v-if="showBtn || score > 0">Stack Score: {{ score }}</span>
      </div>
      <div class="col-md-12">
        <input v-if="activeCardIsGroup && cards.length > 0 && currentSelectedStacksMatch" type="checkbox" :id="stackId" @click="stackSelected" :checked="selectedStacksLength">
        <label  v-if="activeCardIsGroup && cards.length > 0 && currentSelectedStacksMatch" for="stackId"><b>Group Select</b></label>
      </div>
      <div class="col-md-12" style="margin-left: 20px">
        <button
        style="margin-top: 7px;"
        class="btn btn-secondary"
        :class="buttonStyle"
        :stackId="this.stackId"
        @click="addToStackClicked"
        type="button"
        data-container="body"
        data-placement="top"
        data-trigger="hover"
        v-if="showBtn">
        Add
        </button>
      </div>

      <div class="col-md-12">
        <ul id="example-1">
        <li v-for="card in cards" style="zoom: 80%; margin: 4px">
        <card :cardData="card" v-on:cardClicked="cardClickedInStack(card, $event)" :inStack="true"></card>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import { bus } from './Bus'
  import Card from './Card'
  import Modal from '../Modals/Modal'
  import {mapGetters, mapMutations, mapActions, mapState} from 'vuex'

/**
 * The component that holds what will be used as the true and false stacks
 * @file Stack.vue
 */
export default {
    name: 'Stack',
    props: ['playfieldBoolean', 'stackId', 'playerId'],
    data () {
      return {
        title: 'Stack',
        id: this.stackId,
        activeStack: '',
        dataContent: 'hello',
        groupSelectConfirm: 'Group Stacks',
        groupSelectText: 'Would you like to group these stacks?'
      }
    },
    computed: {
      showBtn () {
        if (this.getActiveCard() !== undefined) {
          let activeCard = this.getActiveCard().type
          let thisStack = this.getStacks().find(findStack => this.stackId === findStack.stackId)
          if (this.getCoinMsg().valueOf() === this.playfieldBoolean) {
            if (activeCard === 'I' && thisStack.cards.length === 0 && !this.getCurrentPlayer().hasPowerOutage) {
              return true
            } else if (activeCard === 'R') {
              let rCount = 0
              if (thisStack.cards.length !== 0 && (thisStack.stackTopCard().type !== 'R' || thisStack.stackTopCard().value !== 1)) {
                for (let i = 0; i < thisStack.cards.length; i++) {
                  if (thisStack.cards[i].type === 'R') {
                    rCount++
                  }
                }
                if (rCount < 2) {
                  return true
                }
              }
            } else if (activeCard === 'V' && thisStack.cards.length > 1 && thisStack.cards.length < 5) {
              if (thisStack.stackTopCard().type === 'R' && thisStack.stackTopCard().value === 1) {
                return true
              }
            }
          }
        }
        return false
      },
      modalId2 () {
        return this.id + 'Modal'
      },
      cards () {
        if (this.playerId === this.getCurrentPlayerId()) {
          if (this.getCurrentPlayerStacks().length !== 0) {
            let stack = this.getCurrentPlayerStacks().find(findStacks => findStacks.stackId === this.stackId)
            if (stack !== undefined) {
              return stack.cards
            } else {
              return []
            }
          }
        } else {
          let stack = this.getStacks().find(findStack => findStack.stackId === this.stackId)
          if (stack !== undefined) {
            return stack.cards
          } else {
            return []
          }
        }
      },
      selectedStackBoolean () {
        return this.getSelectedStacksBoolean()
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
      activeCardIsGroup () {
        let thisActiveCard = this.getActiveCard()

        return (thisActiveCard !== undefined && thisActiveCard.type === 'G')
      },
      currentSelectedStacksMatch () {
        if (this.getCoinMsg().valueOf() === this.playfieldBoolean) {
          if (this.getSelectedStacksBoolean() === undefined) {
            return true
          } else if (this.playfieldBoolean === this.getSelectedStacksBoolean()) {
            return true
          } else {
            return false
          }
        }
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
        if (card.category !== 'stack') {
          if (card.selected === true) {
            this.activeCard = Object.assign({}, card)
            this.activeCard.category = 'stack'
            this.activeCard.selected = false
          }
        }
      })

      bus.$on('cardHasBeenSelected', () => {
        $('button[stackId="' + this.stackId + '"]').removeAttr('data-content')
      })

      bus.$on('cardDeselected', () => {
        this.setActiveCard(undefined)
        this.setActiveCardUndefined()
        this.removeAllSelectedStacks()
        $('button[stackId="' + this.stackId + '"]').removeAttr('data-content')
      })

      bus.$on('aiAddToStack', (newStackId) => {
        this.setActiveStack(newStackId)
        if (this.getAiTurn()) {
          if (this.getActiveCard() !== undefined) {
            if (this.stackId === newStackId.stackId) {
              this.setActiveStack(newStackId)
              this.addToStack()
              this.setAiTurn(false)
            }
          }
        }
      })

      bus.$on('aiGroup', (boolSide, currentPlayerId) => {
        if (this.getAiTurn() && this.getActiveCard() !== undefined && this.playfieldBoolean === boolSide && this.playerId === currentPlayerId) {
          this.setStackSelectedBoolean({boolean: boolSide})
          this.checked = true
          this.groupStacks()
          this.setAiTurn(false)
        }
      })
    },
    methods: {
      ...mapGetters([
        'getSelectedStacks',
        'getActiveCard',
        'getTutorialState',
        'getStacks',
        'getActiveSide',
        'getCoinMsg',
        'getCurrentPlayer',
        'getCurrentPlayerId',
        'getCurrentPlayerStacks',
        'getSelectedStacksBoolean',
        'getHasPlayed',
        'getPlayers',
        'getActivePlayer',
        'getAiTurn'
      ]),
      ...mapMutations([
        'addStackToSelected',
        'setStackSelectedBoolean',
        'increaseFactIndex',
        'stackDiscard',
        'removeStack',
        'addCardToStack',
        'addStackToPlayer',
        'doGroupStacks',
        'setActiveCardUndefined',
        'removeAllSelectedStacks',
        'popCardFromStack',
        'changeBonusScore',
        'setAiTurn',
        'setActiveStack',
        'setActiveCard'
      ]),
      ...mapActions([
        'playerTookTurn',
        'turn'
      ]),
      ...mapState([
        'aiTurn',
        'activeCard'
      ]),
      stackSelected () {
        this.addStackToSelected({stackId: this.stackId})
        this.setStackSelectedBoolean({boolean: this.playfieldBoolean})
        let selectedStacks = this.getSelectedStacks()
        if (selectedStacks.length === 0) {
          this.setStackSelectedBoolean({boolean: undefined})
        }
        let totalScore = 0
        for (let stack of selectedStacks) {
          totalScore += stack.score
        }
        let activeCardValue = this.getActiveCard().value
        if (selectedStacks.length >= 1 && activeCardValue === totalScore) {
          $('#' + this.modalId2).modal('show')
        }
      },
      groupStacks () {
        let groupingBonus = 5
        if (this.getTutorialState()) {
          if (!this.getAiTurn()) {
            bus.$emit('cardPlayed')
            this.increaseFactIndex()
          }
        }
        let selectedStacks = this.getSelectedStacks()
        let rXCard
        for (let stack of selectedStacks) {
          if (stack.stackTopCard().value === 1 && stack.stackTopCard().type === 'R') {
            rXCard = stack.stackTopCard()
          }
          while (stack.cards.length !== 0) {
            this.stackDiscard({stackId: stack.stackId})
          }
          this.removeStack({stackId: stack.stackId})
        }
        let stacks = this.getStacks().filter(stack => this.playerId === stack.playerId && this.playfieldBoolean === stack.boolSide)
        let stack = stacks[stacks.length - 1]
        this.addCardToStack({stackId: stack.stackId, card: this.getActiveCard()})
        this.addCardToStack({stackId: stack.stackId, card: rXCard})
        this.updateBonus(groupingBonus, groupingBonus)
        this.addStackToPlayer({playerId: this.playerId, boolSide: this.playfieldBoolean})
        this.playerTookTurn()
        bus.$emit('cardDeselected')
        bus.$emit('alterTipBox')
        this.doGroupStacks({yesOrNo: false})
        this.turn(true)
      },
      cardAddClicked () {
        this.$emit('cardAddClicked', this.id)
      },
      hide () {
      },
      stackClicked () {
      },
      cardClickedInStack (event, card) {
      },
      addToStack () {
        $('button[stackId="' + this.stackId + '"]').removeAttr('data-content')
        $('button[stackId="' + this.stackId + '"]').popover({
          trigger: 'hover',
          delay: { 'show': 200 }
        })
        $('button[stackId="' + this.stackId + '"]').popover('hide')
        if (this.getActiveCard() !== undefined) {
          let activeCard = this.getActiveCard()
          let thisStack = this.getStacks().find(stack => this.stackId === stack.stackId)
          switch (activeCard.type) {
            case 'I':
              if (thisStack.cards.length === 0) {
                this.addCardToStack({stackId: this.stackId, card: this.getActiveCard()})
                this.playerTookTurn()
                this.addStackToPlayer({playerId: this.playerId, boolSide: this.playfieldBoolean})
                bus.$emit('cardDeselected')
                this.getCurrentPlayer().hasPlayedInstruction = true
              } else {
                $('button[stackId="' + this.stackId + '"]').attr('data-content', 'You cannot add an instruction card to a non-empty stack. Instead add the card to a new stack')
                $('button[stackId="' + this.stackId + '"]').popover('toggle')
              }
              break
            case 'R':
              let repBonus = 3
              if (thisStack.cards.length === 0) {
                $('button[stackId="' + this.stackId + '"]').attr('data-content', 'You cannot add a repetition card to a stack without an instruction card. Instead add the card to a stack with an instruction card.')
                $('button[stackId="' + this.stackId + '"]').popover('toggle')
              } else if (thisStack.stackTopCard().type === 'I' || thisStack.stackTopCard().type === 'G' || thisStack.stackTopCard().type === 'R' || thisStack.stackTopCard().type === 'V') {
                this.addCardToStack({stackId: this.stackId, card: this.getActiveCard()})
                this.playerTookTurn()
                bus.$emit('cardDeselected')
                this.updateBonus(repBonus, repBonus)
                this.getCurrentPlayer().repetitionBonus += repBonus
              } else if (activeCard.value === 1 && thisStack.stackTopCard().type === 'R') {
                this.popCardFromStack({stackId: this.stackId, card: this.getActiveCard()})
                this.addCardToStack({stackId: this.stackId, card: this.getActiveCard()})
                this.playerTookTurn()
                bus.$emit('cardDeselected')
              } else if (thisStack.stackTopCard().type === 'R' && activeCard.value !== 1) {
                $('button[stackId="' + this.stackId + '"]').attr('data-content', 'You can only replace a repetition card with a variable repetition card (Rx). Instead add the card to a stack with an Instruction or Group card.')
                $('button[stackId="' + this.stackId + '"]').popover('toggle')
              } else {
                $('button[stackId="' + this.stackId + '"]').attr('data-content', 'You cannot add a repetition card to a stack without an Instruction or Group card. Instead add the card to a stack with an Instruction or Group card.')
                $('button[stackId="' + this.stackId + '"]').popover('toggle')
              }
              break

            case 'V':
              let varBonus = 2
              if (thisStack.cards.length === 0) {
                $('button[stackId="' + this.stackId + '"]').attr('data-content', 'You can only add variable cards to a stack with an open variable (Rx) repetition card or an existing variable card.')
                $('button[stackId="' + this.stackId + '"]').popover('toggle')
              } else if (thisStack.stackTopCard().type === 'R' && thisStack.stackTopCard().value === 1) {
                this.addCardToStack({stackId: this.stackId, card: this.getActiveCard()})
                this.playerTookTurn()
                bus.$emit('cardDeselected')
                this.getCurrentPlayer().variablesBonus += varBonus
                this.updateBonus(varBonus, varBonus)
              } else if (thisStack.stackTopCard().type === 'V' && thisStack.stackTopCard().value < activeCard.value) {
                this.stackDiscard({stackId: this.stackId})
                this.addCardToStack({stackId: this.stackId, card: this.getActiveCard()})
                this.playerTookTurn()
              } else {
                $('button[stackId="' + this.stackId + '"]').attr('data-content', 'You can only add variable cards to a stack with an open variable (Rx) repetition card or an existing variable card.')
                $('button[stackId="' + this.stackId + '"]').popover('toggle')
              }

              break

            case 'H':
              $('button[stackId="' + this.stackId + '"]').attr('data-content', "Hack cards are not played on a stack, you must open the opponent's stack to hack them.")
              $('button[stackId="' + this.stackId + '"]').popover('toggle')
              break

            case 'G':
              $('button[stackId="' + this.stackId + '"]').attr('data-content', 'Group cards are not played on a stack. Click the checkbox(es) to select the cards to group together. The total of the selected card(s) must equal the value of the group card.')
              $('button[stackId="' + this.stackId + '"]').popover('toggle')
              break
            default:
              return ''
          }
        }
        if (this.getHasPlayed()) {
          this.turn(true)
        }
      },
      addToStackClicked () {
        this.addToStack()
        if (this.getTutorialState()) {
          bus.$emit('cardPlayed')
          this.increaseFactIndex()
        }
        bus.$emit('alterTipBox')
        this.setActiveCardUndefined()
      },
      drop () {
        this.addToStack()
      },
      updateBonus (trueScore, falseScore) {
        if (this.getActiveSide()) {
          this.changeBonusScore({
            id: this.getCurrentPlayer().id,
            trueScore: trueScore,
            falseScore: 0
          })
        } else if (!this.getActiveSide()) {
          this.changeBonusScore({
            id: this.getCurrentPlayer().id,
            trueScore: 0,
            falseScore: falseScore
          })
        }
      }
    },
    components: {
      'card': Card,
      'modal': Modal
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stack{
  background-color: rgba(100, 149, 237, .50);
  min-width: 150px;
  min-height: 50px;
  color: #000;
  margin-top: 5px;
  padding-bottom:3px;
  border-radius: 8px;
  border: 1px solid gray;
  box-shadow: 4px 4px 9px 1px black;
}

h1, h2 {
  font-weight: normal;
  font-size: 1em;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 5px;
}

li {
  margin: 0;
  padding: 0;
  margin-right: 8px;
  display: inline-block;
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
