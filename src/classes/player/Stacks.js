import MethodStack from '@/classes/game/MethodStack'

export default class Stacks {
  constructor (playerId) {
    this.playerId = playerId
    this.method = new MethodStack(playerId)
    this.stacks = []
  }

  newStack (baseCard) {
    const stack = new Stack(this.playerId)
    stack.addCard(baseCard)
    this.stacks.push(stack)
  }

  getScore (statusEffects) {
    return 35
  } 

  cleanViruses () {
    // The virus card contained in the Virus needs to be returned for discard
    const viruses = []
    for (const stack of stacks) {
      if (stack.getTop().type === 'VIRUS') {
        viruses.push(stack.pop())
      }
    }
    return viruses
  }
}
