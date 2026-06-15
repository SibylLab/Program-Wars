import PlayField from '@/classes/stack/PlayField'
import MethodStack from '@/classes/stack/MethodStack'

jest.mock('@/classes/stack/MethodStack')

function makeStack ({complete, baseType, score, topType, cards}) {
  return {
    isComplete: () => { return complete},
    getBase: () => { return { type: baseType } },
    getTop: () => { return { type: topType } },
    getScore: () => { return score },
    cards: cards ? cards : []
  }
}

describe('PlayField class', () => {
  const player = { name: 'player1' }
  const card = { type: 'TEST' }

  beforeEach(() => {
    MethodStack.mockClear()
  })

  test('creating a new PlayField', () => {
    const field = new PlayField(player)
    expect(field.player).toBe(player)
    expect(field.lanes).toHaveLength(3)
    expect(field.stacks).toHaveLength(0)
    // Each of the 3 lanes creates its own MethodStack.
    expect(MethodStack).toHaveBeenCalledTimes(3)
    expect(MethodStack).toHaveBeenCalledWith(player, 0)
  })

  describe('addCardToStack', () => {
    let field, otherStack
    beforeEach(() => {
      field = new PlayField(player)
      otherStack = makeStack({complete: false})
      field.lanes[0].stacks.push(otherStack)
    })

    test('when card won\'t complete the stack', () => {
      const stack = makeStack({complete: false})
      field.lanes[0].stacks.unshift(stack)

      field.addCardToStack(card, stack)
      expect(stack.cards).toEqual([card])
      expect(field.lanes[0].stacks).toEqual([stack, otherStack])
    })

    test('when card completes the stack', () => {
      const stack = makeStack({complete: true})
      field.lanes[0].stacks.unshift(stack)

      field.addCardToStack(card, stack)
      expect(stack.cards).toEqual([card])
      expect(field.lanes[0].stacks).toEqual([otherStack, stack])
    })

    test('when card completes the stack, but it is the lane method', () => {
      const stack = makeStack({complete: true})
      field.lanes[0].method = stack

      field.addCardToStack(card, stack)
      expect(stack.cards).toEqual([card])
      expect(field.lanes[0].stacks).toEqual([otherStack])
    })
  })

  describe('addStack', () => {
    test('when there is an incomplete stack', () => {
      const field = new PlayField(player)
      const otherStack = makeStack({complete: false})
      field.lanes[0].stacks.push(otherStack)

      const stack = makeStack({baseType: 'METHOD'})
      field.addStack(stack)
      expect(field.lanes[0].stacks).toEqual([otherStack, stack])
    })

    test('when there is a complete stack', () => {
      const field = new PlayField(player)
      const complete = makeStack({complete: true})
      field.lanes[0].stacks.push(complete)

      const stack = makeStack({baseType: 'METHOD'})
      field.addStack(stack)
      expect(field.lanes[0].stacks).toEqual([stack, complete])
    })

    test('when base is METHOD and there is an single INSTRUCTION stack', () => {
      const field = new PlayField(player)
      const otherStack = makeStack({complete: false, baseType: 'INSTRUCTION'})
      otherStack.cards.push(card)
      field.lanes[0].stacks.push(otherStack)

      const stack = makeStack({baseType: 'METHOD'})
      field.addStack(stack)
      expect(field.lanes[0].stacks).toEqual([stack, otherStack])
    })

    test('when base is INSTRUCTION and there is an single INSTRUCTION stack', () => {
      const field = new PlayField(player)
      const otherStack = makeStack({complete: false, baseType: 'INSTRUCTION'})
      otherStack.cards.push(card)
      field.lanes[0].stacks.push(otherStack)

      const stack = makeStack({baseType: 'INSTRUCTION'})
      field.addStack(stack)
      expect(field.lanes[0].stacks).toEqual([otherStack, stack])
    })
  })

  test('getting score of all the stacks', () => {
    const field = new PlayField(player)
    // The method stack's score is not added to the lane total directly.
    const stack1 = makeStack({score: 25})
    const stack2 = makeStack({score: 15})
    field.lanes[0].stacks.push(stack1)
    field.lanes[0].stacks.push(stack2)
    expect(field.getScore()).toEqual(40)
  })

  test('cleaning viruses from tops of stacks', () => {
    const field = new PlayField(player)
    const virus = {type: 'VIRUS'}
    const virusStack = makeStack({topType: 'VIRUS', cards: [virus]})
    const stack = makeStack({topType: 'REPEAT', cards: [card]})
    field.lanes[0].stacks.push(virusStack)
    field.lanes[0].stacks.push(stack)

    const viruses = field.cleanViruses()
    expect(viruses).toEqual([virus])
    expect(virusStack.cards).toHaveLength(0)
    expect(field.stacks).toHaveLength(2)
  })
})
