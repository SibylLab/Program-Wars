/**
 * This is the superclass of all of the Ai's possible moves
 */
export class Turn {
  /**
   * These assign the shared traits among all steps.
   * @param hand - The Ai's hand
   * @param boolSide - The current side to be played.
   * @param move - the AiMove.js object
   * @param event - JSON object to contain a lot of extra information inputted from the Personality.js object
   */
  constructor (hand, boolSide, move, event) {
    this.cardToPlay = undefined
    this.stackToPlay = undefined
    this.opponentToAttack = undefined
    this.moveType = undefined
    this.hand = hand
    this.boolSide = boolSide
    this.move = move
    this.event = event
  }
  execute () {
    // eslint-disable-next-line no-console
    console.error('Execute not implemented')
  }
  getMove () {
    return this.moveType
  }
  getStack () {
    return this.stackToPlay
  }
  getCard () {
    return this.cardToPlay
  }
  getOpponent () {
    return this.opponentToAttack
  }
  setHand (h) {
    this.hand = h
  }
  setEvent (e) {
    this.event = e
  }
}

