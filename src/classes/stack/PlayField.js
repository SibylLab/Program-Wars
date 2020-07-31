import Stack from '@/classes/stack/Stack'
import MethodStack from '@/classes/stack/MethodStack'

export default class PlayField {
  constructor (playerId) {
    this.playerId = playerId
    this.method = new MethodStack(playerId)
    this.stacks = []
  }

  addCardToStack (card, stack) {
    stack.cards.push(card)
    if (stack.isComplete() && stack !== this.method) {
      this.stacks = this.stacks.filter(s => s !== stack)
      this.stacks.push(stack)
    }
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

  getScore () {
    return this.stacks.reduce((acc, stack) => {
      return acc += stack.getScore()
    }, 0)
  } 

  cleanViruses () {
    const infected = this.getStacksWithVirus()
    return infected.map(s => s.cards.pop())
  }

  getStacksWithVirus () {
    return this.stacks.filter(s => s.getTop().type === 'VIRUS')
  }
}
