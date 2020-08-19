import Instruction from '@/classes/card/Instruction'
import Deck from '@/classes/deck/Deck'
import Stack from '@/classes/stack/Stack'

jest.mock('@/classes/deck/Deck')
jest.mock('@/classes/stack/Stack')

describe('Instruction class', () => {
  const mockDeck = new Deck()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new Instruction', () => {
    const card = new Instruction(2, mockDeck)
    expect(card.value).toEqual(2)
    expect(card.type).toEqual('INSTRUCTION')
    expect(card.deck).toBe(mockDeck)
    expect(card.image).toEqual('static/cardImages/instruction2.png')
  })

  describe('play', () => {
    test('when instruction is played on a method stack', () => {
      const player = { playField: { addCardToStack: jest.fn() } }
      const playInfo = { stack: { player, isMethod: true } }

      const card = new Instruction(2, mockDeck)
      card.play(playInfo)

      expect(player.playField.addCardToStack).toBeCalledWith(card, playInfo.stack)
    })
    
    test('when instruction is improperly played on non-method stack', () => {
      const discardSpy = jest.spyOn(Instruction.prototype, 'discard')
      const playInfo = { stack: { isMethod: false } }

      const card = new Instruction(2, mockDeck)
      card.play(playInfo)

      expect(discardSpy).toBeCalledTimes(1)
    })

    test('when instruction is played on a play field', () => {
      const playField = { player: 'player', addStack: jest.fn() }
      const playInfo = { playField }

      const card = new Instruction(2, mockDeck)
      card.play(playInfo)

      expect(Stack).toBeCalledWith(card, playField.player)
      expect(playField.addStack).toBeCalledWith(Stack.mock.instances[0])
    })
  })
})
