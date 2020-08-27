import Card from '@/classes/card/Card'

/**
 * Class for the Virus card.
 * @extends Card
 */
class Virus extends Card {
  /**
   * Creates a new Virus card.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (deck) {
    super(0, 'VIRUS', deck, Card.imgPath('virus'))
  }

  /**
   * Plays a Virus card on a given stack.
   *
   * If the top of the stack is already a Virus or the stack owner is
   * protected from viruses then the virus card will be discarded.
   * If the stack owner has a `scan` effect active then the effect will be removed
   * and the virus card discarded.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Stack} playInfo.stack - The stack the card was played on.
   */
  play (playInfo) {
    if (playInfo.stack.player.helpedBy('SCAN')) {
      this._blockedByScan(playInfo)
      this.discard()
    } else if (playInfo.stack.getTop().type !== 'VIRUS'
        && !playInfo.stack.player.protectedFrom(this.type)) {
      playInfo.stack.addCard(this)
    } else {
      this.discard()
    }
  }
}

export default Virus;
