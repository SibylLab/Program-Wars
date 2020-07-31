import Player from '@/classes/player/Player'
import AIHandlerFactory from '@/classes/AIHandler/AIHandlerFactory'

export default class AIPlayer extends Player {
  constructor (id, name, type) {
    super(id, name)
    this.isAI = true
    this.handler = this.getHandler(type)
  }

  getHandler (type) {
    const fact = new AIHandlerFactory()
    return fact.newHandler(type)
  }

  getPlay (players, scores) {
    return this.handler.chooseAction(this, players, scores)
  }
}
