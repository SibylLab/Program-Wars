import TrojanWrapper from '@/classes/card/TrojanWrapper'
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
    player.hand.removeCard(card)
  }

  discardCards (cards) {
    // need to consider virus and trojan wrappers
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
    if (playInfo.card && playInfo.card.isMimic) {
      playInfo.card = playInfo.card.replace()
      return this.play(playInfo)
    } else if (playInfo.type in this) {
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
    playInfo.player.stacks.newStack(playInfo.card)
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.drawCards(playInfo.cardOwner)
  }

  playOnStack (playInfo) {
    const targetPlayer = this.players[playInfo.target.playerId]
    if (playInfo.card.type === 'VIRUS') {
      if (targetPlayer.helpedBy('SCAN')) {
        targetPlayer.removeEffect('SCAN')   
        this.discardCards([playInfo.card])
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
      hand.cards[idx] = new TrojanWrapper(hand.cards[idx], playInfo.player)
    }
  }

  addCardEffect (playInfo) {
    // needs to do more work to clean and discard everything if needed and decide
    // where to add the effect. Perhaps in agile game this can be how it is done
    // as the player own it's deck and can discard its own cards
    if (playInfo.card.isSafety()) {
      playInfo.target.effects.addPositive(playInfo.card.type)
      if (playInfo.card.type === 'ANTIVIRUS') {
        playInfo.target.hand.cleanTrojans()
        playInfo.target.stacks.cleanViruses()
      }
    } else {
      playInfo.target.effects.addNegative(playInfo.card.type, playInfo.player)
    }
  }

  // Scoreing ////////////////////////////////////////////////////////////////
  getScores () {
    return this.players.map(p => {
      return p.getScore()
    })
  }
}
