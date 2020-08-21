import NegativeEffectCard from '@/classes/card/NegativeEffectCard'
import EffectFactory from '@/classes/statusEffect/EffectFactory'

jest.mock('@/classes/statusEffect/EffectFactory')

function fakeTarget ({ helped, hurt, protect }) {
  return {
    effects: { addNegative: jest.fn() },
    helpedBy: jest.fn(() => { return helped || false }),
    hurtBy: jest.fn(() => { return hurt || false }),
    protectedFrom: jest.fn(() => { return protect || false })
  }
}

describe('NegativeEffectCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new negative effect card', () => {
    const card = new NegativeEffectCard('RANSOM', 'deck')
    expect(card.value).toEqual(0)
    expect(card.type).toEqual('RANSOM')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/ransom.png')
  })

  describe('play', () => {
    test('player is protected by scan', () => {
      const card = new NegativeEffectCard('SPYWARE', 'deck')
      card._blockedByScan = jest.fn()
      card.discard = jest.fn()
      const target = fakeTarget({ helped: true })
      const playInfo = { target }
      card.play(playInfo)
      
      expect(target.helpedBy).toBeCalledTimes(1)
      expect(target.helpedBy).toBeCalledWith('SCAN')
      expect(card._blockedByScan).toBeCalledTimes(1)
      expect(card._blockedByScan).toBeCalledWith(playInfo)
      expect(card.discard).toBeCalledTimes(1)
    })

    test('when the effect can be added to the target', () => {
      const newNeg = jest.fn(() => { return 'new negative effect' })
      EffectFactory.mockImplementationOnce(() => {
        return { newNegativeFromCard: newNeg }
      })
      const card = new NegativeEffectCard('DDOS', 'deck')
      const target = fakeTarget({})
      const playInfo = { target, player: 'player', attacker: 'attacker' }
      card.play(playInfo)

      expect(EffectFactory).toBeCalledTimes(1)
      expect(EffectFactory).toBeCalledWith(target)
      expect(newNeg).toBeCalledTimes(1)
      expect(newNeg).toBeCalledWith(card, 0, 'player')
      expect(target.effects.addNegative).toBeCalledTimes(1)
      expect(target.effects.addNegative).toBeCalledWith('new negative effect')
    })

    test('when the effect is added from player playing a mimic', () => {
      const newNeg = jest.fn(() => { return 'new negative effect' })
      EffectFactory.mockImplementationOnce(() => {
        return { newNegativeFromCard: newNeg }
      })
      const card = new NegativeEffectCard('DDOS', 'deck')
      const target = fakeTarget({})
      const playInfo = { target, player: 'player', attacker: 'attacker', replaced: true }
      card.play(playInfo)

      expect(EffectFactory).toBeCalledTimes(1)
      expect(EffectFactory).toBeCalledWith(target)
      expect(newNeg).toBeCalledTimes(1)
      expect(newNeg).toBeCalledWith(card, 1, 'attacker')
      expect(target.effects.addNegative).toBeCalledTimes(1)
      expect(target.effects.addNegative).toBeCalledWith('new negative effect')
    })

    test('when a mistake was made and target is already hurt by effect', () => {
      const card = new NegativeEffectCard('SPYWARE', 'deck')
      card.discard = jest.fn()
      const target = fakeTarget({ hurt: true })
      card.play({ target })

      expect(target.hurtBy).toBeCalledTimes(1)
      expect(target.hurtBy).toBeCalledWith('SPYWARE')
      expect(target.helpedBy).not.toHaveBeenCalled()
      expect(card.discard).toBeCalledTimes(1)
    })

    test('when a mistake was made and target is protected from effect', () => {
      const card = new NegativeEffectCard('SPYWARE', 'deck')
      card.discard = jest.fn()
      const target = fakeTarget({ protect: true })
      card.play({ target })

      expect(target.hurtBy).toBeCalledTimes(1)
      expect(target.hurtBy).toBeCalledWith('SPYWARE')
      expect(target.protectedFrom).toBeCalledTimes(1)
      expect(target.protectedFrom).toBeCalledWith('SPYWARE')
      expect(target.helpedBy).not.toHaveBeenCalled()
      expect(card.discard).toBeCalledTimes(1)
    })
  })
})
