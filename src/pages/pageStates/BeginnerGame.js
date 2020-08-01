import DeckFactory from '@/classes/deck/DeckFactory'
import Game from '@/pages/pageStates/Game'

export default class BeginnerGame extends Game {
  constructor (players, deckType) {
    super(players, deckType)
    this.deck = new DeckFactory().beginnerDeck(deckType)
    this.scoreLimit = 100
    this.refreshHands()
  }
}
