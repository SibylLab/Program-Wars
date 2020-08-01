import Player from '@/classes/player/Player'
import AIPlayer from '@/classes/player/AIPlayer'

const botInfo = [
  {name: 'n00b_b0t', personality: 'standard'},
  {name: 'L33T_g3Ars', personality: 'aggresive'},
  {name: 'RoboVaC', personality: 'defensive'},
  {name: 'BlueScr33n', personality: 'beginner'}
]


export default class HomeState {
  constructor () {
    this.players = []
    this.mode = 'beginner'
    this.message = ''
  }

  changeMode (newMode) {
    if (newMode === 'beginner' && this.players.length > 2) {
      this.players.splice(2)
    }
    this.mode = newMode
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

  addPlayer (name, isAI = false, personality = 'none') {
    if (!this.nameInUse(name)) {
      this.players.push({name, isAI, personality})
      this.sortPlayers()
    } else {
      this.message = "A player is already using that name"
    }
  }

  addBot () {
    for (let bot of botInfo) {
      if (!this.nameInUse(bot.name)) {
        this.addPlayer(bot.name, true, bot.personality)
        return
      }
    }

    // If somehow there are no AI names available
    let botName = 'b0t_' + Math.floor(Math.random() * 10000)
    this.addPlayer(botName, true, 'standard')
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
    } else if (this.players.length === 3) {
      this.message = "You can only play with 2 or 4 players"
      return false
    } else if (!this.hasHuman()) {
      this.message = "You must add at least 1 human player"
      return false
    }
    return true
  }

  playerLimit () {
    if (this.mode === "beginner") {
      return this.players.length >= 2
    } else {
      return this.players.length >= 4
    }
  }

  hasHuman () {
    return this.players.find(p => !p.isAI) !== undefined
  }

  createPlayers () {
    let id = 0

    // Will need to distiguish modes to decide what type of player to create
    // when standard mode is added
    return this.players.map((p) => {
      let player
      if (p.isAI) {
        if (this.mode === 'beginner') { p.personality = 'beginner' }
        player = new AIPlayer(id, p.name, p.personality)
      } else {
        player = new Player(id, p.name)
      }

      id++
      return player
    })
  }
}
