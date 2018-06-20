import {Handler} from './AiActions/AiHandler'

/**
 * Hacker is an Ai personality that prioritizes using hack cards.
 */
export default class Hacker {
  /**
   * This function will figure out what card the AI should play.
   * @param event
   * @returns {*} The card to play, the stack to play, the opponent to attack, and the move type.
   */
  turnLogic (event) {
    let handler = new Handler(event)
    handler.hacker()
    return handler
  }
}
