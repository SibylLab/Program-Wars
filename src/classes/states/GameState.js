export default class GameState {
  constructor (players) {
    this.players = players
    this.playerNum = 0
  }

  currentPlayer () {
    return this.players[this.playerNum]
  }
}
