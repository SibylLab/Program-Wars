import { allocate, buildCardTypes } from '@/classes/deck/distributionBuilder'
import cardCatalog from '@/classes/deck/cardCatalog'
import { DEFAULT_DISTRIBUTION } from '@/classes/deck/distributionConfig'

// Sums the `num` of every row whose type is in the given list.
function countTypes (cardTypes, types) {
  return cardTypes
    .filter(c => types.includes(c.type))
    .reduce((acc, c) => acc + c.num, 0)
}

// Sums the `num` of every row of a single type.
function countType (cardTypes, type) {
  return countTypes(cardTypes, [type])
}

describe('allocate', () => {
  test('parts always sum exactly to the total', () => {
    const result = allocate(72, [
      { key: 'a', weight: 50 },
      { key: 'b', weight: 32 },
      { key: 'c', weight: 12 },
      { key: 'd', weight: 6 }
    ])
    const sum = [...result.values()].reduce((a, n) => a + n, 0)
    expect(sum).toBe(72)
  })

  test('splits evenly weighted items as evenly as possible', () => {
    const result = allocate(9, [
      { key: 'a', weight: 1 },
      { key: 'b', weight: 1 },
      { key: 'c', weight: 1 }
    ])
    expect([...result.values()]).toEqual([3, 3, 3])
  })

  test('returns all zeros for a zero total', () => {
    const result = allocate(0, [{ key: 'a', weight: 5 }])
    expect(result.get('a')).toBe(0)
  })

  test('returns all zeros when every weight is zero', () => {
    const result = allocate(10, [{ key: 'a', weight: 0 }, { key: 'b', weight: 0 }])
    expect([...result.values()]).toEqual([0, 0])
  })
})

describe('buildCardTypes with the default distribution', () => {
  const cardTypes = buildCardTypes(DEFAULT_DISTRIBUTION, cardCatalog)

  test('total card count equals the configured deck size', () => {
    const total = cardTypes.reduce((acc, c) => acc + c.num, 0)
    expect(total).toBe(DEFAULT_DISTRIBUTION.deckSize)
  })

  test('every row has a positive count and a catalog-valid value', () => {
    for (const { type, val, num } of cardTypes) {
      expect(num).toBeGreaterThan(0)
      expect(cardCatalog[type]).toContain(val)
    }
  })

  test('tiers are ordered component > defensive > attacking > destructive', () => {
    const component = countTypes(cardTypes, ['MODEL', 'VIEW', 'CONTROLLER'])
    const defensive = countTypes(cardTypes, ['METHOD', 'INTERFACE', 'POLYMORPHISM', 'ERROR_HANDLING', 'LOGGER', 'GIT'])
    const attacking = countTypes(cardTypes, ['CSRF', 'DOS', 'MALWARE', 'SQL_INJECTION', 'UNAUTHORIZED_ACCESS', 'XSS', 'RANSOM'])
    const destructive = countTypes(cardTypes, ['BUG', 'DISASTER'])

    expect(component).toBeGreaterThan(defensive)
    expect(defensive).toBeGreaterThan(attacking)
    expect(attacking).toBeGreaterThan(destructive)
  })

  test('MODEL is the most common component', () => {
    expect(countType(cardTypes, 'MODEL')).toBeGreaterThan(countType(cardTypes, 'CONTROLLER'))
    expect(countType(cardTypes, 'MODEL')).toBeGreaterThan(countType(cardTypes, 'VIEW'))
  })

  test('METHOD stays plentiful so stacks remain startable', () => {
    expect(countType(cardTypes, 'METHOD')).toBe(11)
  })

  test('GIT is the rarest defensive card', () => {
    const git = countType(cardTypes, 'GIT')
    for (const type of ['METHOD', 'INTERFACE', 'POLYMORPHISM', 'ERROR_HANDLING', 'LOGGER']) {
      expect(git).toBeLessThanOrEqual(countType(cardTypes, type))
    }
    expect(git).toBe(1)
  })

  test('destructive cards appear at most a couple of times each', () => {
    for (const type of ['BUG', 'DISASTER']) {
      expect(countType(cardTypes, type)).toBeLessThanOrEqual(2)
    }
  })

  test('component cards are spread across their variants', () => {
    const modelVariants = cardTypes.filter(c => c.type === 'MODEL')
    expect(modelVariants.length).toBeGreaterThan(1)
  })
})

describe('buildCardTypes error handling', () => {
  test('throws when a card type has no catalog variants', () => {
    const distribution = {
      deckSize: 4,
      categories: {
        mystery: { share: 100, cards: { NONEXISTENT: 1 } }
      }
    }
    expect(() => buildCardTypes(distribution, cardCatalog)).toThrow(/no catalog variants/)
  })
})
