import Player from '@/classes/player/Player'

export default class AIPlayer extends Player {
  constructor (id, name, type) {
    super(id, name)
    this.isAI = true
    this.type = type // replace when adding the handler with call to factory
  }

  getPlay () {
    // temporary until handler is added and working
    return {type: 'discardHand', player: this}
  }
}
