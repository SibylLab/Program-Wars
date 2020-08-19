import { isAttack } from '@/classes/card/cardData'

// Function to create a unique object id
const uuidV1 = require('uuid/v1')

/**
 * A Playing card.
 */
export default class Card {
  constructor (value, type, deck, image) {
    this.value = value
    this.type = type
    this.deck = deck
    this.image = image
    this.id = uuidV1()
    this.isMimic = false
    this.isExtra = false
  }

  static imgPath (cardName) {
    return 'static/cardImages/' + cardName + '.png'
  }

  getValue () {
    return this.value
  }

  play (playInfo) { // eslint-disable-line no-unused-vars
    this.discard()
  }

  discard () {
    if (!this.isExtra) {
      this.deck.discard(this)
    }
  }

  _blockedByScan (playInfo) {
    if (isAttack(this.type)) {
      playInfo.scanned = true
      if (this.type === 'VIRUS') {
        playInfo.stack.player.effects.removePositiveType('SCAN')
      } else { 
        playInfo.target.effects.removePositiveType('SCAN')
      }
    }
  }
}
