import TrojanWrapper from '@/classes/card/TrojanWrapper'
import { bus } from '@/components/shared/Bus'

export default class GameState {
  constructor (players) {
    this.players = players
    this.playerNum = 0
    this.turnHistory = []
    this.scores = this.getScores()
    this.isOver = false
    this.wait = false
    this.initGame()
  }

  initGame () {}

  currentPlayer () {
    return this.players[this.playerNum]
  }

  nextPlayer () {
    this.playerNum++
    this.playerNum = this.playerNum % this.players.length
  }

  removeCard (card, player) {
    player.hand.removeCard(card)
  }

  discardCards (cards) {
    // need to consider virus and trojan wrappers
    for (const card of cards) {
      if (card.isWrapper && card.card) {
        this.deck.discard.push(card.card)
        if (card.isMimic) {
          this.deck.discard.push(card.trojan)
        }
      } else if (!card.isExtra) {
        this.deck.discard.push(card)
      }
    }
  }

  drawCards (player) {
    for (let i = player.hand.numCards(); i < player.hand.maxCards; i++) {
      player.hand.addCard(this.deck.draw())
    }
  }

  getAttackablePlayers (attackType) {
    return this.players.filter((p) => {
      return !p.protectedFrom(attackType) && !p.hurtBy(attackType)
          && p !== this.currentPlayer()
    })
  }

  canPlayCard (card) {
    if (card.isSpecial()) {
      return true
    } else {
      return !this.currentPlayer().hurtBy('STACK_OVERFLOW')
    }
  }

  // Turn Logic //////////////////////////////////////////////////////////////

  takeTurn (playInfo) {
    if (this.wait) { return }

    if (this.play(playInfo)) {
      this.addHistory(playInfo)
    }

    this.endTurn()
  }

  play (playInfo) {
    // this first if statement is unpleasant
    if (playInfo.card && playInfo.card.isMimic && playInfo.type !== 'discardCard' && playInfo.type !== 'discardHand') {
      this.playMimic(playInfo)
    } else if (playInfo.type in this) {
      this[playInfo.type](playInfo)
    } else {
      console.log('play error: Invalid play info:', playInfo)
      return false
    }
    return true
  }

  addHistory (playInfo) {
    this.turnHistory.push(playInfo)
  }

  endTurn () {
    this.currentPlayer().update() // needed for other effect types
    this.scores = this.getScores()
    this.checkGameStatus()
    this.currentCard = null
    this.wait = true
    bus.$emit('end-turn')

    setTimeout(() => {
      if (this.isOver && this.playerNum === this.players.length - 1) {
        this.endGame()
      } else {
        this.nextPlayer()
        this.wait = false

        if (this.currentPlayer().isAI) {
          setTimeout(() => { this.aiTurn() }, 500)
        }
      }
    }, 1250)
  }

  checkGameStatus () {
    const reachedLimit = this.scores.reduce((acc, score) => {
      return acc || score >= this.scoreLimit
    }, false)
    this.isOver = this.isOver || reachedLimit
  }

  endGame () {
    bus.$emit('game-over')
  }

  aiTurn () {
    const player = this.currentPlayer()
    const playInfo = player.getPlay(this.players, this.scores)
    this.takeTurn(playInfo)
  }

  // Play types //////////////////////////////////////////////////////////////

  discardHand (playInfo) {
    const cards = playInfo.player.hand.cards
    playInfo.player.hand.cards = []
    this.discardCards(cards)
    this.drawCards(playInfo.player)
  }

  discardCard (playInfo) {
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.discardCards([playInfo.card])
    this.drawCards(playInfo.cardOwner)
  }

  newStack (playInfo) {
    playInfo.player.stacks.newStack(playInfo.card)
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.drawCards(playInfo.cardOwner)
  }

  playOnStack (playInfo) {
    const targetPlayer = this.players[playInfo.target.playerId]
    if (playInfo.card.type === 'VIRUS') {
      if (targetPlayer.helpedBy('SCAN')) {
        const discards = [playInfo.card]
        targetPlayer.effects.removePositive('SCAN', discards)   
        this.discardCards(discards)
      } else {
        playInfo.player.stacks.addVirus(
            playInfo.card, playInfo.target, playInfo.cardOwner.id)
      }
    } else if (playInfo.target.willReplace(playInfo.card)) {
      const card = playInfo.target.replaceLowestVar(playInfo.card)
      this.discardCards([card])
    } else {
      playInfo.player.stacks.addCard(playInfo.card, playInfo.target)
    }

    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.drawCards(playInfo.cardOwner)
  }

  playSpecialCard (playInfo) {
    if (playInfo.card.type === 'TROJAN') {
      this.playTrojan(playInfo)
    } else {
      this.addCardEffect(playInfo)
    }
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.drawCards(playInfo.cardOwner)
  }

  playScan (playInfo) {
    const discards = [playInfo.card]

    if (playInfo.targetType === 'mimic') {
      this.removeCard(playInfo.target, playInfo.player)
      this.drawCards(playInfo.player)
      discards.push(playInfo.target)
    } else if (playInfo.targetType === 'stack') {
      discards.push(playInfo.target.cards.pop())
    } else if (playInfo.targetType === 'effect') {
      discards.push(playInfo.player.effects.removeEffect(playInfo.target))
    }

    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.drawCards(playInfo.cardOwner)
    this.discardCards(discards)
  }

  // Special card actions ////////////////////////////////////////////////////

  playTrojan (playInfo) {
    if (playInfo.target.helpedBy('SCAN')) {
      const discards = [playInfo.card]
      playInfo.target.effects.removePositive('SCAN', discards)
      this.discardCards(discards)
    } else {
      const hand = playInfo.target.hand
      const TRIES = 10  // Number of times to try finding a card we can replace

      for (let i = 0; i < TRIES; i++) {
        const idx = Math.floor(Math.random() * hand.cards.length)

        if (!hand.cards[idx].isMimic) {
          hand.cards[idx] = new TrojanWrapper(hand.cards[idx], playInfo.card, playInfo.player)
          return
        }
      }
    }
  }

  playMimic (playInfo) {
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.discardCards([playInfo.card.trojan])
    if (playInfo.card.card.type === 'SCAN') {
      this.discardCards([playInfo.card.card])
    }

    playInfo.type = 'playMimic'
    playInfo.player = playInfo.card.player
    playInfo.card = playInfo.card.replace()

    if (playInfo.card.type === 'VIRUS') {
      this.playOnStack(playInfo)
    } else {
      playInfo.target = playInfo.cardOwner
      this.playSpecialCard(playInfo)
    }
  }

  addCardEffect (playInfo) {
    let discards = []
    if (playInfo.card.isSafety()) {
      const pos = playInfo.target.effects.addPositive(playInfo.card)
      discards = discards.concat(pos)

      if (playInfo.card.type === 'ANTIVIRUS') {
        playInfo.target.hand.cleanTrojans()
        discards = discards.concat(playInfo.target.stacks.cleanViruses())
      }
    } else {
      const neg = playInfo.target.effects.addNegative(playInfo.card, playInfo.player)
      discards = discards.concat(neg)
    }
    this.discardCards(discards)
  }

  // Scoreing ////////////////////////////////////////////////////////////////
  getScores () {
    return this.players.map(p => {
      return p.getScore()
    })
  }

  getWinners () {
    return this.highestScoreingPlayers(this.players)
  }

  highestScoreingPlayers (players) {
    let winningScore = Math.max(...players.map(p => p.getScore()))
    return players.filter(p => p.getScore() === winningScore)
  }
}
