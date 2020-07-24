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
      return this[playInfo.type](playInfo)
    }
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
    return true
  }

  discardCard (playInfo) {
    playInfo.cardOwner.hand = playInfo.cardOwner.hand.filter(c => c !== playInfo.card)
    this.discardCards([playInfo.card])
    this.drawCards(playInfo.cardOwner)
    return true
  }

  newStack (playInfo) {
    console.log(playInfo.type)
    return false
  }

  playOnStack (playInfo) {
    console.log(playInfo.type)
    return false
  }
}
