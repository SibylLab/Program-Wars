import Scan from '@/classes/card/Scan'
import EffectFactory from '@/classes/statusEffect/EffectFactory'

jest.mock('@/classes/statusEffect/EffectFactory')

function mockGetAttacks ({ effects, virusStacks, mimics }) {
  return jest.fn(() => {
    return {
      effects: effects || [],
      virusStacks: virusStacks || [],
      mimics: mimics || []
    }
  })
}

describe('Scan', () => {
  test('creating a new scan card', () => {
    const card = new Scan('deck')
    expect(card.getValue()).toEqual(0)
    expect(card.type).toEqual('SCAN')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/scan.png')
  })

  describe('play', () => {
    test('when target type is stack', () => {
      const card = new Scan('deck')
      card.discard = jest.fn()

      const player = 'player'
      const virus = { discard: jest.fn() }
      const target = { popTop: jest.fn(() => { return virus }) }
      const targetType = 'stack'

      card.play({ player, target, targetType })

      expect(target.popTop).toBeCalledTimes(1)
      expect(virus.discard).toBeCalledTimes(1)
      expect(card.discard).toBeCalledTimes(1)
    })

    test('when target type is mimic', () => {
      const card = new Scan('deck')
      card.discard = jest.fn()

      const player = { hand: { removeCard: jest.fn() } }
      const target = { discard: jest.fn() }
      const targetType = 'mimic'

      card.play({ player, target, targetType })

      expect(player.hand.removeCard).toBeCalledTimes(1)
      expect(player.hand.removeCard).toBeCalledWith(target)
      expect(target.discard).toBeCalledTimes(1)
      expect(card.discard).toBeCalledTimes(1)
    })

    test('when target type is effect', () => {
      const card = new Scan('deck')
      card.discard = jest.fn()

      const player = { effects: { removeEffect: jest.fn() } }
      const target = 'target'
      const targetType = 'effect'

      card.play({ player, target, targetType })

      expect(player.effects.removeEffect).toBeCalledTimes(1)
      expect(player.effects.removeEffect).toBeCalledWith(target)
      expect(card.discard).toBeCalledTimes(1)
    })

    test('when target type is player', () => {
      const card = new Scan('deck')
      card._canAddScan = jest.fn(() => { return true })

      const player = 'player'
      const target = { effects: { addPositive: jest.fn() } }
      const targetType = 'player'

      card.play({ player, target, targetType })

      expect(target.effects.addPositive).toBeCalledTimes(1)
      expect(EffectFactory).toBeCalledTimes(1)
      expect(EffectFactory).toBeCalledWith(target)

      const factInstance = EffectFactory.mock.instances[0]
      expect(factInstance.newPositiveFromCard).toBeCalledTimes(1)
      expect(factInstance.newPositiveFromCard).toBeCalledWith(card, 0)
    })

    test('when target type is invalid', () => {
      const card = new Scan('deck')
      card.discard = jest.fn()
      card.play({ player: 'player', target: 'target', targetType: 'invalid_type' })
      expect(card.discard).toBeCalledTimes(1)
    })
  })

  describe('_canAddScan', () => {
    test('with no attacks', () => {
      const card = new Scan('deck')
      const target = { getAllAttacks: mockGetAttacks({}) }
      expect(card._canAddScan(target)).toBeTruthy()
    })

    test('with an effect', () => {
      const card = new Scan('deck')
      const target = { getAllAttacks: mockGetAttacks({ effects: ['effect'] }) }
      expect(card._canAddScan(target)).toBeFalsy()
    })

    test('with a virus stack', () => {
      const card = new Scan('deck')
      const target = { getAllAttacks: mockGetAttacks({ virusStacks: ['virus'] }) }
      expect(card._canAddScan(target)).toBeFalsy()
    })

    test('with a mimics', () => {
      const card = new Scan('deck')
      const target = { getAllAttacks: mockGetAttacks({ mimics: ['mimic'] }) }
      expect(card._canAddScan(target)).toBeFalsy()
    })
  })
})
