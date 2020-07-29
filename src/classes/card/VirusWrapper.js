import Card from '@/classes/card/Card'

export default class VirusWrapper extends Card {
  constructor (player, card) {
    super(card.type, card.value)
    this.player = player
    this.card = card
    this.isWrapper = true
  } 
}
