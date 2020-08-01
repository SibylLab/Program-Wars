import DeckFactory from '@/classes/deck/DeckFactory'
import Game from '@/pages/pageStates/Game'

export default class BeginnerGame extends Game {
  constructor (players, level) {
    super(players)
    this.deck = new DeckFactory().beginnerDeck(level.id)
    this.scoreLimit = 100
    this.refreshHands()
  }
}
