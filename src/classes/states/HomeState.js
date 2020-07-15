const botNames = ['n00b_b0t', 'L33T_g3Ars', 'RoboVaC', 'BlueScr33n']


export default class HomeState {
  constructor () {
    this.players = []
    this.mode = 'basic'
    this.message = ''
  }

  sortPlayers () {
    this.players.sort((a,b) => {
      if (a.isAI && !b.isAI) {
        return 1
      } else if (!a.isAI && b.isAI) {
        return -1
      } else {
        return 0
      }
    })
  }

  addPlayer (name, isAI = false) {
    if (!this.nameInUse(name)) {
      this.players.push({name, isAI})
      this.sortPlayers()
    } else {
      this.message = "A player is already using that name"
    }
  }

  addBot () {
    for (let name of botNames) {
      if (!this.nameInUse(name)) {
        this.addPlayer(name, true)
        return
      }
    }

    // If somehow there are no AI names available
    let botName = 'b0t_' + Math.floor(Math.random() * 10000)
    this.addPlayer(botName, true)
  }

  removePlayer (name) {
    this.players = this.players.filter(p => p.name !== name)
  }

  nameInUse (name) {
    return this.players.find(p => p.name === name) !== undefined
  }

  canStart () {
    if (this.players.length < 2) {
      this.message = "You must add at least 2 players"
      return false
    } else if (!this.hasHuman()) {
      this.message = "You must add at least 1 human player"
      return false
    }
    return true
  }

  playerLimit () {
    return this.players.length >= 4
  }

  hasHuman () {
    return this.players.find(p => !p.isAI) !== undefined
  }
}
