export default class HomeState {
  constructor () {
    this.players = []
    this.mode = "basic"
  }

  sortPlayers () {
  }

  addPlayer (name, isAI = false, team = 1) {
    this.players.push({name, isAI, team})
  }

  nameInUse (name) {
    return this.players.find(p => p.name === name) !== undefined
  }
}
