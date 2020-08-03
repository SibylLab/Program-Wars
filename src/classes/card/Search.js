import Card from '@/classes/card/Card'

export default class Search extends Card {
  constructor (ownerId = -1) {
    super(0, 'SEARCH', Card.imgPath('search'), ownerId)
  }

  play ({ player, foundCard }) {
    player.hand.addCard(foundCard)
    return [this]
  }
}

