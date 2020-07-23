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
  }

  givePlayerHands () {
    for (const player of this.players) {
      this.drawCards(player)
    }
  }

  drawCards (player) {
    // May need to adjust based on effects?
    for (let i = 0; i < player.handSize; i++) {
      player.hand.push(this.deck.draw())
    }
  }

  redraw (player) {
    player
    // take the given player discard their hand and draw a new one from the
    // shared deck
    // override in agile game to draw from the players deck
  }

}

