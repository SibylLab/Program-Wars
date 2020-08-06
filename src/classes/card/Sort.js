import Card from '@/classes/card/Card'

export default class Sort extends Card {
  constructor (deck) {
    super(5, 'SORT', deck, Card.imgPath('sort'))
  }

  play ({ sortedCards, deck }) {
    sortedCards.reverse()
    deck.addCardsToTop(sortedCards)
    this.discard()
  }
}


