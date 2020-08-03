import ActionHandler from '@/classes/AIHandler/ActionHandler'

/**
 * Takes a Redraw action for the ai players turn.
 */
export default class Redraw extends ActionHandler {
  /**
   * Returns a redraw turn object for an ai player.
   */
  handle(player) {
    return {
      type: "discardHand",
      player: player
    }
  }
}

