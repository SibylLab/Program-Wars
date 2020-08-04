// Function to create a unique object id
const uuidV1 = require('uuid/v1')

/**
 * A Playing card.
 */
export default class Card {
  constructor (value, type, image, ownerId) {
    this.value = value
    this.type = type
    this.image = image
    this.ownerId = ownerId
    this.id = uuidV1()
    this.isMimic = false
  }

  getValue () {
    return this.value
  }

  play (playInfo) { // eslint-disable-line no-unused-vars
    return []
  }

  getDiscards () {
    return [this]
  }

  static imgPath (cardName) {
    return 'static/cardImages/' + cardName + '.png'
  }

  _blockedByScan (playInfo) {
    playInfo.scanned = true
    if (this.type === 'VIRUS') {
      return [...playInfo.stackOwner.effects.removePositiveType('SCAN'), this]
    } else { 
      return [...playInfo.target.effects.removePositiveType('SCAN'), this]
    }
  }
}
