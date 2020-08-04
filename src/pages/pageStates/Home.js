import Player from '@/classes/player/Player'
import AIPlayer from '@/classes/player/AIPlayer'
import deckData from '@/classes/deck/deckData'

// Information for creating computer opponents
// could change to just be names and set personality based on the
// level instead. That way we could adjust difficulty beyond the cards
// or at least taylor the personality to the cards being used.
const botInfo = {
  beginner: [
    {name: 'n00b_b0t', personality: 'beginner'},
    {name: ';;TLDR;;', personality: 'beginner'},
  ],
  standard: [
    {name: 'L33T_g3Ars', personality: 'standard'},
    {name: 'RoboVaC', personality: 'defensive'},
    {name: 'BlueScr33n', personality: 'aggresive'}
  ]
}

export default class HomeState {
  constructor () {
    this.players = []
    this.mode = 'beginner'
    this.message = ''
    this.level = deckData[this.mode].levels[0]
  }

  changeMode (newMode) {
    if (newMode === 'beginner' && this.players.length > 2) {
      this.players.splice(2)
    }
    this.mode = newMode
    this.level = deckData[this.mode].levels[0]
  }

  getLevels () {
    return deckData[this.mode].levels
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
    for (let bot of botInfo[this.mode]) {
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

  canStart () {
    let result = true
    if (!this.hasEnoughPlayers()) {
      this.message = "You don't have the right number of players"
      result = false
    } else if (!this.hasHuman()) {
      this.message = "You must add at least 1 human player"
      result = false
    }
    return result
  }

  hasEnoughPlayers () {
    return this.players.length === 2
  }

  atPlayerLimit () {
    return this.players.length >= 2
  }

  nameInUse (name) {
    return this.players.find(p => p.name === name) !== undefined
  }

  hasHuman () {
    return this.players.find(p => !p.isAI) !== undefined
  }

  createPlayers () {
    let id = 0
    return this.players.map((p) => {
      return this.createPlayer(id++, p)
    })
  }

  createPlayer (id, playerInfo) {
    if (playerInfo.isAI) {
      if (this.mode === 'beginner') {
        playerInfo.personality = 'beginner'
      }
      return new AIPlayer(id, playerInfo.name, playerInfo.personality)
    } else {
      return new Player(id, playerInfo.name)
    }
  }
}
