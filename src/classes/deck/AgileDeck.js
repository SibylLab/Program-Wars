import Deck from '@/classes/deck/Deck'

export default class AgileDeck extends Deck {
  constructor (cardTypes, playerId) {
    super(cardTypes)
    this.playerId = playerId
  }
}


