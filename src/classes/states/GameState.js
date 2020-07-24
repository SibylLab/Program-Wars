import Stack from '@/classes/game/Stack'
import Trojan from '@/classes/game/Trojan'

export default class GameState {
  constructor (players) {
    this.players = players
    this.playerNum = 0
    this.turnHistory = []
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
    for (let i = player.hand.length; i < player.handSize; i++) {
      player.hand.push(this.deck.draw())
    }
  }

  getAttackablePlayers (attackType) {
    return this.players.filter((p) => {
      return !p.isProtectedFrom(attackType) && !p.hurtBy(attackType)
          && p !== this.currentPlayer()
    })
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

  updateScores () {

  }

  updatePlayers () {

  }

  cleanUp () {

  }

  endTurn () {
    this.nextPlayer()
  }

  // Play types //////////////////////////////////////////////////////////////

  discardHand (playInfo) {
    const cards = playInfo.player.hand
    playInfo.player.hand = []
    this.discardCards(cards)
    this.drawCards(playInfo.player)
  }

  discardCard (playInfo) {
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.discardCards([playInfo.card], playInfo.cardOwner.hand)
    this.drawCards(playInfo.cardOwner)
  }

  newStack (playInfo) {
    const stack = new Stack(playInfo.target.id)
    stack.cards.push(playInfo.card)
    // put it in front of finished stacks?
    playInfo.target.stacks.push(stack)
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.drawCards(playInfo.cardOwner)
  }

  playOnStack (playInfo) {
    playInfo.target.cards.push(playInfo.card)
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
    console.log(playInfo.card.type)
    if (playInfo.target.helpedBy('SCAN')) {
      playInfo.target.removeEffect('SCAN')
    } else {
      const hand = playInfo.target.hand
      const idx = Math.floor(Math.random() * hand.cards.length)
      hand.cards[idx] = new Trojan(hand.cards[idx], playInfo.player)
      console.log(hand.cards[idx])
    }
  }

  addCardEffect (playInfo) {
    playInfo.target.addEffect(playInfo.card, playInfo.player)
  }
}
