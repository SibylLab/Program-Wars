import StatusEffect from '@/classes/statusEffect/StatusEffect'

jest.mock('uuid/v1', () => jest.fn(() => { return "mocked_id" }))

describe('StatusEffect', () => {
  test('creating a new status effect for a card effect', () => {
    const effect = new StatusEffect('RANSOM', 'player', 3)
    expect(effect.id).toEqual('mocked_id')
    expect(effect.type).toEqual('RANSOM')
    expect(effect.player).toEqual('player')
    expect(effect.turnsLeft).toEqual(3)
    expect(effect.image).toEqual('static/cardImages/effects/RANSOM.png')
  })

  test('creating a new status effect with no image', () => {
    const effect = new StatusEffect('REDRAW_CD', 'player', 3, false)
    expect(effect.image).toBeUndefined()
  })

  test('updating when turns left is > 0', () => {
    const effect = new StatusEffect('REDRAW_CD', 'player', 3, false)
    effect.update()
    expect(effect.turnsLeft).toEqual(2)
  })

  test('updating when turns left is 0', () => {
    const effect = new StatusEffect('REDRAW_CD', 'player', 0, false)
    effect.update()
    expect(effect.turnsLeft).toEqual(0)
  })

  test('checking if effect is active when turns left is > 0', () => {
    const effect = new StatusEffect('REDRAW_CD', 'player', 3, false)
    expect(effect.isActive()).toBeTruthy()
  })

  test('checking if effect is active when turns left is 0', () => {
    const effect = new StatusEffect('REDRAW_CD', 'player', 0, false)
    expect(effect.isActive()).toBeFalsy()
  })

  test('getting bonus is 0', () => {
    const effect = new StatusEffect('REDRAW_CD', 'player', 3, false)
    expect(effect.getBonus()).toEqual(0)
  })

  test('getting penalty is 0', () => {
    const effect = new StatusEffect('REDRAW_CD', 'player', 3, false)
    expect(effect.getPenalty()).toEqual(0)
  })
})
