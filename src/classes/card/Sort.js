import Card from '@/classes/card/Card'

export default class Sort extends Card {
  constructor (ownerId = -1) {
    super(5, 'SORT', Card.imgPath('sort'), ownerId)
  }

  play ({ sortedCards, deck }) {
    console.log(deck.cards.map(c => c.type).slice(0, 10))
    sortedCards.reverse()
    deck.addCardsToTop(sortedCards)
    console.log(deck.cards.map(c => c.type).slice(0, 10))
    return [this]
  }
}


