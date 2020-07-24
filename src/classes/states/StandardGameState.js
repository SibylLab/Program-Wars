import { standardDeck } from '@/data/decks'
import Deck from '@/classes/game/Deck'
import GameState from '@/classes/states/GameState'

export default class StandardGameState extends GameState {
  constructor (players) {
    super(players)
  }

  initGame () {
    this.scoreLimit = 150
    this.deck = new Deck(standardDeck)
    this.givePlayerHands()
    this.currentCard = undefined
  }

  givePlayerHands () {
    for (const player of this.players) {
      this.drawCards(player)
    }
  }
}

