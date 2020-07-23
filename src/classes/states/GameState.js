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

  executeTurn (turnInfo) {
    turnInfo
    // Should be similar to the action of the same name. Probably it should
    // use the template pattern, or be composed of small functions so that
    // it can be overridden by other game states and allow them to re-use as
    // much functionality as possible (or both)
  }
}
