import Player2 from '@/classes/game/Player2'
import ReqFactory from '@/classes/agile/ReqFactory'
import requirements from '@/data/requirements'

export default class RequirementsState {
  constructor (playerList) {
    this.players = this.addPlayers(playerList)
    this.playerNum = 0
    this.req = 'DRY'
  }

  addPlayers (playerList) {
    return playerList.map((p) => {
      p.req = 'DRY'
      p.prebuilt = false
      return p
    })
  }

  currentPlayer () {
    return this.players[this.playerNum]
  }

  nextPlayer () {
    this.currentPlayer().req = this.req
    this.playerNum++

    if (this.playerNum === this.players.length) {
      this.playerNum = 0
      return undefined
    } else if (this.currentPlayer().isAI) {
      this.nextPlayer()
    } else {
      return this.currentPlayer()
    }
  }

  currentReq () {
    return requirements[this.req]
  }

  reqNames () {
    return Object.keys(requirements)
  }

  choosePrebuilt () {
    this.currentPlayer().prebuilt = true
  }

  playerListForDeckBuilding () {
    let fact = new ReqFactory()
    let id = 0

    return this.players.map((p) => {
      const player = new Player2(id++, p.name, p.isAI)
      player.requirement = player.AI ? fact.newAIReq(p.personality) : fact.newReq(p.req)
      return { player: p, prebuilt: p.prebuilt }
    })
  }
}
