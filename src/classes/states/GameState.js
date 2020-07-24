export default class GameState {
  constructor (players) {
    this.players = players
    this.playerNum = 0
    this.turnHistory = []
    this.initGame()
  }

  initGame () {}
  /* Functions every game state should have
  drawCards
  executeTurn
  nextPlayer
  endTurn
  aiTurn
  */

  currentPlayer () {
    return this.players[this.playerNum]
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
    this.play(playInfo)
    this.addHistory(playInfo)
    this.updateScores()
    this.updatePlayers()
    this.cleanUp()
    this.endTurn()
  }

  play (playInfo) {
    if (playInfo.type in this) {
      this[playInfo.type](playInfo)
    }
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

  }

  // Play types //////////////////////////////////////////////////////////////

  discardHand (playInfo) {
    console.log(playInfo.type)
    const cards = playInfo.player.hand
    playInfo.player.hand = []
    this.discardCards(cards)
    this.drawCards(playInfo.player)
  }

  discardCard (playInfo) {
    console.log(playInfo.type)
  }

  newStack (playInfo) {
    console.log(playInfo.type)
  }

  playOnStack (playInfo) {
    console.log(playInfo.type)
  }
}
