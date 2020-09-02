import SqlEffect from '@/classes/statusEffect/SqlEffect'

describe('SqlEffect', () => {
  test('creating a new effect', () => {
    const method = { adjustment: 0 }
    const player = { playField: { method } }
    const effect = new SqlEffect('card', player, 3, 'attacker', -2)

    expect(effect.card).toEqual('card')
    expect(effect.player).toEqual(player)
    expect(effect.turnsLeft).toEqual(3)
    expect(effect.attacker).toEqual('attacker')
    expect(effect.penalty).toEqual(-2)

    expect(effect.method).toBe(method)
    expect(method.adjustment).toEqual(-2)
  })

  test('destroying the effect', () => {
    const method = { adjustment: 0 }
    const player = { playField: { method } }
    const card = { discard: jest.fn() }
    const effect = new SqlEffect(card, player, 3, 'attacker', -2)

    expect(method.adjustment).toEqual(-2)

    effect.destroy()
    expect(card.discard).toBeCalledTimes(1)
    expect(method.adjustment).toEqual(0)
  })
})

