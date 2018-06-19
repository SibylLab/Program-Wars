import {Handler} from './AiHandler'

/**
 * Sprinter is an Ai Personality that prioritizes using variable cards
 */
export default class Sprinter {
  /**
   * This function will figure out what card the AI should play.
   * @param event
   * @returns {*} The card to play, the stack to play, the opponent to attack, and the move type.
   */
  turnLogic (event, isTimid) {
    let handler = new Handler(event)
    handler.sprinter()
    return handler
  }
}
