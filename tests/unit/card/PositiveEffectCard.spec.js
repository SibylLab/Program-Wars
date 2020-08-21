import PositiveEffectCard from '@/classes/card/PositiveEffectCard'
import EffectFactory from '@/classes/statusEffect/EffectFactory'

jest.mock('@/classes/statusEffect/EffectFactory')

describe('PositiveEffectCard', () => {
  test('creating a new positive effect card', () => {
    const card = new PositiveEffectCard('SCAN', 'deck')
    expect(card.value).toEqual(0)
    expect(card.type).toEqual('SCAN')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/scan.png')
  })

  describe('play', () => {
    // runs the implicit else branch and tests the common portion
    // for creating and adding the effects
    test('when card has no special effect beyond adding it', () => {
      const newPos = jest.fn(() => { return 'new positive effect' })
      EffectFactory.mockImplementationOnce(() => {
        return { newPositiveFromCard: newPos }
      })

      const card = new PositiveEffectCard('SCAN', 'deck')
      const target = {
        effects: { addPositive: jest.fn() },
        helpedBy: jest.fn(() => { return false })
      }
      card.play({ target })

      expect(EffectFactory).toBeCalledTimes(1)
      expect(EffectFactory).toBeCalledWith(target)
      expect(newPos).toBeCalledTimes(1)
      expect(newPos).toBeCalledWith(card, 1)
      expect(target.effects.addPositive).toBeCalledTimes(1)
      expect(target.effects.addPositive).toBeCalledWith('new positive effect')
    })

    test('when card is an Antivirus', () => {
      const card = new PositiveEffectCard('ANTIVIRUS', 'deck')
      const effects = {
        addPositive: jest.fn(),
        cleanMalware: jest.fn(),
      }
      const target = {
        effects,
        hand: { cleanMimics: jest.fn() },
        playField: { cleanViruses: jest.fn() },
        helpedBy: jest.fn(() => { return false })
      }
      card.play({ target })

      expect(target.hand.cleanMimics).toBeCalledTimes(1)
      expect(target.playField.cleanViruses).toBeCalledTimes(1)
      expect(effects.cleanMalware).toBeCalledTimes(1)
    })

    test('when card is a firewall', () => {
      const card = new PositiveEffectCard('FIREWALL', 'deck')
      const effects = {
        addPositive: jest.fn(),
        cleanHacks: jest.fn()
      }
      const target = {
        effects,
        helpedBy: jest.fn(() => { return false })
      }
      card.play({ target })

      expect(effects.cleanHacks).toBeCalledTimes(1)
    })

    test('when there is a mistake and the target already has effect', () => {
      const card = new PositiveEffectCard('SCAN', 'deck')
      card.discard = jest.fn()
      const target = { helpedBy: jest.fn(() => { return true }) }
      card.play({ target })

      expect(target.helpedBy).toBeCalledTimes(1)
      expect(target.helpedBy).toBeCalledWith(card.type)
      expect(card.discard).toBeCalledTimes(1)
    })
  })
})
