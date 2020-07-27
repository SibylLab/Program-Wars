import Card from '@/classes/game/Card'

export default class VirusWrapper extends Card {
  constructor (playerId, card) {
    super(card.type, card.value)
    this.playerId = playerId
    this.card = card
  } 
}
