import Card from '@/classes/card/Card'

export default class Virus extends Card {
  constructor (ownerId = -1) {
    super(0, 'VIRUS', Card.imgPath('virus'), ownerId)
  }

  play ({target, stack}) {
    if (target.helpedBy('SCAN')) {
      return [...target.removePositiveType('SCAN'), this]
    } else if (stack.getTop().type !== 'VIRUS' && !target.protectedFrom(this.type)) {
      stack.addCard(this)
    }
    return []
  }
}

