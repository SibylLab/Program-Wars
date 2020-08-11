import Redraw from '@/classes/AIHandler/Redraw'

/**
 * A handler to take an AI players turn.
 * Uses a pattern similar to Chain of Responsibility to make turn choices.
 * Consults objects in the actionHandlers list in order until one can
 * perform its action. If all actions fail it will take the default action
 * which should always be possible.
 *
 * Some more info aboout chain of responsibility can be found at:
 * https://refactoring.guru/design-patterns/chain-of-responsibility
 */
export default class AIHandler {
  /**
   * Creates a new AIHandler to make turn choices for a player.
   * @constructor AIHandler
   * @param {Player} player The AI player this handler is for.
   */
  constructor (handlers) {
    this.actionHandlers = handlers
    this.defaultAction = new Redraw()
  }

  /**
   * Make a choice for the player that it controls.
   * @param hand The hand of the AI player.
   * @param player The player taking the action. 
   * @param players A list of all players in the game.
   * @param scores A list of current player scores.
   * @return a turn object {type, card, player, target}
   */
  chooseAction(player, players, scores, deck) {
    // Try all the action handlers until one returns a turn object
    for (let action of this.actionHandlers) {
      try {
        let result = action.handle(player, players, scores, deck)
        if (result && this.canPlay(result.card)) {
          return result
        }

      // Ensure that a component error does not stop the AI turn
      } catch (err) {
        console.log("AI handler error:", err)  // eslint-disable-line
        continue
      }
    }
    // If no handler can handle this action use the default action
    return this.defaultAction.handle(player, players, scores, deck)
  }

  /**
   * Check to see if a card can be played.
   * Right now this is to ensure that players under the effects of stack
   * overflow can't play cards on stacks. It is in here instead of in each
   * action handler so that each action handler can handle the normal
   * cases and new attack effects can just be added here rather than having
   * to add every new thing to each handler.
   */
  canPlay (card) {
    if (!card.isSpecial() && this.player.hurtBy('STACKOVERFLOW')) {
      return false
    }
    return true
  }
}
