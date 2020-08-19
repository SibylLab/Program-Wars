import Card from '@/classes/card/Card'

export default class CardWrapper extends Card {
  constructor (card) {
    super(card.value, card.type, card.deck, card.image)
    this.card = card
  }

  discard () {
    this.card.discard()
  }

  play (playInfo) {
    this.card.play(playInfo)
  }
}
