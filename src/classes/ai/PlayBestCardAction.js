/**
 * @file PlayBestCardAction.js file
 * @author Steven on 2020-06-10
 */

import ActionHandler from '@/classes/ai/ActionHandler'

//  Helper functions for complex comparisons
//  should probably be in their own module

/**
 * Comparator for sorting stacks to play a variable card.
 * Expects that all stacks will accept a variable card already.
 */
function varStackCompare (a, b) {
  // sort by stacks with Rx and best score
  if (a.getTop() === "REPEAT" && b.getTop() === "REPEAT") {
    return b.getScore() - a.getScore()
  } else if (a.getTop() === "REPEAT") {
    return -1
  } else if (b.getTop() === "REPEAT") {
    return 1
  }

  // sort by stack with lowest variable card
  return lowestVar(a) - lowestVar(b) 
}

/**
 * Helper to find the lowest variable in a stack.
 * Expects there to be at least one variable in the stack.
 * @return the value of the lowest variable card.
 */
function lowestVar (stack) {
  let cards = stack.cards.filter(s => s.type === "VARIABLE")
  return cards.sort((a,b) => { return a.value - b.value }).shift().value
}


/**
 * Takes a Redraw action for the ai players turn.
 */
export default class PlayBestCardAction extends ActionHandler {
  /**
   * @constructor PlayBestCardAction
   * Play order will determine what cards are considered the "Best". If you
   * exlude a card type from the order cards of that type will not be played.
   */
  constructor (player, playOrder) {
    super(player)
    this.playOrder = this.createOrder(playOrder)
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
   * Returns an move object for playing the higest priority card in the
   * players hand or undefined if none of them can be played.
   *
   * A mini chain of responsibility for cards that uses internal functions for
   * each card type for now.
   */
  handle (hand, players, stacks, scores) {  // eslint-disable-line no-unused-vars
    let cards = this.sortHand(hand)
    for (let card of cards) {
      let type = card.type.toLowerCase()

      // Finding a method that has the lowercase name of the card type
      if (type in this) {
        let move = this[type](card, {hand, players, stacks, scores})
        if (move) { return move }
      }
    }
    return undefined
  }

  /**
   * Returns a sorted list of the cards in a players hand.
   * Sorts by lowest order value and then by highest card value.
   * Cards types that are not in the playOrder will move to back.
   */
  sortHand (hand) {
    return hand.cards.sort((a, b) => {
      if (!(a.type in this.playOrder)) { return 1 }
      else if (!(b.type in this.playOrder)) { return -1 }

      if (a.type === b.type) {
        return b.value - a.value
      }
      return this.playOrder[a.type] - this.playOrder[b.type]
    })
  }

  /**
   * Make a move for an instruction card.
   * It is currently always possible to start a new instruction if a player
   * has an instruction card.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for starting a new stack with the given card.
   */
  instruction (card, state) {  // eslint-disable-line no-unused-vars
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
   * Should prioritize group stacks over normal stacks (even if lower in value?)
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for adding a repeat to a stack, or undefined if
   * no stack can be played on.
   */
  repeat (card, state) {
    // get the player owned stack with the largest score
    let stack = state.stacks.filter((s) => {
      return s.playerId === this.player.id && !s.isComplete() && s.willAccept(card)
    }).sort((a, b) => {  // could use reduce instead
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

  /**
   * Make a move for adding a variable card to the best stack available.
   * Prioritizes unmatched Rx cards, then stack with lowest variable in it.
   * @param card The card to attempt to play.
   * @param state an object with all the state needed to make a decision
   * @return a move object for adding a variable to a stack, or undefined if
   * no stack can be played on.
   */
  variable (card, state) {
    let stacks = state.stacks.filter((s) => {
      return s.playerId === this.player.id && s.willAccept(card)
    })
    let stack = stacks.sort(varStackCompare).shift()

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

