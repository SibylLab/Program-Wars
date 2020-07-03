import MethodStackFirst from '@/classes/ai/MethodStackFirst'

describe('MethodStackFirst', () => {
  let methodFirst
  beforeEach(() => {
    methodFirst = new MethodStackFirst('player')
  })

  describe('handle', () => {
    test('no instruction cards in hand', () => {
      let hand = {cards: []}
      let result = methodFirst.handle(hand, 'players', 'stacks', 'method', 'scores')
      expect(result).toBeUndefined()
    })
    test('2 instruction cards in hand', () => {
      let hand = {
        cards: [{type: 'INSTRUCTION', value: 2}, {type: 'INSTRUCTION', value: 4}]
      }
      let method = {toLimit: jest.fn(() => {return 5})}
      let result = methodFirst.handle(hand, 'players', 'stacks', method, 'scores')
      expect(result.playType).toEqual('playCardOnStack')
      expect(result.card.value).toEqual(4)
      expect(result.player).toEqual('player')
      expect(result.target).toEqual(method)
    })

  })
})
