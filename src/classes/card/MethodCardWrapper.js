import CardWrapper from '@/classes/card/CardWrapper'

/**
 * Class to wrap a Method card when it is played on a PlayField.
 * @extends CardWrapper
 */
class MethodCardWrapper extends CardWrapper {
  /**
   * Creates a new wrapper with the given Method card and MethodStack.
   * @param {Card} card - The Method card being wrapped.
   * @param {Stack} method - The MethodStack that the card gets its value from.
   */
  constructor (card, method) {
    super(card)
    this.method = method
  }

  /**
   * Returns the score of the MethodStack the card gets it's value from.
   * @return {int} The value of the card.
   */
  getValue () {
    return this.method.getScore()
  }
}

export default MethodCardWrapper;
