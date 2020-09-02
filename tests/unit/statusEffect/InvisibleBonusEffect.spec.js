import InvisibleBonusEffect from '@/classes/statusEffect/InvisibleBonusEffect'

describe('InvisibleBonusEffect', () => {
  test('creating a new effect', () => {
    const effect = new InvisibleBonusEffect('REDRAW_CD', 'player', 3, 0)
    expect(effect.type).toEqual('REDRAW_CD')
    expect(effect.player).toEqual('player')
    expect(effect.turnsLeft).toEqual(3)
    expect(effect.amount).toEqual(0)
  })

  test('getting the bonus of the effect', () => {
    const effect = new InvisibleBonusEffect('BONUS', 'player', 3, 10)
    expect(effect.getBonus()).toEqual(10)
  })
})
