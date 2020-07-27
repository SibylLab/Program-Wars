import Stack from '@/classes/card/Stack'

export default class StackWithMethodBase extends Stack {
  constructor (playerId, method) {
    super(playerId)
    this.method = method
  }

  getBaseValue () {
    return this.method.getScore()
  }
}
