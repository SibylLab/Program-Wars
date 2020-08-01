import Card from '@/classes/card/Card'

export default class Virus extends Card {
  constructor (ownerId = -1) {
    super(0, 'VIRUS', Card.imgPath('virus'), ownerId)
  }

  play ({target, stack}) {
    const discards = []
    if (target.helpedBy('SCAN')) {
      discards.push(...target.removePositiveType('SCAN'))
      discards.push(this)
    } else if (stack.getTop().type !== 'VIRUS' && !target.protectedFrom(this.type)) {
      stack.addCard(this)
    } else {
      discards.push(this)
    }
    return discards
  }
}

