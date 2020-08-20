import Redraw from '@/classes/AIHandler/Redraw'

describe('Redraw class', () => {
  describe('handle', () => {
    test('when the AI player is able to redraw', () => {
      const hand = {
        getCardAt: jest.fn(() => { return 'card' }),
        numCards: jest.fn(() => { return 5 })
      }
      const player = { hand, hurtBy: jest.fn(() => { return true }) }

      const redraw = new Redraw()
      let move = redraw.handle(player)

      expect(move.type).toEqual("discardCard")
      expect(move.player).toBe(player)
      expect(move.card).toEqual('card') 
      expect(move.cardOwner).toBe(player)

      expect(hand.numCards).toBeCalledTimes(1)
      expect(hand.getCardAt).toBeCalledTimes(1)

      // idx is random but should be in range of hand size
      const idx = hand.getCardAt.mock.calls[0][0]
      expect(idx >= 0 && idx < 5).toBeTruthy() 
    })

    test('when the AI player is able to redraw', () => {
      const player = { hurtBy: jest.fn(() => { return false }) }
      const redraw = new Redraw()
      let move = redraw.handle(player)

      expect(move.type).toEqual("discardHand")
      expect(move.player).toBe(player)

      expect(player.hurtBy).toBeCalledTimes(1)
      expect(player.hurtBy).toBeCalledWith('REDRAW_CD')
    })
  })
})

