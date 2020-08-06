export default class CoolDown {
  constructor (type, turnsLeft, player) {
    this.type = type
    this.turnsLeft = turnsLeft
    this.player = player
    this.image = 'static/cardImages/effects/' + type + '.png'
  }

  update () {
    if (this.turnsLeft > 0) {
      this.turnsLeft--
    }
  }

  isActive () {
    if (this.turnsLeft <= 0) {
      return false
    }
    return true
  }
}
