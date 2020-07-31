/**
 * @file RedrawAction.js file
 * @author Steven on 2020-06-10
 */

import ActionHandler from '@/classes/AIHandler/ActionHandler'

/**
 * Takes a Redraw action for the ai players turn.
 */
export default class RedrawAction extends ActionHandler {
  /**
   * Returns a redraw turn object for an ai player.
   */
  handle(player) {  // eslint-disable-line no-unused-vars
    return {
      type: "discardHand",
      player: player
    }
  }
}

