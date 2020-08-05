import ActionHandler from '@/classes/AIHandler/ActionHandler'

/**
 * Takes a Redraw action for the ai players turn.
 * If the player has a redraw cooldown then a random card is discarded.
 */
export default class Redraw extends ActionHandler {
  /**
   * Returns a redraw turn object for an ai player.
   */
  handle(player) {
    if (player.hasCoolDown('REDRAW_CD')) {
      const idx = Math.floor(Math.random * player.hand.numCards())
      return {
        type: "discardCard",
        player: player,
        card: player.hand.getCardAt(idx),
        cardOwner: player
      }
    } else {
      return {
        type: "discardHand",
        player: player
      }
    }
  }
}

