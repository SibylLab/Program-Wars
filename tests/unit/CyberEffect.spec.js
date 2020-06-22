import CyberEffect from '@/classes/game/CyberEffect'

describe('CyberEffect', () => {
  test('constructor functions as expected', () => {
    let effect = new CyberEffect("RANSOM", 1, 2)
    expect(effect.type).toEqual("RANSOM")
    expect(effect.targetId).toEqual(1)
    expect(effect.attackerId).toEqual(2)
    expect(effect.id).toBeDefined()
    expect(effect.turnsLeft).toBeUndefined()
    expect(effect.image).toEqual('static/cardImages/effects/RANSOM.png')
  })
  test('constructor sets up turn delay for spyware', () => {
    let effect = new CyberEffect("SPYWARE", 1, 2)
    expect(effect.turnsLeft).toEqual(2)
  })
  test('take turn when turns left is greater than 0', () => {
    let effect = new CyberEffect("SPYWARE", 1, 2)
    expect(effect.takeTurn()).toEqual(1)
    expect(effect.turnsLeft).toEqual(1)
  })
  test('take turn when turns left is 0', () => {
    let effect = new CyberEffect("SPYWARE", 1, 2)
    effect.takeTurn()
    effect.takeTurn()
    expect(effect.takeTurn()).toEqual(0)
    expect(effect.turnsLeft).toEqual(0)
    expect(effect.takeTurn()).toEqual(0)
    expect(effect.turnsLeft).toEqual(0)
  })
  test('take turn when turns left is undefined', () => {
    let effect = new CyberEffect("RANSOM", 1, 2)
    expect(effect.takeTurn()).toEqual(9999)
    expect(effect.turnsLeft).toBeUndefined()
  })
})
