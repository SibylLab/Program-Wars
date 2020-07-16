import Deck from '@/classes/game/Deck'
import { baseCards, premadeCards, optionalCards } from '@/data/decks'


export default class DeckSetupState {
  constructor (playerList) {
    console.log(playerList)
    this.players = this.addPlayers(playerList)
    this.playerNum = 0
    this.optionalCards = []
    console.log(this.currentPlayer())
    this.cardPool = this.poolCards(this.currentPlayer())
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

  poolCards (player) {
    const type = player.requirement.type
    let pool = this.cardList(premadeCards[type])
    pool = pool.concat(this.cardList(optionalCards[type]))
    this.sortCards(pool)
    return pool
  }

  cardList (cardTypes) {
    const cards = []
    for (let [type, values] of Object.entries(cardTypes)) {
      for (let [val, amt] of Object.entries(values)) {
        for (let i = 0; i < amt; i++) {
          cards.push({type, val})
        }
      }
    }
    return cards
  }

  sortCards (cardList) {
    cardList.sort((a, b) => {
      if (a.type < b.type) {
        return -1
      } else if (a.type > b.type) {
        return 1
      } else {
        return a.val - b.val
      }
    })
  }
}
