import Repeat from '@/classes/card/Repeat'

describe('Repeat class', () => {
  test('creating a new repeat card', () => {
    const card = new Repeat(2, 'deck')
    expect(card.getValue()).toEqual(2)
    expect(card.type).toEqual('REPEAT')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/repeat2.png')
  })

  describe('play', () => {
    test('when the target stack is not complete', () => {
      const playField = { addCardToStack: jest.fn() }
      const playInfo = {
        stack: {
          player: { playField },
          isComplete: () => { return false }
        }
      }

      const card = new Repeat(2, 'deck')
      card.play(playInfo)

      expect(playField.addCardToStack).toBeCalledTimes(1)
      expect(playField.addCardToStack).toBeCalledWith(card, playInfo.stack)
    })

    test('when the there is a mistake and the stack is complete', () => {
      const playInfo = {
        stack: { isComplete: () => { return true } }
      }

      const card = new Repeat(2, 'deck')
      card.discard = jest.fn()
      card.play(playInfo)

      expect(card.discard).toBeCalledTimes(1)
    })
  })
})
