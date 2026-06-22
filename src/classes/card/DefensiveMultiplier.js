import Card from '@/classes/card/Card'

const DEFENSIVE_IMAGE_NAMES = {
  INTERFACE: 'interface',
  GIT: 'Git',
  ERROR_HANDLING: 'error_handling'
}

/**
 * Class for defensive multiplier cards.
 * @extends Card
 */
class DefensiveMultiplier extends Card {
  /**
   * Creates a new defensive multiplier card.
   * @param {string} type - The defensive card type.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (type, deck) {
    const imageName = DEFENSIVE_IMAGE_NAMES[type]
    if (!imageName) {
      throw new Error('DefensiveMultiplier: Unsupported type: ' + type)
    }
    super(2, type, deck, `static/cardImages/defensive/${imageName}.png`)
  }

  /**
   * Plays the defensive multiplier on a target stack.
   *
   * If the stack is complete or a method stack, the card is discarded.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Stack} playInfo.stack - The stack the card was played on.
   */
  play ({ stack }) {
    if (!stack.isMethod && !stack.isComplete()) {
      stack.player.playField.addCardToStack(this, stack)
    } else {
      this.discard()
    }
  }
}

export default DefensiveMultiplier
