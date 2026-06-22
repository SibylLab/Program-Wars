import Polymorphism from '@/classes/card/Polymorphism'
import Stack from '@/classes/stack/Stack'

jest.mock('@/classes/stack/Stack')

describe('Polymorphism class', () => {
  beforeEach(() => {
    Stack.mockClear()
  })

  test('creating a new Polymorphism card', () => {
    const card = new Polymorphism('deck')
    expect(card.getValue()).toEqual(1)
    expect(card.type).toEqual('POLYMORPHISM')
    expect(card.deck).toEqual('deck')
    expect(card.componentName).toBeNull()
    expect(card.isPolymorphism).toBeTruthy()
    expect(card.image).toEqual('static/cardImages/defensive/polymorphism.png')
  })

  describe('morph', () => {
    test('becomes the chosen component', () => {
      const card = new Polymorphism('deck')
      card.morph('CONTROLLER', 'authorization')

      expect(card.type).toEqual('CONTROLLER')
      expect(card.componentName).toEqual('authorization')
      expect(card.getValue()).toEqual(1)
      expect(card.image).toEqual('static/cardImages/controller/authorization.png')
      expect(card.getLaneIndex()).toEqual(2)
    })

    test('throws for an invalid component type', () => {
      const card = new Polymorphism('deck')
      expect(() => card.morph('GIT', 'authorization')).toThrow()
    })
  })

  describe('getLaneIndex', () => {
    test.each([
      ['MODEL', 0],
      ['VIEW', 1],
      ['CONTROLLER', 2]
    ])('%s maps to lane %i', (type, index) => {
      const card = new Polymorphism('deck')
      card.morph(type, 'x')
      expect(card.getLaneIndex()).toEqual(index)
    })
  })

  describe('play', () => {
    test('starts a new stack in its lane when no stack is given', () => {
      const addStack = jest.fn()
      const player = { name: 'p' }
      const card = new Polymorphism('deck')
      card.morph('VIEW', 'web_view')

      card.play({ playField: { player, addStack } })

      expect(Stack).toHaveBeenCalledTimes(1)
      expect(Stack).toHaveBeenCalledWith(card, player)
      expect(addStack).toHaveBeenCalledWith(Stack.mock.instances[0], 1)
    })

    test('adds to a method stack when played on one', () => {
      const addCardToStack = jest.fn()
      const stack = { isMethod: true, player: { playField: { addCardToStack } } }
      const card = new Polymorphism('deck')
      card.morph('MODEL', 'orm')

      card.play({ stack })

      expect(addCardToStack).toHaveBeenCalledWith(card, stack)
    })

    test('discards when played on a regular (non-method) stack', () => {
      const stack = { isMethod: false }
      const card = new Polymorphism('deck')
      card.morph('MODEL', 'orm')
      card.discard = jest.fn()

      card.play({ stack })

      expect(card.discard).toHaveBeenCalledTimes(1)
    })
  })
})
