import MimicWrapper from '@/classes/card/MimicWrapper'
import CardWrapper from '@/classes/card/CardWrapper'
import NegativeEffectCard from '@/classes/card/NegativeEffectCard'
import Virus from '@/classes/card/Virus'

jest.mock('@/classes/card/CardWrapper')
jest.mock('@/classes/card/NegativeEffectCard')
jest.mock('@/classes/card/Virus')

describe('MimicWrapper', () => {
  const player = { name: 'played_the_trojan' }
  const trojan = { discard: jest.fn() }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new mimic card wrapper', () => {
    const wrapper = new MimicWrapper('card', trojan, player)
    expect(CardWrapper).toBeCalledWith('card')
    expect(wrapper.trojan).toBe(trojan)
    expect(wrapper.player).toBe(player)
    expect(wrapper.isMimic).toBeTruthy()
  })

  test('discarding the mimic wrapper', () => {
    const wrapper = new MimicWrapper('card', trojan, player)
    wrapper.discard()

    const cardWrapperInstance = CardWrapper.mock.instances[0]
    expect(cardWrapperInstance.discard).toBeCalledTimes(1)
    expect(trojan.discard).toBeCalledTimes(1)
  })

  test('playing the mimic wrapper', () => {
    const discardSpy = jest.spyOn(MimicWrapper.prototype, 'discard')
    const replacement = { play: jest.fn() }
    const playInfo = { player: { name: 'played_the_mimic' } }

    const wrapper = new MimicWrapper('card', trojan, player)
    wrapper._replace = jest.fn(() => { return replacement })
    wrapper.play(playInfo)

    expect(wrapper._replace).toBeCalledTimes(1)
    expect(playInfo.target).toBe(playInfo.player)
    expect(playInfo.attacker).toBe(wrapper.player)
    expect(playInfo.replaced).toBeTruthy()
    expect(replacement.play).toBeCalledWith(playInfo)
    expect(discardSpy).toBeCalledTimes(1)
  })

  describe('_replace', () => {
    test('when the card type is repeat or variable', () => {
      const repeatWrapper = new MimicWrapper('card', trojan, player)
      const varWrapper = new MimicWrapper('card', trojan, player)
      // Super is mocked so we have to set wrapper.card manually (not ideal)
      repeatWrapper.card = { type: 'REPEAT' }
      varWrapper.card = { type: 'VARIABLE' }

      const replacedRepeat = repeatWrapper._replace()
      const replacedVar = varWrapper._replace()
      expect(Virus).toBeCalledTimes(2)
      expect(replacedRepeat.isExtra).toBeTruthy()
      expect(replacedVar.isExtra).toBeTruthy()
    })

    test('when the card type is base', () => {
      const wrapper = new MimicWrapper('card', trojan, player)
      // Super is mocked so we have to set wrapper.card manually (not ideal)
      wrapper.card = { type: 'METHOD' }

      const replacement = wrapper._replace()
      expect(NegativeEffectCard).toBeCalledTimes(1)
      expect(NegativeEffectCard).toBeCalledWith('STACK_OVERFLOW')
      expect(replacement.isExtra).toBeTruthy()
    })

    test('when the card type is attack', () => {
      const wrapper = new MimicWrapper('card', trojan, player)
      // Super is mocked so we have to set wrapper.card manually (not ideal)
      wrapper.card = { type: 'VIRUS' }

      const replacement = wrapper._replace()
      expect(NegativeEffectCard).toBeCalledTimes(1)
      expect(NegativeEffectCard).toBeCalledWith('STACK_UNDERFLOW')
      expect(replacement.isExtra).toBeTruthy()
    })

    test('when the card type is any other type', () => {
      const wrapper = new MimicWrapper('card', trojan, player)
      // Super is mocked so we have to set wrapper.card manually (not ideal)
      wrapper.card = { type: 'SCAN' }

      const replacement = wrapper._replace()
      expect(NegativeEffectCard).toBeCalledTimes(1)
      expect(NegativeEffectCard).toBeCalledWith('RANSOM')
      expect(replacement.isExtra).toBeTruthy()
    })
  })
})
