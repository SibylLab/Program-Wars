/**
 * Holds the active card distribution config and loads the live override from
 * `public/cardDistribution.json` at startup.
 *
 * The game can be re-balanced by editing `public/cardDistribution.json` and
 * reloading - no rebuild needed. Because Vite does not bundle files in
 * `public/`, the config is fetched at runtime. `DEFAULT_DISTRIBUTION` below is
 * the in-code fallback used before the fetch resolves, when the fetch fails, or
 * in tests. Keep it in sync with `public/cardDistribution.json`.
 *
 * @module distributionConfig
 */

/**
 * In-code fallback distribution. Mirrors `public/cardDistribution.json`.
 * @type {Object}
 */
const DEFAULT_DISTRIBUTION = {
  deckSize: 72,
  categories: {
    component: {
      share: 50,
      cards: { MODEL: 5, CONTROLLER: 4, VIEW: 3 }
    },
    defensive: {
      share: 32,
      cards: { METHOD: 11, INTERFACE: 4, POLYMORPHISM: 3, ERROR_HANDLING: 2, LOGGER: 2, GIT: 1 }
    },
    attacking: {
      share: 15,
      cards: { DOS: 1, SQL_INJECTION: 1, XSS: 1, CSRF: 1, MALWARE: 1, UNAUTHORIZED_ACCESS: 1, RANSOM: 1 }
    },
    destructive: {
      share: 3,
      cards: { BUG: 1, DISASTER: 1 }
    }
  }
}

const DISTRIBUTION_URL = '/cardDistribution.json'

// The distribution currently in effect. Starts as the fallback and is replaced
// once the live config has been fetched.
let activeDistribution = DEFAULT_DISTRIBUTION

/**
 * Basic shape check so a malformed file cannot silently produce an empty deck.
 * @param {*} dist - The parsed config to validate.
 * @return {bool} True if the config has the expected structure.
 */
function isValidDistribution (dist) {
  if (!dist || typeof dist.deckSize !== 'number' || dist.deckSize <= 0) {
    return false
  }
  const categories = dist.categories
  if (!categories || typeof categories !== 'object') {
    return false
  }
  return Object.values(categories).every(cat =>
    cat && typeof cat.share === 'number' && cat.cards && typeof cat.cards === 'object'
  )
}

/**
 * Fetches the live distribution from `public/cardDistribution.json` and makes it
 * the active config. Falls back to `DEFAULT_DISTRIBUTION` on any error or if the
 * file is invalid. Safe to call once at app startup.
 *
 * @param {Function} [fetchFn=fetch] - Fetch implementation (injectable for tests).
 * @return {Promise<Object>} Resolves with the active distribution.
 */
async function loadDistribution (fetchFn = fetch) {
  try {
    const response = await fetchFn(DISTRIBUTION_URL, { cache: 'no-store' })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const dist = await response.json()
    if (!isValidDistribution(dist)) {
      throw new Error('invalid distribution shape')
    }
    activeDistribution = dist
  } catch (error) {
    console.warn(
      `distributionConfig: using default distribution (${error.message}).`
    )
    activeDistribution = DEFAULT_DISTRIBUTION
  }
  return activeDistribution
}

/**
 * Returns the distribution currently in effect.
 * @return {Object} The active distribution config.
 */
function getDistribution () {
  return activeDistribution
}

export { DEFAULT_DISTRIBUTION, loadDistribution, getDistribution, isValidDistribution }
