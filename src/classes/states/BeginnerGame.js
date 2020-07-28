import { beginnerDeck } from '@/data/decks'
import Deck from '@/classes/game/Deck'
import StandardGameState from '@/classes/states/StandardGameState'

export default class BeginnerGame extends StandardGameState {
  constructor (players) {
    super(players)
  }

  initGame () {
    this.scoreLimit = 100
    this.deck = new Deck(beginnerDeck)
    this.givePlayerHands()
  }
}
