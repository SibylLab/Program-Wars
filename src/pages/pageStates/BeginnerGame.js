import DeckFactory from '@/classes/deck/DeckFactory'
import Game from '@/classes/states/Game'

export default class BeginnerGame extends Game {
  constructor (players, deckType) {
    super(players, deckType)
    this.deck = new DeckFactory().begginerDeck(deckType)
    this.scoreLimit = 100
    this.refreshHands()
  }
}
