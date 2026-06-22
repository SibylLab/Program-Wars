import DefensiveMultiplier from '@/classes/card/DefensiveMultiplier'

describe('DefensiveMultiplier class', () => {
  test('creating a new defensive multiplier card', () => {
    const card = new DefensiveMultiplier('INTERFACE', 'deck')
    expect(card.getValue()).toEqual(2)
    expect(card.type).toEqual('INTERFACE')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/defensive/interface.png')
  })

  describe('play', () => {
    test('when the target stack is not complete and not a method stack', () => {
      const playField = { addCardToStack: jest.fn() }
      const playInfo = {
        stack: {
          isMethod: false,
          player: { playField },
          isComplete: () => { return false }
        }
      }

      const card = new DefensiveMultiplier('INTERFACE', 'deck')
      card.play(playInfo)

      expect(playField.addCardToStack).toBeCalledTimes(1)
      expect(playField.addCardToStack).toBeCalledWith(card, playInfo.stack)
    })

    test('when the target stack is complete', () => {
      const playInfo = {
        stack: { isMethod: false, isComplete: () => { return true } }
      }

      const card = new DefensiveMultiplier('GIT', 'deck')
      card.discard = jest.fn()
      card.play(playInfo)

      expect(card.discard).toBeCalledTimes(1)
    })

    test('when the target stack is a method stack', () => {
      const playInfo = {
        stack: { isMethod: true, isComplete: () => { return false } }
      }

      const card = new DefensiveMultiplier('ERROR_HANDLING', 'deck')
      card.discard = jest.fn()
      card.play(playInfo)

      expect(card.discard).toBeCalledTimes(1)
    })
  })
})
