import Stack from '@/classes/game/Stack'

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
    console.log(playInfo.type)
    playInfo.target.cards.push(playInfo.card)
    // move complete stacks to the back?
    this.removeCard(playInfo.card, playInfo.cardOwner)
    this.drawCards(playInfo.cardOwner)
  }
}
