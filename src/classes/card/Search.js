import Card from '@/classes/card/Card'

export default class Search extends Card {
  constructor (deck) {
    super(0, 'SEARCH', deck, Card.imgPath('search'))
  }

  play ({ player, chosenCard, deck }) {
    player.hand.addCard(chosenCard)
    deck.removeCard(chosenCard)
    deck.shuffle()
    this.discard()
  }
}

