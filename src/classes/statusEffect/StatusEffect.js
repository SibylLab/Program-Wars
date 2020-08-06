export default class StatusEffect {
  constructor (card, player) {
    this.id = card.id
    this.card = card
    this.player = player
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
    this.card.discard()
  }
}


