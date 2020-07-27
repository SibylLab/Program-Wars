import Stack from '@/classes/game/Stack'
import StackWithMethodBase from '@/classes/game/StackWithMethodBase'
import Trojan from '@/classes/game/Trojan'
import { bus } from '@/components/shared/Bus'

export default class GameState {
  constructor (players) {
    this.players = players
    this.playerNum = 0
    this.turnHistory = []
    this.scores = this.getScores()
    this.isOver = false
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
    player.hand = player.hand.filter(c => c !== card)
  }

  discardCards (cards) {
    cards.map(c => this.deck.discard.push(c))
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
    if (!this.play(playInfo)) {
      return
    }

    this.addHistory(playInfo)
    this.endTurn()
  }

  play (playInfo) {
    if (playInfo.type in this) {
      this[playInfo.type](playInfo)
      return true
    }
    // log an error?
    return false
  }

  addHistory (playInfo) {
    this.turnHistory.push(playInfo)
  }

  endTurn () {
    // this.currentPlayer().update() // needed for other effect types
    this.scores = this.getScores()
    this.checkGameStatus()

    if (!this.isOver) {
      this.nextPlayer()

      if (this.currentPlayer().isAi) {
        this.aiTurn()
      }
    } else {
      this.endGame()
    }
  }

  checkGameStatus () {
    this.isOver = this.scores.reduce((acc, score) => {
      return acc || score.full >= this.scoreLimit
    }, false)
  }

  endGame () {
    bus.$emit('game-over')
  }

  aiTurn () {
    const player = this.currentPlayer()
    this.takeTurn({type: 'discardHand', player})
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
    let stack
    if (playInfo.card.type === 'METHOD') {
      stack = new StackWithMethodBase(playInfo.target.id, playInfo.target.method)
    } else {
      stack = new Stack(playInfo.target.id)
    }
    stack.cards.push(playInfo.card)
    // put it in front of finished stacks?
    playInfo.target.stacks.push(stack)
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.drawCards(playInfo.cardOwner)
  }

  playOnStack (playInfo) {
    const targetPlayer = this.players[playInfo.target.playerId]
    if (playInfo.card.type === 'VIRUS' && targetPlayer.helpedBy('SCAN')) {
      targetPlayer.removeEffect('SCAN')   
      this.discardCards([playInfo.card])
    } else if (playInfo.target.willReplace(playInfo.card)) {
      const card = playInfo.target.replaceLowestVar(playInfo.card)
      this.discardCards([card])
    } else {
      playInfo.target.cards.push(playInfo.card)
    }

    // move complete stacks to the back?
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.drawCards(playInfo.cardOwner)
  }

  playSpecialCard (playInfo) {
    if (playInfo.card.type === 'SCAN') {
      this.playScan(playInfo)
    } else if (playInfo.card.type === 'TROJAN') {
      this.playTrojan(playInfo)
    } else {
      this.addCardEffect(playInfo)
    }
    this.discardCard(playInfo)
  }

  // Special card actions ////////////////////////////////////////////////////

  playScan (playInfo) {
    console.log(playInfo.card.type)
    // set us into scan state to do the scanning and remove a chosen effect
  }

  playTrojan (playInfo) {
    if (playInfo.target.helpedBy('SCAN')) {
      playInfo.target.removeEffect('SCAN')
    } else {
      const hand = playInfo.target.hand
      const idx = Math.floor(Math.random() * hand.cards.length)
      hand.cards[idx] = new Trojan(hand.cards[idx], playInfo.player)
    }
  }

  addCardEffect (playInfo) {
    playInfo.target.addEffect(playInfo.card, playInfo.player)
  }

  // Scoreing ////////////////////////////////////////////////////////////////
  getScores () {
    return this.players.map(p => {
      return {full: p.getScore(), base: p.getScore()}
    })
  }

  _getScores () {
    const scores = this.players.map(() => {
      return {full: 0, base: 0}
    })
    
    for (const player of this.players) {
      const score = scores[player.id]
      score.base = this.baseScore(player)
      score.full += score.base

      const effectScores = this.getEffectScores(player)
      for (const idx in scores) {
        scores[idx].full += effectScores[idx]
      }
    }
    return scores
  }

  baseScore (player) {
    return player.stacks.reduce((acc, stack) => {
      return acc + stack.getScore()
    }, 0)
  }

  getEffectScores (player) {
    const scores = this.players.map(() => { return 0 })

    const ransoms = player.negativeEffects.filter(e => e.type === 'RANSOM')
    for (const ransom of ransoms) {
      scores[player.id] -= ransom.penalty 
      scores[ransom.attackerId] += ransom.penalty
    }

    return scores
  }
}
