import Card from '@/classes/card/Card'

export default class Virus extends Card {
  constructor (ownerId = -1) {
    super(0, 'VIRUS', Card.imgPath('virus'), ownerId)
  }

  play ({stackOwner, stack}) {
    if (stackOwner.helpedBy('SCAN')) {
      return [...stackOwner.removePositiveType('SCAN'), this]
    } else if (stack.getTop().type !== 'VIRUS' && !stackOwner.protectedFrom(this.type)) {
      stack.addCard(this)
    }
    return []
  }
}

