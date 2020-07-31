export default class StatusEffect {
  constructor (card, playerId) {
    this.id = card.id
    this.card = card
    this.playerId = playerId
    this.turnsLeft = -1
    this.image = 'static/cardImages/effects/' + card.type + '.png'
  }

  update () {
    if (this.turnsLeft > 0) {
      this.turnsLeft--
    }
  }

  isActive () {
    if (this.turnsLeft === 0) {
      return false
    }
    return true
  }

  destroy () {
    return this.card
  }
}


