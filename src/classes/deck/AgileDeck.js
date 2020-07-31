import Deck from '@/classes/deck/Deck'
import Card from '@/classes/card/Card'

export default class AgileDeck extends Deck {
  constructor (cardTypes, playerId) {
    super(cardTypes)
    this.playerId = playerId
  }
}


