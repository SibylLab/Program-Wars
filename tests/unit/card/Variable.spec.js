import Variable from '@/classes/card/Variable'

describe('Variable', () => {
  test('creating a new variable card', () => {
    const card = new Variable(4, 'deck')
    expect(card.value).toEqual(4)
    expect(card.type).toEqual('VARIABLE')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/variable4.png')
  })

  describe('play', () => {
    test('when top of stack is Rx', () => {
      const card = new Variable(4, 'deck')
      const stack = {
        player: { playField: { addCardToStack: jest.fn() } },
        topIsRx: jest.fn(() => { return true })
      }
      card.play({ stack })

      expect(stack.topIsRx).toBeCalledTimes(1)
      expect(stack.player.playField.addCardToStack).toBeCalledTimes(1)
      expect(stack.player.playField.addCardToStack).toBeCalledWith(card, stack)
    })

    test('when a variable is being replaced', () => {
      const card = new Variable(4, 'deck')
      const replacedCard = { discard: jest.fn() }
      const stack = {
        willAccept: jest.fn(() => { return true }),
        topIsRx: jest.fn(() => { return false }),
        replaceLowestVar: jest.fn(() => { return replacedCard })
      }
      card.play({ stack })

      expect(stack.topIsRx).toBeCalledTimes(1)
      expect(stack.willAccept).toBeCalledTimes(1)
      expect(stack.willAccept).toBeCalledWith(card)
      expect(stack.replaceLowestVar).toBeCalledTimes(1)
      expect(stack.replaceLowestVar).toBeCalledWith(card)
      expect(replacedCard.discard).toBeCalledTimes(1)
    })

    test('when a mistake was made and the card cant be added', () => {
      const card = new Variable(4, 'deck')
      card.discard = jest.fn()
      const stack = {
        willAccept: jest.fn(() => { return false }),
        topIsRx: jest.fn(() => { return false })
      }
      card.play({ stack })

      expect(stack.topIsRx).toBeCalledTimes(1)
      expect(stack.willAccept).toBeCalledTimes(1)
      expect(stack.willAccept).toBeCalledWith(card)
      expect(card.discard).toBeCalledTimes(1)
    })
  })
})
