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

  takeTurn (playType, card, player, target) {
    console.log(playType, card, player, target)
    this.play(playType, card, player, target)
    this.addHistory({playType, card, player, target})
    this.updateScores()
    this.updatePlayers()
    this.cleanUp()
    this.endTurn()
  }

  play (type, card, player, target) {
    return {type,
    player,
    card,
    target}
  }

  addHistory (turnInfo) {
    turnInfo
  }

  updateScores () {

  }

  updatePlayers () {

  }

  cleanUp () {

  }

  endTurn () {

  }
}
