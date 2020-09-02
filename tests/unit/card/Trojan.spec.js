import Trojan from '@/classes/card/Trojan'
import MimicWrapper from '@/classes/card/MimicWrapper'

jest.mock('@/classes/card/MimicWrapper')

const mockMath = Object.create(global.Math);
mockMath.random = jest.fn(() => { return 0 })
global.Math = mockMath;

describe('Trojan', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new Trojan card', () => {
    const card = new Trojan('deck')
    expect(card.getValue()).toEqual(0)
    expect(card.type).toEqual('TROJAN')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/trojan.png')
  })

  describe('play', () => {
    test('when target is helped by scan', () => {
      const card = new Trojan('deck')
      card._blockedByScan = jest.fn()
      card.discard = jest.fn()

      const target = { helpedBy: jest.fn(() => { return true }) }
      const player = 'player'
      const playInfo = { target, player }

      card.play(playInfo)

      expect(target.helpedBy).toBeCalledTimes(1)
      expect(target.helpedBy).toBeCalledWith('SCAN')
      expect(card._blockedByScan).toBeCalledTimes(1)
      expect(card._blockedByScan).toBeCalledWith(playInfo)
      expect(card.discard).toBeCalledTimes(1)
    })

    test('when trojan can be played', () => {
      const card = new Trojan('deck')
      card._mimicCard = jest.fn()

      const target = {
        helpedBy: jest.fn(() => { return false }),
        protectedFrom: jest.fn(() => { return false }),
        hand: 'hand'
      }
      const player = 'player'
      const playInfo = { target, player }

      card.play(playInfo)

      expect(target.protectedFrom).toBeCalledTimes(1)
      expect(target.protectedFrom).toBeCalledWith(card.type)
      expect(card._mimicCard).toBeCalledTimes(1)
      expect(card._mimicCard).toBeCalledWith(target.hand, player)
    })

    test('when target is protected', () => {
      const card = new Trojan('deck')
      card.discard = jest.fn()

      const target = {
        helpedBy: jest.fn(() => { return false }),
        protectedFrom: jest.fn(() => { return true })
      }
      const player = 'player'
      const playInfo = { target, player }

      card.play(playInfo)

      expect(card.discard).toBeCalledTimes(1)
    })
  })

  describe('_mimicCard', () => {
    test('when there is a card to mimic', () => {
      const card = new Trojan('deck')
      const handCard = { isMimic: false }
      const hand = { cards: [handCard] }

      card._mimicCard(hand, 'player')

      expect(MimicWrapper).toBeCalledTimes(1)
      expect(MimicWrapper).toBeCalledWith(handCard, card, 'player')
      const mimicInstance = MimicWrapper.mock.instances[0]
      expect(hand.cards[0]).toBe(mimicInstance)
    })

    test('when there is no card to mimic', () => {
      const card = new Trojan('deck')
      const hand = {
        cards: [{ isMimic: true }]
      }

      card._mimicCard(hand, 'player')
      expect(MimicWrapper).not.toHaveBeenCalled()
    })
  })
})
