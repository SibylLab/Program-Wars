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
    console.log(this.playOrder)
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
    for (let card of cards) {console.log(card.type)}
    for (let card of cards) {
      let type = card.type.toLowerCase()
      if (type in this) {
        let move = this[type](card, {hand, players, stacks, scores})
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
      // If a type isn't in our order it goes to the back
      if (!(a.type in this.playOrder)) { return 1 }
      else if (!(b.type in this.playOrder)) { return -1 }

      // If the types are the same sort by highest card value
      if (a.type === b.type) {
        return b.value - a.value
      }
      // otherwise smallest order value first
      return this.playOrder[a.type] - this.playOrder[b.type]
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
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for starting a new stack with the given card.
   */
  instruction (card, state) {
    console.log("inst", state)
    return {
      playType: 'startNewStack',
      card: card,
      player: this.player,
      target: this.player
    }
  }

  /**
   * Make a move for adding a repeat card to the largest stack that
   * is available.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for adding a repeat to a stack, or undefined if
   * no stack can be played on.
   */
  repeat (card, state) {
    console.log("repeat", state)
    // get the stack with the largest score
    let stack = state.stacks.filter((s) => {
      return s.playerId === this.player.id && !s.isComplete() && s.willAccept(card)
    }).sort((a, b) => {
      // Largest score first
      return b.getScore() - a.getScore()
    }).shift()

    if (stack) {
      return {
        playType: 'playCardOnStack',
        card: card,
        player: this.player,
        target: stack
      }
    }
    return undefined
  }
}

