import { isSpecial } from '@/classes/card/cardData'
import { bus } from '@/components/shared/Bus'

const REDRAW_DELAY = 400
const TURN_DELAY = 1250
const AI_DELAY = 500

export default class Game {
  constructor (players) {
    this.players = players
    this.playerNum = 0
    this.turnHistory = []
    this.scores = Array(this.players.length).fill(0)
    this.scoreLimit = 0
    this.currentCard = null
    this.deck = null
    this.isOver = false
    this.wait = false
  }

  currentPlayer () {
    return this.players[this.playerNum]
  }

  getPlayer (id) {
    return this.players[id]
  }

  nextPlayer () {
    this.playerNum++
    this.playerNum = this.playerNum % this.players.length
  }

  getPlayerScore (playerId) {
    return this.scores[playerId]
  }

  setCurrentCard (card) {
    this.currentCard = card
  }

  getDeck () {
    return this.deck
  }

  discardCards (cards) {
    cards.map(c => c.discard()) 
  }

  drawCards (player) {
    for (let i = player.hand.numCards(); i < player.hand.maxCards; i++) {
      player.hand.addCard(this.drawCard(player))
    }
  }

  drawCard (player) { // eslint-disable-line no-unused-vars
    return this.deck.draw()
  }

  getAttackablePlayers (attackType) {
    const attackable = this.players.filter((p) => {
      return !p.protectedFrom(attackType) && !p.hurtBy(attackType)
          && p !== this.currentPlayer()
    })
    return attackable
  }

  // Turn Logic //////////////////////////////////////////////////////////////

  takeTurn (playInfo) {
    if (!this.wait) {
      if (this.didNotPlayCard(playInfo.type)) {
        this.cardNotPlayed(playInfo)
      } else {
        this.playCard(playInfo)
      }

      this.turnHistory.push(playInfo)
      this.update()

      this.endTurn()
    }
  }

  didNotPlayCard (type) {
    return type === 'pass' || type === 'discardHand' || type === 'discardCard'
  }

  cardNotPlayed ({type, player, card, cardOwner}) {
    if (type === 'discardHand') {
      const cards = player.hand.takeAll()
      player.effects.addCoolDown('REDRAW_CD')
      this.discardCards(cards)
    } else if (type === 'discardCard') {
      cardOwner.hand.removeCard(card)
      card.discard()
    } // else pass
  }

  playCard (playInfo) {
    playInfo.card.play(playInfo)
    playInfo.cardOwner.hand.removeCard(card)
    this.notifications(playInfo)
  }

  notifications (playInfo) {
    if (playInfo.scanned) {
      bus.$emit('scan-used')
    } else if (playInfo.replaced) {
      bus.$emit('mimic-played')
    }
    bus.$emit('card-played', playInfo)
  }

  update () {
    this.currentCard = null
    this.currentPlayer().update()
    this.scores = this.getScores()

    this.isOver = this.scores.reduce((acc, score) => {
      return acc || score >= this.scoreLimit
    }, false)
  }

  endTurn () {
    this.wait = true
    bus.$emit('end-turn')

    // timeout is asynchronus so both start their countdown at the same time
    setTimeout(() => {
      this.refreshHands()
    }, REDRAW_DELAY)

    setTimeout(() => {
      if (!this.endGame()) {
        this.nextPlayer()
        this.wait = false

        if (this.currentPlayer().isAI) {
          this.takeAITurn()
        }
      }
    }, TURN_DELAY)
  }

  endGame () {
    if (this.isOver && this.playerNum === this.players.length - 1) {
      bus.$emit('game-over')
      return true
    }
    return false
  }

  refreshHands () {
    this.players.map(p => {
      if (!p.hurtBy('DDOS')) { this.drawCards(p) }
    })
  }

  takeAITurn () {
    const player = this.currentPlayer()
    const playInfo = player.getPlay(this.players, this.scores, this.getDeck())

    setTimeout(() => {
      this.takeTurn(playInfo)
    }, AI_DELAY)
  }

  // Scoring /////////////////////////////////////////////////////////////////

  getScores () {
    return this.players.map(p => {
      return p.getScore()
    })
  }

  getWinners () {
    return this.highestScoringPlayers(this.players)
  }

  highestScoringPlayers (players) {
    const scores = this.getScores()
    const winningScore = Math.max(...scores)
    return players.filter(p => scores[p.id] === winningScore)
  }
}
