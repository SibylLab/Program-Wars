// All malware card types
const malware = [
  "RANSOM", "SPYWARE", "VIRUS", "TROJAN"
]

// All hack card types
const hacks = [
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

// all card types that use the NegativeEffectCard
const negativeEffects = [
  ...malware.filter(m => m !== "VIRUS"),
  ...hacks.filter(h => h !== "SQL_INJECTION")
]

// all card types that use the PositiveEffectCard
const positiveEffects = [
  ...safety
]

// Cards that will have an overlay to play them
const special = [
  ...safety, ...algorithms, ...hacks,
  ...malware.filter(m => m !== "VIRUS"),
]

// Returns a function to find if a card type is in the given typeList
function _isType (typeList) {
  return type => typeList.find(t => t === type) !== undefined
}

// Export functions to find if a card type is in the list the function is for
// ie) calling isMalware(card.type) will tell you if card is a malware card
export default {
  isMalware: _isType(malware),
  isHack: _isType(hack),
  isSafety: _isType(safety),
  isAlgorithm: _isType(algorithm),
  isNegativeEffect: _isType(negative),
  isPositiveEffect: _isType(positive),
  isSpecial: _isType(special)
}
