import StatusEffects from '@/classes/statusEffect/StatusEffects'

function fakeEffect ({ type, left, bonus, penalty, attacker }) {
  return {
    type: type || "FAKE",
    turnsLeft: left || 0,
    update: jest.fn(),
    destroy: jest.fn(),
    getBonus: jest.fn(() => { return bonus || 0}),
    getPenalty: jest.fn(() => { return penalty || 0}),
    attacker: attacker || 'None'
  }
}

describe('StatusEffects', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new StatusEffects object', () => {
    const effects = new StatusEffects('player')
    expect(effects.player).toEqual('player')
    expect(effects.positive).toHaveLength(0)
    expect(effects.negative).toHaveLength(0)
  })

  test('updating the effects', () => {
    const effects = new StatusEffects('player')
    effects.updateEffects = jest.fn()
    effects.update()

    expect(effects.updateEffects).toBeCalledTimes(2)
    expect(effects.updateEffects).toBeCalledWith(effects.positive)
    expect(effects.updateEffects).toBeCalledWith(effects.negative)
  })

  test('updating a list of effects', () => {
    const effects = new StatusEffects('player')
    effects.removeEffect = jest.fn()

    const effectList = [
      fakeEffect({ left: 3 }),
      fakeEffect({ left: 0 }),
      fakeEffect({ left: 2})
    ]
    effects.updateEffects(effectList)

    expect(effectList[0].update).toBeCalledTimes(1)
    expect(effectList[1].update).toBeCalledTimes(1)
    expect(effectList[2].update).toBeCalledTimes(1)
    expect(effects.removeEffect).toBeCalledTimes(1)
    expect(effects.removeEffect).toBeCalledWith(effectList[1])
  })

  test('getting the score adjustments from the effects', () => {
    const pos = fakeEffect({})
    const bonus = fakeEffect({ bonus: 10 })

    const neg = fakeEffect({ type: 'SQL_INJECTION', penalty: -2 })
    const penalty = fakeEffect({ penalty: -5 })

    const effects = new StatusEffects('player')
    effects.positive = [pos, bonus]
    effects.negative = [neg, penalty]
    const total = effects.getScoreAdjustment()

    expect(pos.getBonus).toBeCalledTimes(1)
    expect(bonus.getBonus).toBeCalledTimes(1)
    expect(neg.getPenalty).not.toHaveBeenCalled()
    expect(penalty.getPenalty).toBeCalledTimes(1)
    expect(total).toEqual(5)
  })

  test('checking for a positive type', () => {
    const pos_1 = fakeEffect({ type: 'ANTIVIRUS' })
    const pos_2 = fakeEffect({ type: 'SCAN' })

    const effects = new StatusEffects('player')
    effects.positive = [pos_1, pos_2]

    expect(effects.hasPositive('ANTIVIRUS')).toBeTruthy()
    expect(effects.hasPositive('FIREWALL')).toBeFalsy()
    expect(effects.hasPositive('SCAN')).toBeTruthy()
  })

  describe('hasNegtive', () => {
    test('when there is no attacker', () => {
      const neg_1 = fakeEffect({ type: 'RANSOM' })
      const neg_2 = fakeEffect({ type: 'DDOS' })

      const effects = new StatusEffects('player')
      effects.negative = [neg_1, neg_2]

      expect(effects.hasNegative('RANSOM')).toBeTruthy()
      expect(effects.hasNegative('DDOS')).toBeTruthy()
      expect(effects.hasNegative('SQL_INJECTION')).toBeFalsy()
    })

    test('when there an attacker', () => {
      const neg_1 = fakeEffect({ type: 'RANSOM', attacker: 'Bill' })
      const neg_2 = fakeEffect({ type: 'RANSOM', attacker: 'Frank'})
      const neg_3 = fakeEffect({ type: 'DDOS', attacker: 'Frank'})

      const effects = new StatusEffects('player')
      effects.negative = [neg_1, neg_2, neg_3]

      expect(effects.hasNegative('RANSOM', 'Frank')).toBeTruthy()
      expect(effects.hasNegative('DDOS', 'Frank')).toBeTruthy()
      expect(effects.hasNegative('RANSOM', 'Frank')).toBeTruthy()
      expect(effects.hasNegative('DDOS', 'Bill')).toBeFalsy()
    })
  })

  describe('hasProtectionFrom', () => {
    test('when has antivirus effect', () => {
      const anti = fakeEffect({ type: 'ANTIVIRUS' })

      const effects = new StatusEffects('player')
      effects.positive = [anti]
      expect(effects.hasProtectionFrom('RANSOM')).toBeTruthy()
      expect(effects.hasProtectionFrom('DDOS')).toBeFalsy()
    })

    test('when has firewall effect', () => {
      const fire = fakeEffect({ type: 'FIREWALL' })

      const effects = new StatusEffects('player')
      effects.positive = [fire]
      expect(effects.hasProtectionFrom('VIRUS')).toBeFalsy()
      expect(effects.hasProtectionFrom('STACK_OVERFLOW')).toBeTruthy()
    })

    test('when has no protection', () => {
      const effects = new StatusEffects('player')
      expect(effects.hasProtectionFrom('SPYWARE')).toBeFalsy()
      expect(effects.hasProtectionFrom('SQL_INJECTION')).toBeFalsy()
    })
  })

  describe('addPositive', () => {
    test('when it can be added', () => {
      const pos_1 = fakeEffect({ type: 'ANTIVIRUS' })
      const effects = new StatusEffects('player')
      effects.addPositive(pos_1)

      expect(effects.positive[0]).toBe(pos_1)
    })

    test('when the effect is already present', () => {
      const pos_1 = fakeEffect({ type: 'ANTIVIRUS' })
      const effects = new StatusEffects('player')
      effects.positive = [pos_1]
      effects.addPositive(pos_1)

      expect(effects.positive[0]).toBe(pos_1)
      expect(effects.positive).toHaveLength(1)
    })
  })

  describe('addNegative', () => {
    test('when it can be added', () => {
      const neg_1 = fakeEffect({ type: 'RANSOM' })
      const effects = new StatusEffects('player')
      effects.addNegative(neg_1)

      expect(effects.negative[0]).toBe(neg_1)
    })

    test('when the effect type is already present', () => {
      const neg_1 = fakeEffect({ type: 'RANSOM' })
      const effects = new StatusEffects('player')
      effects.negative = [neg_1]
      effects.addNegative(neg_1)

      expect(effects.negative[0]).toBe(neg_1)
      expect(effects.negative).toHaveLength(1)
    })
  })

  test('removing a positive and negative effect', () => {
    const pos_1 = fakeEffect({ type: 'ANTIVIRUS' })
    const pos_2 = fakeEffect({ type: 'SCAN' })
    const neg_1 = fakeEffect({ type: 'RANSOM' })
    const neg_2 = fakeEffect({ type: 'DDOS' })

    const effects = new StatusEffects('player')
    effects.positive = [pos_1, pos_2]
    effects.negative = [neg_1, neg_2]
    effects.removeEffect(pos_1)
    effects.removeEffect(neg_2)

    expect(effects.positive[0]).toBe(pos_2)
    expect(effects.positive).toHaveLength(1)
    expect(effects.negative[0]).toBe(neg_1)
    expect(effects.negative).toHaveLength(1)
  })

  test('removing a positive type', () => {
    const pos_1 = fakeEffect({ type: 'ANTIVIRUS' })
    const pos_2 = fakeEffect({ type: 'ANTIVIRUS' })
    const pos_3 = fakeEffect({ type: 'SCAN' })
    
    const effects = new StatusEffects('player')
    effects.positive = [pos_1, pos_2, pos_3]
    effects.removePositiveType('ANTIVIRUS')

    expect(effects.positive[0]).toBe(pos_3)
    expect(effects.positive).toHaveLength(1)
  })

  test('removing a negative type', () => {
    const neg_1 = fakeEffect({ type: 'RANSOM' })
    const neg_2 = fakeEffect({ type: 'DDOS' })
    const neg_3 = fakeEffect({ type: 'RANSOM' })
    
    const effects = new StatusEffects('player')
    effects.negative = [neg_1, neg_2, neg_3]
    effects.removeNegativeType('RANSOM')

    expect(effects.negative[0]).toBe(neg_2)
    expect(effects.negative).toHaveLength(1)
  })

  test('cleaning malware effects', () => {
    const effects = new StatusEffects('player')
    effects.removeNegativeType = jest.fn()
    effects.cleanMalware()

    expect(effects.removeNegativeType).toBeCalledTimes(2)
    expect(effects.removeNegativeType).toBeCalledWith('RANSOM')
    expect(effects.removeNegativeType).toBeCalledWith('SPYWARE')
  })

  test('cleaning hack effects', () => {
    const effects = new StatusEffects('player')
    effects.removeNegativeType = jest.fn()
    effects.cleanHacks()

    expect(effects.removeNegativeType).toBeCalledTimes(4)
    expect(effects.removeNegativeType).toBeCalledWith('STACK_OVERFLOW')
    expect(effects.removeNegativeType).toBeCalledWith('STACK_UNDERFLOW')
    expect(effects.removeNegativeType).toBeCalledWith('SQL_INJECTION')
    expect(effects.removeNegativeType).toBeCalledWith('DDOS')
  })
})
