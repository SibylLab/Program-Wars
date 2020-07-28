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
   * Returns a redraw turn object for an ai player.
   */
  handle(hand, players, stacks, scores) {  // eslint-disable-line no-unused-vars
    return {
      playType: "discardHand",
      player: this.player
    }
  }
}

