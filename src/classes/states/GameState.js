export default class GameState {
  constructor (players) {
    this.players = players
    this.playerNum = 0
    this.deck = undefined
    this.turnHistory = []
  }

  initGame () {
    // create a deck and deal hands to each player
  }

  currentPlayer () {
    return this.players[this.playerNum]
  }

  redraw (player) {
    player
    // take the given player discard their hand and draw a new one from the
    // shared deck
    // override in agile game to draw from the players deck
  }

  drawCards (player) {
    player
    // draw cards until the player has as many cards as their hands size
    // May need to adjust based on effects?
  }

  executeTurn (turnInfo) {
    turnInfo
    // Should be similar to the action of the same name. Probably it should
    // use the template pattern, or be composed of small functions so that
    // it can be overridden by other game states and allow them to re-use as
    // much functionality as possible (or both)
  }
}
