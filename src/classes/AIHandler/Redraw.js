import ActionHandler from '@/classes/AIHandler/ActionHandler'

/**
 * A hanlder to redraw a players hand, if the player's redraw is on unavailable
 * then it will discard a random card.
 * @extends ActionHandler
 */
class Redraw extends ActionHandler {
  /**
   * Returns a redraw turn object for an ai player.
   * @param {Player} player - The player taking the action.
   * @param {Object} a `discardHand` or `discardCard` playInfo object is
   * guaranteed.
   */
  handle(player) {
    if (player.hurtBy('REDRAW_CD')) {
      const idx = Math.floor(Math.random() * player.hand.numCards())
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

export default Redraw;
