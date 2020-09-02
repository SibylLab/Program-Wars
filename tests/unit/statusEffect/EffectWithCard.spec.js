import EffectWithCard from '@/classes/statusEffect/EffectWithCard'
import StatusEffect from '@/classes/statusEffect/StatusEffect'

describe('EffectWithCard', () => {
  test('creating a new effect', () => {
    const effect = new EffectWithCard('card', 'player', 3)
    expect(effect.card).toEqual('card')
    expect(effect.player).toEqual('player')
    expect(effect.turnsLeft).toEqual(3)
  })

  test('destroying the effect', () => {
    const superDestroy = jest.spyOn(StatusEffect.prototype, 'destroy')
    const card = { discard: jest.fn() }
    const effect = new EffectWithCard(card, 'player', 3)

    effect.destroy()
    expect(card.discard).toBeCalledTimes(1)
    expect(superDestroy).toBeCalledTimes(1)
  })
})

