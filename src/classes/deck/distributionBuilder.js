/**
 * Turns a weighted card distribution config into the concrete list of card
 * types ({ type, val, num }) that a {@link Deck} is built from.
 *
 * The distribution is resolved in three proportional passes:
 *   1. Split `deckSize` across the categories by their `share`.
 *   2. Split each category's cards across its types by their `weight`.
 *   3. Spread each type's cards evenly across its variants from the catalog.
 *
 * All three passes use the largest-remainder method so the integer parts always
 * sum exactly to the amount being divided (no cards lost or gained to rounding).
 *
 * @module distributionBuilder
 */

/**
 * Allocates an integer `total` across weighted items so the parts sum exactly
 * to `total` (largest-remainder / Hamilton method).
 *
 * @param {int} total - The non-negative integer amount to split.
 * @param {Array<{key: *, weight: number}>} items - Items with non-negative weights.
 * @return {Map<*, int>} Map of each item key to its allocated integer count.
 */
function allocate (total, items) {
  const result = new Map(items.map(item => [item.key, 0]))
  const weightSum = items.reduce((acc, item) => acc + item.weight, 0)
  if (weightSum <= 0 || total <= 0) {
    return result
  }

  const parts = items.map(item => {
    const exact = (total * item.weight) / weightSum
    const base = Math.floor(exact)
    return { key: item.key, count: base, remainder: exact - base }
  })

  let leftover = total - parts.reduce((acc, part) => acc + part.count, 0)

  // Hand out the remaining units to the largest fractional remainders first.
  parts.sort((a, b) => b.remainder - a.remainder)
  for (let i = 0; i < parts.length && leftover > 0; i++, leftover--) {
    parts[i].count += 1
  }

  parts.forEach(part => result.set(part.key, part.count))
  return result
}

/**
 * Builds the full { type, val, num } list for a deck from a distribution config
 * and a catalog of per-type variants.
 *
 * @param {Object} distribution - The distribution config. See
 *   {@link module:distributionConfig} and `public/cardDistribution.json`.
 * @param {int} distribution.deckSize - Target number of cards in the deck.
 * @param {Object} distribution.categories - Map of category name to
 *   `{ share, cards }`, where `cards` maps a card type to its weight.
 * @param {Object} catalog - Map of card type to an array of its variant values.
 * @return {Array<{type: string, val: (string|int), num: int}>} Card types ready
 *   for the {@link Deck} constructor.
 */
function buildCardTypes (distribution, catalog) {
  const { deckSize, categories } = distribution
  const cardTypes = []

  // Pass 1: split the deck across categories by share.
  const categoryCounts = allocate(
    deckSize,
    Object.entries(categories).map(([name, cat]) => ({ key: name, weight: cat.share }))
  )

  for (const [categoryName, category] of Object.entries(categories)) {
    const categoryTotal = categoryCounts.get(categoryName)
    if (categoryTotal <= 0) {
      continue
    }

    // Pass 2: split a category's cards across its types by weight.
    const typeCounts = allocate(
      categoryTotal,
      Object.entries(category.cards).map(([type, weight]) => ({ key: type, weight }))
    )

    for (const [type, typeTotal] of typeCounts) {
      if (typeTotal <= 0) {
        continue
      }
      const variants = catalog[type]
      if (!variants || variants.length === 0) {
        throw new Error(`distributionBuilder: no catalog variants for card type "${type}"`)
      }

      // Pass 3: spread a type's cards evenly across its variants.
      const variantCounts = allocate(
        typeTotal,
        variants.map(val => ({ key: val, weight: 1 }))
      )

      for (const [val, num] of variantCounts) {
        if (num > 0) {
          cardTypes.push({ type, val, num })
        }
      }
    }
  }

  return cardTypes
}

export { allocate, buildCardTypes }
