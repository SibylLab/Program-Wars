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
  handle(hand, players, stacks, scores) {  // eslint-disable-line no-unused-vars
    let cards = this.sortHand(hand)
    // for each card in the hand call the function for that card.
    // If it can be played return a turn object else undefined.
    // should be kept as simple as possible for how we decide to play card.
    // Ie) play repeats on biggest available stack, play attacks on weakest
    // opponent, etc. If it can be played it will be played in the easiest
    // way possible.
    // Perhaps we could actually create handlers for these things and
    // then it could be possible to use them in here. The importance of this
    // object is to take care of keeping track of the card order without
    // having to create a million objects like before if possible.
    // but personalities might be useful in the future to alter who the card
    // is played on, ie) attack weakest player, or play of smallest stack.
    // but maybe these can be given their own objects that can be used to
    // come before this behaviour. in fact this behaviour could be ignored
    // if desired and just custom objects could be used.
    return {
      playType: "REDRAW",
      card: undefined,
      player: this.player,
      target: this.player
    }
  }

  /**
   * Returns a sorted list of the cards in a players hand.
   */
  sortHand (hand) {
    return hand.cards
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
}

