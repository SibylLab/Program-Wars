import Player2 from '@/classes/game/Player2'

export default class RequirementsState {
  constructor (playerList) {
    this.requirements = ["nothing yet"]
    this.players = this.addPlayers(playerList)
  }

  addPlayers (playerList) {
    let id = 0
    this.players = playerList.map(p => new Player2(id++, p.name, p.isAI))
  }
}
