import Stack from '@/classes/card/Stack'
import MethodStack from '@/classes/card/MethodStack'
import StackWithMethodBase from '@/classes/card/StackWithMethodBase'
import VirusWrapper from '@/classes/card/VirusWrapper'

export default class PlayField {
  constructor (playerId) {
    this.playerId = playerId
    this.method = new MethodStack(playerId)
    this.stacks = []
  }

  addStack (stack) {
    const baseType = stack.getBase().type

    const completeStack = this.stacks.find(s => s.isComplete())
    const singleInstruction = this.stacks.find((s) => {
      return s.cards.length === 1 && s.getBase().type === 'INSTRUCTION'
    })

    let idx = this.stacks.length
    if (baseType === 'METHOD' && singleInstruction) {
      idx = this.stacks.indexOf(singleInstruction)
    } else if (completeStack) {
      idx = this.stacks.indexOf(completeStack)
    }

    this.stacks.splice(idx, 0, stack)
  }

  addCard (card, stack) {
    stack.cards.push(card)
    if (stack.isComplete() && stack !== this.method) {
      this.stacks = this.stacks.filter(s => s !== stack)
      this.stacks.push(stack)
    }
  }

  addVirus (card, stack, attackerId) {
    const virus = new VirusWrapper(attackerId, card)
    stack.cards.push(virus)
  }

  getScore (adjustments) {
    return this.stacks.reduce((acc, stack) => {
      return acc += stack.getScore(adjustments)
    }, 0)
  } 

  cleanViruses () {
    const viruses = []
    for (const stack of this.stacks) {
      if (stack.getTop().type === 'VIRUS') {
        viruses.push(stack.cards.pop())
      }
    }
    return viruses
  }

  getStacksWithVirus () {
    return this.stacks.filter(s => s.getTop().type === 'VIRUS')
  }
}
