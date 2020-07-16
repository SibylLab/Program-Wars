import Deck from '@/classes/game/Deck'
import { baseCards, premadeCards } from '@/data/decks'


export default class DeckSetupState {
  constructor (playerList) {
    this.players = this.addPlayers(playerList)
    this.playerNum = 0
    this.optionalCards = []
    this.cardPool = []
  }

  addPlayers (playerList) {
    return playerList.map((p) => {
      if (p.premade) {
        p.player.deck = this.premadeDeck(p.premade)
      }
      return p.player
    })
  }

  currentPlayer () {
    return this.players[this.playerNum]
  }

  premadeDeck (type) {
    const deck = new Deck()
    deck.addCards(baseCards)
    deck.addCards(premadeCards[type])
    return deck
  }

  baseCardTypes () {
    const types = []
    for (const [type, values] of Object.entries(baseCards)) {
      for (const [val, amt] of Object.entries(values)) {
        types.push({type, val, amt})
      }
    }
    return types
  }
}
