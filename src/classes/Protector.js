import {Handler} from './AiActions/AiHandler'

/**
 * The Protector is an Ai personality that priorities safety and protection cards.
 */
export default class Protector {

  /**
   * This function will figure out what card the AI should play.
   * @param event
   * @returns {*} The card to play, the stack to play, the opponent to attack, and the move type.
   */
  turnLogic (event) {
    let handler = new Handler(event)
    handler.protector()
    return handler
  }
}
