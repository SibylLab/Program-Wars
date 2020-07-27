import Stack from '@/classes/card/Stack'
import MethodStack from '@/classes/card/MethodStack'
import StackWithMethodBase from '@/classes/card/StackWithMethodBase'

export default class Stacks {
  constructor (playerId) {
    this.playerId = playerId
    this.method = new MethodStack(playerId)
    this.stacks = []
  }

  newStack (baseCard) {
    let stack
    if (baseCard.type === 'METHOD') {
      stack = new StackWithMethodBase(this.playerId, this.method)
    } else {
      stack = new Stack(this.playerId)
    }
    stack.cards.push(baseCard)
    // consider where we put it?
    this.stacks.push(stack)
  }

  addCard (card, stack) {
    // move complete stacks to the back?
    stack.cards.push(card)
  }

  addVirus (card, stack, attackerId) {
    const virus = new VirusWrapper(attackerId, card)
    stack.cards.push(virus)
  }

  getScore () {
    // will need to add a way to do stack overflow
    return this.stacks.reduce((acc, stack) => {
      return acc += stack.getScore()
    }, 0)
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
