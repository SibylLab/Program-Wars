/**
 * @file PlayBestCardAction.js file
 * @author Steven on 2020-06-10
 */

import ActionHandler from '@/classes/ai/ActionHandler'

/**
 * Takes a Redraw action for the ai players turn.
 */
export default class PlayBestCardAction extends ActionHandler {
  /**
   * @constructor PlayBestCardAction
   */
  constructor (player, playOrder) {
    super(player)
    this.playOrder = this.createOrder(playOrder)
  }

  /**
   * Returns an move object for playing the higest priority card in the
   * players hand or undefined if none of them can be played.
   *
   * A mini chain of responsibility for cards that uses internal functions for
   * each card type for now.
   */
  handle (hand, players, stacks, scores) {  // eslint-disable-line no-unused-vars
    let cards = this.sortHand(hand)
    for (let card of cards) {
      if (card.type in this) {
        let move = this[card.type]({card, hand, players, stacks, scores})
        if (move) {
          return move
        }
      }
    }
    return undefined
  }

  /**
   * Returns a sorted list of the cards in a players hand.
   * Sorts by the card type and value for cards of the same type.
   */
  sortHand (hand) {
    return hand.cards.sort((a, b) => {
      if (this.playOrder[a] === this.playOrder[b]) {
        return a.value - b.value
      }
      return this.playOrder[a] - this.playOrder[b]
    })
  }

  /**
   * Creates an object that maps card types to priorities to be used when
   * sorting the players hand.
   */
  createOrder (playOrder) {
    let cardOrder = {}
    for (let i = 0; i < playOrder.length; i++) {
      cardOrder[playOrder[i]] = i
    }
    return cardOrder
  }

  /**
   * Make a move for an instruction card.
   * It is currently always possible to start a new instruction if a player
   * has an instruction card.
   * @param {Card} card The instruction card to play.
   * @return a move object for starting a new stack with the given card.
   */
  INSTRUCTION (state) {
    console.log("inst", state)
    return {
      playType: 'startNewStack',
      card: state.card,
      player: this.player,
      target: this.player
    }
  }

  /**
   * Make a move for adding a repeat card to the largest stack that
   * is available.
   * @param {Card} card The repeat card to play.
   * @param stacks An array of the ai players stacks.
   * @return a move object for adding a repeat to a stack, or undefined if
   * no stack can be played on.
   */
  REPEAT (state) {
    console.log("repeat", state)
    // get the stack with the largest score
    let stack = state.stacks.filter((s) => {
      return s.playerId === this.player.id && !s.isComplete() && s.willAccept(state.card)
    }).sort((a, b) => {
      return a.getScore() - b.getScore()
    }).shift()

    if (stack) {
      return {
        playType: 'playCardOnStack',
        card: state.card,
        player: this.player,
        target: stack
      }
    }
    return undefined
  }
}

