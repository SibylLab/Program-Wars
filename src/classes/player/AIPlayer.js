import Player from '@/classes/player/Player'
import AiHandlerFactory from '@/classes/ai/AiHandlerFactory'

export default class AIPlayer extends Player {
  constructor (id, name, type) {
    super(id, name)
    this.isAI = true
    this.type = type // replace when adding the handler with call to factory
    this.handler = this.setHandler(type)
  }

  setHandler (type) {
    const fact = new AiHandlerFactory()
    this.handler = fact.newHandler(type)
  }

  getPlay () {
    // temporary until handler is added and working
    return {type: 'discardHand', player: this}
  }
}
