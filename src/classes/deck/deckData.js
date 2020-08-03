// make an object to record the type value and number of a card that
// will be in a deck.
function makeType (type, val, num) {
  return { type, val, num }
}

// Begginer Decks ////////////////////////////////////////////////////////////

const beginnerBase = [
  makeType('INSTRUCTION', 1, 6),
  makeType('INSTRUCTION', 2, 12),
  makeType('INSTRUCTION', 3, 6),
  makeType('REPEAT', 1, 5),
  makeType('REPEAT', 2, 5),
  makeType('REPEAT', 3, 4),
  makeType('VARIABLE', 4, 4),
  makeType('VARIABLE', 5, 2),
  makeType('METHOD', 0, 12),
  makeType('SCAN', 0, 3),
  makeType('SEARCH', 0, 2),
  makeType('SORT', 0, 2)
]

const b1Special = [
  makeType('SPYWARE', 0, 3),
  makeType('RANSOM', 0, 3),
  makeType('ANTIVIRUS', 0, 1)
]

const b2Special = [
  makeType('VIRUS', 0, 3),
  makeType('TROJAN', 0, 3),
  makeType('ANTIVIRUS', 0, 1),
]

const b3Special = [
  makeType('DDOS', 0, 3),
  makeType('STACK_OVERFLOW', 0, 3),
  makeType('FIREWALL', 0, 1),
]

const b4Special = [
  makeType('STACK_UNDERFLOW', 0, 3),
  makeType('SQL_INJECTION', 0, 3),
  makeType('FIREWALL', 0, 1)
]

const malware1 = {
  base: beginnerBase,
  extra: b1Special
}

const malware2 = {
  base: beginnerBase,
  extra: b2Special
}

const hack1 = {
  base: beginnerBase,
  extra: b3Special
}

const hack2 = {
  base: beginnerBase,
  extra: b4Special
}

const beginnerDefault = malware1

const beginnerLevels = [
  {
    id: 'malware1',
    name: 'Malware 1',
    description: 'Antivirus, Spyware, and Ransom'
  },
  {
    id: 'hack1',
    name: 'Hack 1',
    description: 'Firewall, Stack Overflow, and DDoS'
  },
  {
    id: 'malware2',
    name: 'Malware 2',
    description: 'Antivirus, Virus, and Trojan'
  },
  {
    id: 'hack2',
    name: 'Hack 2',
    description: 'Firewall, Stack Underflow, and Sql Injection'
  }
]

// Standard Decks ////////////////////////////////////////////////////////////

const standardBase = [
  makeType('INSTRUCTION', 1, 10),
  makeType('INSTRUCTION', 2, 12),
  makeType('INSTRUCTION', 3, 8),
  makeType('REPEAT', 1, 5),
  makeType('REPEAT', 2, 5),
  makeType('REPEAT', 3, 5),
  makeType('REPEAT', 4, 2),
  makeType('VARIABLE', 4, 3),
  makeType('VARIABLE', 5, 3),
  makeType('VARIABLE', 6, 2),
  makeType('METHOD', 0, 14),
]

const s1Special = [
  makeType('SPYWARE', 0, 2),
  makeType('RANSOM', 0, 2),
  makeType('TROJAN', 0, 2),
  makeType('VIRUS', 0, 2),
  makeType('ANTIVIRUS', 0, 2),
  // makeType('SEARCH', 0, 2),
  // makeType('SORT', 0, 2),
  makeType('SCAN', 0, 5)
]

const standard1 = {
  base: standardBase,
  extra: s1Special
}

const standardDefault = standard1

const standardLevels = [
  { id: 'standard1', name: 'standard 1', description: 'Spyware, Ransom, and Search' },
  { id: 'standard2', name: 'standard 2', description: 'Spyware, Ransom, and Search' },
  { id: 'standard3', name: 'standard 3', description: 'Spyware, Ransom, and Search' }
]

// Agile Decks ///////////////////////////////////////////////////////////////

// need to be changed to match the new style

/*
// 30 cards that should be in all decks (for now)
const baseCards = {
  'INSTRUCTION': {1: 5, 2: 3, 3: 2},  // 10
  'METHOD': {0: 4},                   // 4
  'REPEAT': {1: 3, 2: 3, 3: 3},       // 9
  'VARIABLE': {4: 2, 5: 1, 6: 1},     // 4
  'SCAN': {0: 2},                     // 2
  'VIRUS': {0: 1}                     // 1
}

// 10 cards to add to premade decks for each type
const premadeCards = {
  DRY: {
    'INSTRUCTION': {2: 1, 3: 1},
    'METHOD': {0: 2},
    'REPEAT': {1: 2, 2: 1, 3: 1},
    'VARIABLE': {4: 1, 5: 1},
  },

  infoSec: {
    'REPEAT': {2: 1, 3: 1},
    'ANTIVIRUS': {0: 1},
    'FIREWALL': {0: 2},
    'SCAN': {0: 3},
    'SPYWARE': {0: 2}
  },

  whiteHat: {
    'REPEAT': {2: 1, 3: 1},
    'VIRUS': {0: 2},
    'RANSOM': {0: 2},
    'TROJAN': {0: 2},
    'SPYWARE': {0: 2}
  }
}

// 10 extra cards to combine with premade cards to create the 20 card pool for
// building custom decks
const optionalCards = {
  DRY: {
    'INSTRUCTION': {2: 1, 3: 1},
    'METHOD': {0: 2},
    'REPEAT': {1: 2, 2: 1, 3: 1},
    'VARIABLE': {4: 1, 5: 1},
  },

  infoSec: {
    'REPEAT': {2: 1, 3: 1},
    'ANTIVIRUS': {0: 1},
    'FIREWALL': {0: 2},
    'SCAN': {0: 3},
    'SPYWARE': {0: 2}
  },

  whiteHat: {
    'REPEAT': {2: 1, 3: 1},
    'VIRUS': {0: 2},
    'RANSOM': {0: 2},
    'TROJAN': {0: 2},
    'SPYWARE': {0: 2}
  }
}
*/

export default {
  beginner: {
    malware1, malware2, hack1, hack2,
    default: beginnerDefault,
    levels: beginnerLevels
  },
  standard: {
    standard1,
    default: standardDefault,
    levels: standardLevels
  },
  agile: {
    default: beginnerDefault
  }
}
