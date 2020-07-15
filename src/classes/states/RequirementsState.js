import Player2 from '@/classes/game/Player2'
import ReqFactory from '@/classes/agile/ReqFactory'
import requirements from '@/data/requirements'

export default class RequirementsState {
  constructor (playerList) {
    this.players = this.addPlayers(playerList)
    this.playerNum = 0
    this.reqFactory = new ReqFactory()
  }

  addPlayers (playerList) {
    let id = 0
    return playerList.map(p => new Player2(id++, p.name, p.isAI))
  }

  currentPlayer () {
    return this.players[this.playerNum]
  }

  nextPlayer () {
    this.playerNum++

    if (this.playerNum === this.players.length) {
      return undefined
    } else if (this.currentPlayer.isAI()) {
      this.currentPlayer.requirement = this.reqFactory('DRY')
      this.nextPlayer()
    }
    return this.currentPlayer()
  }

  requirementNames () {
    console.log(requirements)
    return Object.keys(requirements)
  }

  requirementDetails (name) {
    return requirements[name]
  }
}
