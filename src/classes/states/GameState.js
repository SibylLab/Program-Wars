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

  takeTurn (playInfo) {
    console.log(playInfo)
    this.play(playInfo)
    this.addHistory(playInfo)
    this.updateScores()
    this.updatePlayers()
    this.cleanUp()
    this.endTurn()
  }

  play (playInfo) {
    return playInfo
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
}
