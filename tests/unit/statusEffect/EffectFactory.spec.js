import EffectFactory from '@/classes/statusEffect/EffectFactory'
import StatusEffect from '@/classes/statusEffect/StatusEffect'
import EffectWithCard from '@/classes/statusEffect/EffectWithCard'
import CyberAttack from '@/classes/statusEffect/CyberAttack'
import AttackWithBonus from '@/classes/statusEffect/AttackWithBonus'
import InvisibleBonusEffect from '@/classes/statusEffect/InvisibleBonusEffect'
import SqlEffect from '@/classes/statusEffect/SqlEffect'

jest.mock('@/classes/statusEffect/StatusEffect')
jest.mock('@/classes/statusEffect/EffectWithCard')
jest.mock('@/classes/statusEffect/CyberAttack')
jest.mock('@/classes/statusEffect/AttackWithBonus')
jest.mock('@/classes/statusEffect/InvisibleBonusEffect')
jest.mock('@/classes/statusEffect/SqlEffect')

describe('EffectFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating an effect factory object', () => {
    const fact = new EffectFactory('player')
    expect(fact.player).toEqual('player')
  })

  test('creating a new normal status effect', () => {
    const fact = new EffectFactory('player')
    fact._getTurns = jest.fn(() => { return 2 })
    
    const effect = fact.newEffect('type', 1, false)
    expect(fact._getTurns).toBeCalledTimes(1)
    expect(fact._getTurns).toBeCalledWith('type', 1)
    expect(StatusEffect).toBeCalledTimes(1)
    expect(StatusEffect).toBeCalledWith('type', 'player', 2, false)
    expect(effect).toBeInstanceOf(StatusEffect)
  })

  test('creating a new normal status effect with an image', () => {
    const fact = new EffectFactory('player')
    fact._getTurns = jest.fn(() => { return 2 })
    
    const effect = fact.newEffect('type', 1)
    expect(fact._getTurns).toBeCalledTimes(1)
    expect(fact._getTurns).toBeCalledWith('type', 1)
    expect(StatusEffect).toBeCalledTimes(1)
    expect(StatusEffect).toBeCalledWith('type', 'player', 2, true)
    expect(effect).toBeInstanceOf(StatusEffect)
  })

  test('creating a new positive effect from a card', () => {
    const fact = new EffectFactory('player')
    fact._getTurns = jest.fn(() => { return 2 })
    const card = { type: 'SCAN' }
    
    const effect = fact.newPositiveFromCard(card, 1)
    expect(fact._getTurns).toBeCalledTimes(1)
    expect(fact._getTurns).toBeCalledWith(card.type, 1)
    expect(EffectWithCard).toBeCalledTimes(1)
    expect(EffectWithCard).toBeCalledWith(card, 'player', 2)
    expect(effect).toBeInstanceOf(EffectWithCard)
  })

  describe('newNegativeFromCard', () => {
    test('when card is an SQL injection', () => {
      const fact = new EffectFactory('player')
      fact._getTurns = jest.fn(() => { return 2 })
      fact._getPenalty = jest.fn(() => { return -2 })
      fact._getBonus = jest.fn(() => { return 0 })

      const card = { type: 'SQL_INJECTION' }
      const effect = fact.newNegativeFromCard(card, 1, 'attacker')

      expect(fact._getTurns).toBeCalledTimes(1)
      expect(fact._getTurns).toBeCalledWith(card.type, 1)
      expect(fact._getPenalty).toBeCalledTimes(1)
      expect(fact._getPenalty).toBeCalledWith(card.type)
      expect(fact._getBonus).toBeCalledTimes(1)
      expect(fact._getBonus).toBeCalledWith(card.type)

      expect(SqlEffect).toBeCalledTimes(1)
      expect(SqlEffect).toBeCalledWith(card, 'player', 2, 'attacker', -2)
      expect(effect).toBeInstanceOf(SqlEffect)
    })

    test('when card also adds a bonus effect', () => {
      const fact = new EffectFactory('player')
      fact._getTurns = jest.fn(() => { return 2 })
      fact._getPenalty = jest.fn(() => { return -10 })
      fact._getBonus = jest.fn(() => { return 10 })

      const card = { type: 'RANSOM' }
      const effect = fact.newNegativeFromCard(card, 1, 'attacker')

      expect(InvisibleBonusEffect).toBeCalledTimes(1)
      expect(InvisibleBonusEffect).toBeCalledWith(card.type, 'player', 2, 10)
      const bonusInstance = InvisibleBonusEffect.mock.instances[0]

      expect(AttackWithBonus).toBeCalledTimes(1)
      expect(AttackWithBonus).toBeCalledWith(
        card, 'player', 2, 'attacker', -10, bonusInstance)
      expect(effect).toBeInstanceOf(AttackWithBonus)
    })

    test('when the card is any other cyber attack', () => {
      const fact = new EffectFactory('player')
      fact._getTurns = jest.fn(() => { return 2 })
      fact._getPenalty = jest.fn(() => { return 0 })
      fact._getBonus = jest.fn(() => { return 0 })

      const card = { type: 'DDOS' }
      const effect = fact.newNegativeFromCard(card, 1, 'attacker')

      expect(CyberAttack).toBeCalledTimes(1)
      expect(CyberAttack).toBeCalledWith(card, 'player', 2, 'attacker', 0)
      expect(effect).toBeInstanceOf(CyberAttack)
    })
  })

  test('getting a penalty given a type', () => {
    const fact = new EffectFactory('player')
    expect(fact._getPenalty('RANSOM')).toEqual(-10)
    expect(fact._getPenalty('DDOS')).toEqual(0)
  })

  test('getting a penalty given a type', () => {
    const fact = new EffectFactory('player')
    expect(fact._getBonus('RANSOM')).toEqual(10)
    expect(fact._getBonus('DDOS')).toEqual(0)
  })

  test('getting the number of turns for an effect', () => {
    const fact = new EffectFactory('player')
    expect(fact._getTurns('DDOS', 5)).toEqual(8)
    expect(fact._getTurns('RANSOM', 0)).toEqual(-1)
  })
})
