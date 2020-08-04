import Card from '@/classes/card/Card'

export default class Virus extends Card {
  constructor (ownerId = -1) {
    super(0, 'VIRUS', Card.imgPath('virus'), ownerId)
  }

  play (playInfo) {
    if (playInfo.stackOwner.helpedBy('SCAN')) {
      return this._blockedByScan(playInfo)
    } else if (playInfo.stack.getTop().type !== 'VIRUS'
        && !playInfo.stackOwner.protectedFrom(this.type)) {
      playInfo.stack.addCard(this)
    }
    return []
  }
}

