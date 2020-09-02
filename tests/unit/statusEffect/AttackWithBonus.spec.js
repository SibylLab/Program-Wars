import AttackWithBonus from '@/classes/statusEffect/AttackWithBonus'
import CyberAttack from '@/classes/statusEffect/CyberAttack'

describe('AttackWithBonus', () => {
  test('creating a new effect', () => {
    const attacker = { effects: { addPositive: jest.fn() } }
    const effect = new AttackWithBonus('card', 'player', 3, attacker, -10, 'bonus')

    expect(effect.card).toEqual('card')
    expect(effect.player).toEqual('player')
    expect(effect.turnsLeft).toEqual(3)
    expect(effect.attacker).toEqual(attacker)
    expect(effect.penalty).toEqual(-10)
    expect(effect.bonusEffect).toEqual('bonus')

    expect(attacker.effects.addPositive).toBeCalledTimes(1)
    expect(attacker.effects.addPositive).toBeCalledWith('bonus')
  })

  test('destroying the effect', () => {
    const superDestroy = jest.spyOn(CyberAttack.prototype, 'destroy').mockImplementation()
    const attacker = {
      effects: { addPositive: jest.fn(), removeEffect: jest.fn() }
    }
    const effect = new AttackWithBonus('card', 'player', 3, attacker, -10, 'bonus')
    effect.destroy()

    expect(superDestroy).toBeCalledTimes(1)
    expect(attacker.effects.removeEffect).toBeCalledTimes(1)
    expect(attacker.effects.removeEffect).toBeCalledWith(effect.bonusEffect)

    superDestroy.mockRestore()
  })
})

