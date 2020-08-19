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
const isMalware = _isType(malware)
const isHack = _isType(hack)
const isSafety = _isType(safety)
const isAlgorithm = _isType(algorithm)
const isAttack = _isType(attacks)
const isNegativeEffect = _isType(negativeEffects)
const isPositiveEffect = _isType(positiveEffects)
const isSpecial = _isType(special)
const isBase = _isType(base)
const canPlayOnStack = _isType(onStack)
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
