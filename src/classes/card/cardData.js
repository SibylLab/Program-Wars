/**
 * Helper functions to make it easier to help check what catergories a card
 * type may fall into.
 *
 * DEVELOPMENT: Simplified for INSTRUCTION, METHOD, RANSOM, and COMPONENT cards.
 *
 * Functions need to be imported like this `import { isHack } from`.
 *
 * @module cardData
 */

// All malware card types
// DEVELOPMENT: Only RANSOM
const malware = [
  "RANSOM"
]

// All hack card types (attacking cards that can be played anywhere)
// DEVELOPMENT: CSRF, DOS, MALWARE, SQL_INJECTION, UNAUTHORIZED_ACCESS, XSS
const hack = [
  "CSRF", "DOS", "MALWARE", "SQL_INJECTION", "UNAUTHORIZED_ACCESS", "XSS"
]

// All safety card types
// DEVELOPMENT: Empty - no safety cards used
const safety = [
]

// All algorithm card types
// DEVELOPMENT: Empty - no algorithm cards used
const algorithm = [
]

// Defensive cards that act like repeat multipliers on stacks.
// Note: POLYMORPHISM is no longer a multiplier - it is a wildcard component
// card (see {@link Polymorphism}).
const defensiveMultipliers = [
  'INTERFACE', 'GIT', 'ERROR_HANDLING', 'LOGGER'
]

// Attack counters based on component cards or special defense types
const attackCounters = {
  DOS: {
    components: ['rate_limiting', 'caching', 'input_validation'],
    types: []
  },
  SQL_INJECTION: {
    components: ['orm'],
    types: []
  },
  XSS: {
    components: ['data_validation'],
    types: []
  },
  CSRF: {
    components: ['csrf_protection'],
    types: []
  },
  RANSOM: {
    components: ['secrets_manager'],
    types: ['GIT']
  },
  MALWARE: {
    components: ['file_storage_adapter'],
    types: []
  },
  UNAUTHORIZED_ACCESS: {
    components: ['authentication', 'authorization'],
    types: []
  },
  BUG: {
    components: [],
    types: ['LOGGER']
  },
  DISASTER: {
    components: [],
    types: ['GIT']
  }
}

// types that can start a stack
// DEVELOPMENT: INSTRUCTION, METHOD, and COMPONENT cards
const base = [
  "INSTRUCTION", "METHOD", "MODEL", "VIEW", "CONTROLLER"
]

// all cards that are considered attacks
const attacks = [
  ...malware, ...hack
]

// all card types that use the NegativeEffectCard
// DEVELOPMENT: Only RANSOM
const negativeEffects = [
  ...malware.filter(m => m !== "VIRUS" && m !== "TROJAN"),
  ...hack
]

// all card types that use the PositiveEffectCard
// DEVELOPMENT: Empty - no safety cards
const positiveEffects = [
  ...safety
]

// Cards that will have an overlay to play them
// DEVELOPMENT: Only RANSOM
const special = [
  ...safety, ...algorithm, ...hack,
  ...malware.filter(m => m !== "VIRUS"),
]

// Cards that can be played on a stack (when it has a base)
// DEVELOPMENT: Defensive multiplier cards
const onStack = [
  ...defensiveMultipliers
]

// Cards that can be played on the method stack
// DEVELOPMENT: INSTRUCTION and COMPONENT cards (for point accumulation)
const onMethod = [
  'INSTRUCTION', 'MODEL', 'VIEW', 'CONTROLLER'
]

// Returns a function to find if a card type is in the given typeList
function _isType (typeList) {
  return type => typeList.find(t => t === type) !== undefined
}

// Functions to find if a card type is in the list the function is for
// ie) calling isMalware(card.type) will tell you if card is a malware card

/**
 * Checks if a type is `malware`.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type is `malware`.
 * @function
 */
const isMalware = _isType(malware)

/**
 * Checks if a type is a `hack`.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type is a `hack`.
 * @function
 */
const isHack = _isType(hack)

/**
 * Checks if a type is a `safety`.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type is a `safety`.
 * @function
 */
const isSafety = _isType(safety)

/**
 * Checks if a type is an `algorithm`.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type is an `algorithm`.
 * @function
 */
const isAlgorithm = _isType(algorithm)

/**
 * Checks if a type is an `attack`.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type is an `attack`.
 * @function
 */
const isAttack = _isType(attacks)

/**
 * Checks if a type is a negative effect.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type is a negative effect.
 * @function
 */
const isNegativeEffect = _isType(negativeEffects)

/**
 * Checks if a type is a positive effect.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type is a positive effect.
 * @function
 */
const isPositiveEffect = _isType(positiveEffects)

/**
 * Checks if a type is for a special card.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type is for a special card.
 * @function
 */
const isSpecial = _isType(special)

/**
 * Checks if a type can be the base of a stack.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type can be the base of a stack.
 * @function
 */
const isBase = _isType(base)

/**
 * Checks if a type of card can be played on a Stack.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type of card can be played on a Stack.
 * @function
 */
const canPlayOnStack = _isType(onStack)

/**
 * Checks if a type of card can be played on a MethodStack.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type of card can be played on a MethodStack.
 * @function
 */
const canPlayOnMethod = _isType(onMethod)

/**
 * Checks if a type is a repeat-like stack multiplier.
 *
 * @param {string} type - The type to check.
 * @returns {bool} True if the type is repeat-like.
 * @function
 */
const isRepeatLike = _isType(['REPEAT', ...defensiveMultipliers])

/**
 * Returns the defense counters for a given attack type.
 *
 * @param {string} attackType - The attack type to check.
 * @returns {{components: string[], types: string[]}} The defense counters.
 * @function
 */
function getAttackCounters (attackType) {
  const counters = attackCounters[attackType]
  if (!counters) {
    return { components: [], types: [] }
  }
  return {
    components: counters.components || [],
    types: counters.types || []
  }
}

export {
  isMalware,
  isHack,
  isSafety,
  isAlgorithm,
  isAttack,
  isNegativeEffect,
  isPositiveEffect,
  isSpecial,
  isBase,
  canPlayOnStack,
  canPlayOnMethod,
  isRepeatLike,
  getAttackCounters
}
