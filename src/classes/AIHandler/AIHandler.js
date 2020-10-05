import Redraw from '@/classes/AIHandler/Redraw'

/**
 * A handler to return a playInfo object for an AI player's turn.
 * Uses a pattern similar to Chain of Responsibility to make choices.
 * Consults objects in the actionHandlers list in order until one can
 * perform its action. If all actions fail it will take the default action
 * which should always be possible.
 *
 * Some more info about chain of responsibility can be found at:
 * https://refactoring.guru/design-patterns/chain-of-responsibility
 *
 * ### playInfo Object
 *
 * The playInfo object is just a generic js object that is used to pass information
 * about a player's turn choice on to other classes to process it. This helps to
 * keep the AI separate from the logic that actually resolves a play. To
 * standardize how player choices get processed this same type of object is
 * returned by vue components that capture human player's moves. To keep it
 * flexible (i.e. new attributes can be added to the object during processing
 * if they will be needed by other objects or components) it does not have a
 * class tree. Since it is the only way the AI comunicates with the game I have
 * included a description of what it contains here.
 *
 * More information can be
 * gathered by inspecting {@link PlayBestCard}, Card subclass' `play` methods,
 * and some of the vue modules responsible for responding to player actions.
 * This is something that works, but may be a good candidate for improvement in
 * the future to give it a more stable standardized design.
 *
 * Required attributes:
 * ```
 * {
 *   type      // The type of play made (see below)
 *   card      // The card that was played (except for 'pass' and 'discardHand')
 *   cardOwner // The player that owns the card (except for 'pass' and 'discardHand')
 *   player    // The player that made the play
 * }
 * ```
 *
 * Attributes dependent on what type of play is being made:
 * ```
 * {
 *   stack       // The stack the play uses (only for plays that add cards to stacks)
 *   playField   // The play field to play a card on (only when adding a new stack)
 *
 *   target      // The target player for effects, or the target object for SCAN
 *   targetType  // what type the target is for SCAN
 *
 *   chosenCard  // Card chosen with SEARCH
 *   sortedCards // List of cards sorted with SORT
 *   deck        // If the play affects a deck (SEARCH and SORT)
 * }
 * ```
 *
 * Possible Play types:
 * - `pass` - The player is not doing anything
 * - `discardHand` - The player is discarding their whole hand and redrawing a new one
 * - `discardCard` - The player is discarding a given card
 * - `playOnStack` - The player is playing a given card on a given stack
 * - `newStack` - The player is adding a given stack to a given playField
 * - `playSpecial` - The player is playing a given effect card
 * - `playSearch` - The player chose a given card from a given deck
 * - `playSort` - The player sorted a given list of cards from a given deck
 *
 * @prop defaultAction - The default action to take if none of the other action
 * handlers can make a valid choice. **Must always be possible**.
 */
class AIHandler {
  /**
   * Creates a new AIHandler to make turn choices for a player.
   * @param {ActionHandler[]} actionHandlers - The action handlers to use to attempt
   * to make choices for an AI player's turn.
   */
  constructor (actionHandlers) {
    this.actionHandlers = actionHandlers
    this.defaultAction = new Redraw()
  }

  /**
   * Make a turn choice for the player that it controls.
   *
   * @param {Player} player - The player to make choices for.
   * @param {Player[]} players - A list of all players in the game.
   * @param {int[]} scores - A list of current player scores.
   * @return {Object} a playInfo object.
   */
  chooseAction(player, players, scores, deck) {
    // Try all the action handlers until one returns a turn object
    for (let action of this.actionHandlers) {
      try {
        let result = action.handle(player, players, scores, deck)
        if (result) {
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
}

export default AIHandler;
