import { begginerDeck } from '@/data/decks'
import Deck from '@/classes/game/Deck'
import StandardGameState from '@/classes/states/StandardGameState'

export default class BegginerGame extends StandardGameState {
  constructor (players) {
    super(players)
  }

  initGame () {
    this.scoreLimit = 10
    this.deck = new Deck(begginerDeck)
    this.givePlayerHands()
  }
}
