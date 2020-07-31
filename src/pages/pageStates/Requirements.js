import Player from '@/classes/player/Player'
import ReqFactory from '@/classes/requirement/ReqFactory'
import reqData from '@/classes/requirement/requirementData'

export default class Requirements {
  constructor (playerList) {
    this.players = this.addPlayers(playerList)
    this.playerNum = 0
    this.req = 'DRY'
  }

  addPlayers (playerList) {
    return playerList.map((p) => {
      p.req = 'DRY'
      p.premade = false
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
    this.currentPlayer().premade = this.req
  }

  playerListForDeckBuilding () {
    let fact = new ReqFactory()
    let id = 0

    return this.players.map((p) => {
      const player = new Player(id++, p.name, p.isAI)
      player.requirement = player.AI ? fact.newAIReq(p.personality) : fact.newReq(p.req)
      return { player: player, premade: p.premade }
    })
  }
}
