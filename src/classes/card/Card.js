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
  }

  getValue () {
    return value
  }

  play (playInfo) {
    return []
  }

  getDiscards () {
    return [this]
  }

  _makeImage (cardName) {
    return 'static/cardImages/' + cardName + '.png'
  }
}
