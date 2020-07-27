import Card from '@/classes/card/Card'

export default class VirusWrapper extends Card {
  constructor (playerId, card) {
    super(card.type, card.value)
    this.playerId = playerId
    this.card = card
    this.isWrapper = true
  } 
}
