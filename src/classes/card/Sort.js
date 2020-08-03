import Card from '@/classes/card/Card'

export default class Sort extends Card {
  constructor (ownerId = -1) {
    super(5, 'SORT', Card.imgPath('sort'), ownerId)
  }

  play ({ sortedCards, deck }) {
    sortedCards.reverse()
    deck.addCardsToTop(sortedCards)
    return [this]
  }
}


