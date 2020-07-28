import Player from '@/classes/player/Player'
import AiHandlerFactory from '@/classes/ai/AiHandlerFactory'

export default class AIPlayer extends Player {
  constructor (id, name, type) {
    super(id, name)
    this.isAI = true
    this.type = type // replace when adding the handler with call to factory
    this.handler = this.getHandler(type)
  }

  getHandler (type) {
    const fact = new AiHandlerFactory()
    return fact.newHandler(type)
  }

  getPlay (players, scores) {
    return this.handler.chooseAction(this, players, scores)
  }
}
