/**
 * @file RedrawAction.js file
 * @author Steven on 2020-06-10
 */

import ActionHandler from '@/classes/ai/ActionHandler'

/**
 * Takes a Redraw action for the ai players turn.
 */
export default class RedrawAction extends ActionHandler {
  /**
   * @constructor RedrawAction
   */
  constructor (player) {
    super(player)
  }

  /**
   * Returns a redraw turn object for an ai player.
   */
  handle(hand, players, stacks, scores) {  // eslint-disable-line no-unused-vars
    let move = {
      playType: "REDRAW",
      card: undefined,
      player: this.player,
      target: this.player
    }

    // Stack Overflow may prevent us from playing when we have good cards
    // So instead we will just discard a random card
    if (this.player.hurtBy('STACKOVERFLOW')) {
      let idx = Math.floor(Math.random() * hand.cards.length)
      move.card = hand.cards[idx]
      move.playType = "DISCARD"
    }

    return move
  }
}

