import Virus from '@/classes/card/Virus'

describe('Virus class', () => {
  const deck = { discard: jest.fn() }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new sort card', () => {
    const card = new Virus(deck)
    expect(card.getValue()).toEqual(0)
    expect(card.type).toEqual('VIRUS')
    expect(card.deck).toEqual(deck)
    expect(card.image).toEqual('static/cardImages/virus.png')
  })

  describe('play', () => {
    test('when target stack owner is helped by Scan', () => {
      const player = { helpedBy: jest.fn(() => { return true }) }
      const playInfo = { stack: { player } }

      const card = new Virus(deck)
      card._blockedByScan = jest.fn()
      card.play(playInfo)

      expect(player.helpedBy).toBeCalledTimes(1)
      expect(player.helpedBy).toBeCalledWith('SCAN')
      expect(card._blockedByScan).toBeCalledTimes(1)
      expect(card._blockedByScan).toBeCalledWith(playInfo)
      expect(deck.discard).toBeCalledTimes(1)
    })

    test('when virus can be played on the target stack', () => {
      const player = {
        helpedBy: () => { return false },
        protectedFrom: jest.fn(() => { return false })
      }
      const stack = {
        player,
        getTop: jest.fn(() => { return { type: 'REPEAT' } }),
        addCard: jest.fn()
      }
      const playInfo = { stack }

      const card = new Virus(deck)
      card.play(playInfo)

      expect(stack.getTop).toBeCalledTimes(1)
      expect(player.protectedFrom).toBeCalledTimes(1)
      expect(player.protectedFrom).toBeCalledWith('VIRUS')
      expect(stack.addCard).toBeCalledTimes(1)
      expect(stack.addCard).toBeCalledWith(card)
    })

    test('when the virus could not be added to the target stack', () => {
      const player = {
        helpedBy: () => { return false },
        protectedFrom: () => { return false }
      }
      const stack = {
        player,
        getTop: jest.fn(() => { return { type: 'VIRUS' } }),
      }
      const playInfo = { stack }

      const card = new Virus(deck)
      card.discard = jest.fn()
      card.play(playInfo)
      expect(card.discard).toBeCalledTimes(1)
    })
  })
})

