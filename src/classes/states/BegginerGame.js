import GameState from '@/classes/states/GameState'

export default class BegginerGame extends GameState {
  constructor (players) {
    super(players)
    this.scoreLimit = 150
  }
}
