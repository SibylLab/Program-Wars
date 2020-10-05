/**
 * Helper functions to make it easier to help check what catergories a card
 * type may fall into.
 *
 * i.e. `RANSOM` is `malware`, it is also an `attack` and `negative` effect. \
 * `SCAN` is a `safety` card, but it is **not** a `positive` effect. \
 * all `safety`, `malware`, `hack`, and `algorithm` cards are `special` cards
 * except for `VIRUS`.
 *
 * Functions need to be imported like this `import { isHack } from`.
 *
 * @module cardData
 */

// All malware card types
const malware = [
  "RANSOM", "SPYWARE", "VIRUS", "TROJAN"
]

// All hack card types
const hack = [
  "STACK_OVERFLOW", "STACK_UNDERFLOW", "SQL_INJECTION", "DDOS"
]

// All safety card types
const safety = [
  "ANTIVIRUS", "FIREWALL", "SCAN"
]

// All algorithm card types
const algorithm = [
  "SEARCH", "SORT", "REDRAW"
]

// types that can start a stack
const base = [
  "INSTRUCTION", "METHOD"
]

// all cards that are considered attacks
const attacks = [
  ...malware, ...hack
]

// all card types that use the NegativeEffectCard
const negativeEffects = [
  ...malware.filter(m => m !== "VIRUS" && m !== "TROJAN"),
  ...hack
]

// all card types that use the PositiveEffectCard
const positiveEffects = [
  ...safety
]

// Cards that will have an overlay to play them
const special = [
  ...safety, ...algorithm, ...hack,
  ...malware.filter(m => m !== "VIRUS"),
]

// Cards that can be played on a stack (when it has a base)
const onStack = [
  'REPEAT', 'VARIABLE', 'VIRUS'
]

// Cards that can be played on the method stack
const onMethod = [
  'INSTRUCTION'
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
  canPlayOnMethod
}
