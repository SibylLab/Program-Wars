import CyberAttack from '@/classes/statusEffect/CyberAttack'

describe('CyberAttack', () => {
  test('creating a new effect', () => {
    const effect = new CyberAttack('card', 'player', 3, 'attacker', -10)
    expect(effect.card).toEqual('card')
    expect(effect.player).toEqual('player')
    expect(effect.turnsLeft).toEqual(3)
    expect(effect.attacker).toEqual('attacker')
    expect(effect.penalty).toEqual(-10)
  })

  test('getting the penalty', () => {
    const effect = new CyberAttack('card', 'player', 3, 'attacker', -10)
    expect(effect.getPenalty()).toEqual(-10)
  })
})


