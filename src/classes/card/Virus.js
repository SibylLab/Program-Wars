import Card from '@/classes/card/Card'

export default class Virus extends Card {
  constructor (deck) {
    super(0, 'VIRUS', deck, Card.imgPath('virus'))
  }

  play (playInfo) {
    if (playInfo.stack.helpedBy('SCAN')) {
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

