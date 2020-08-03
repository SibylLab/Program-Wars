import Card from '@/classes/card/Card'

export default class Sort extends Card {
  constructor (ownerId = -1) {
    super(0, 'SORT', Card.imgPath('sort'), ownerId)
  }

  play ({ sortedCards, deck }) {
    this.deck.cards.push(...sortedCards)
    return [this]
  }
}


