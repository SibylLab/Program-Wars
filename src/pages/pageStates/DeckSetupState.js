import PlayerDeck from '@/classes/game/PlayerDeck'
import { baseCards, premadeCards, optionalCards } from '@/data/decks'


export default class DeckSetupState {
  constructor (playerList) {
    this.playerNum = 0  // must go before addPlayers
    this.players = this.addPlayers(playerList)
    this.optionalCards = []
    this.cardPool = this.poolCards(this.currentPlayer())
  }

  addPlayers (playerList) {
    return playerList.map((p) => {
      if (p.premade) {
        p.player.deck = this.premadeDeck(p.premade)
        this.playerNum++
      }
      return p.player
    })
  }

  currentPlayer () {
    return this.players[this.playerNum]
  }

  nextPlayer () {
    this.finalizeDeck()
    this.playerNum++


    if (this.playerNum === this.players.length) {
      this.playerNum = 0
      return undefined
    } else if (this.currentPlayer().deck !== undefined) {
      this.nextPlayer()
    } else {
      this.optionalCards = []
      this.cardPool = this.poolCards(this.currentPlayer())
      return this.currentPlayer()
    }
  }

  premadeDeck (type) {
    const deck = new PlayerDeck()
    deck.addCards(this.cardList(baseCards))
    deck.addCards(this.cardList(premadeCards[type]))
    return deck
  }

  finalizeDeck () {
    if (this.currentPlayer().deck !== undefined) { return }
    const deck = new PlayerDeck()
    deck.addCards(this.cardList(baseCards))
    deck.addCards(this.optionalCards)
    this.currentPlayer().deck = deck
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

  poolToOptional (idx) {
    const card = this.cardPool[idx]
    this.cardPool = this.cardPool.filter(c => c !== card)
    this.optionalCards.push(card)
    this.sortCards(this.optionalCards)
  }

  optionalToPool (idx) {
    const card = this.optionalCards[idx]
    this.optionalCards = this.optionalCards.filter(c => c !== card)
    this.cardPool.push(card)
    this.sortCards(this.cardPool)
  }
}
