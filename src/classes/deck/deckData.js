// make an object to record the type value and number of a card that
// will be in a deck.
function makeType (type, val, num) {
  return { type, val, num }
}

// Begginer Decks ////////////////////////////////////////////////////////////

const begginerBase = [
  makeType("INSTRUCTION", 1, 8),
  makeType("INSTRUCTION", 2, 10),
  makeType("INSTRUCTION", 3, 6),
  makeType("REPEAT", 1, 5),
  makeType("REPEAT", 2, 5),
  makeType("REPEAT", 3, 4),
  makeType("VARIABLE", 4, 3),
  makeType("VARIABLE", 5, 3),
  makeType("METHOD", 0, 12),
]

const b1Special = [
  makeType("SPYWARE", 0, 3),
  makeType("RANSOM", 0, 3),
  makeType("ANTIVIRUS", 0, 1),
  // makeType("SEARCH", 0, 2),
  makeType("SCAN", 0, 4)
]


const begginer1 = {
  base: begginerBase,
  extra: b1Special
}

const begginerDefault = begginer1

// Standard Decks ////////////////////////////////////////////////////////////

const standardBase = [
  makeType("INSTRUCTION", 1, 10),
  makeType("INSTRUCTION", 2, 12),
  makeType("INSTRUCTION", 3, 8),
  makeType("REPEAT", 1, 5),
  makeType("REPEAT", 2, 5),
  makeType("REPEAT", 3, 5),
  makeType("REPEAT", 4, 2),
  makeType("VARIABLE", 4, 3),
  makeType("VARIABLE", 5, 3),
  makeType("VARIABLE", 6, 2),
  makeType("METHOD", 0, 14),
]

const s1Special = [
  makeType("SPYWARE", 0, 2),
  makeType("RANSOM", 0, 2),
  makeType("TROJAN", 0, 2),
  makeType("VIRUS", 0, 2),
  makeType("ANTIVIRUS", 0, 2),
  // makeType("SEARCH", 0, 2),
  // makeType("SORT", 0, 2),
  makeType("SCAN", 0, 5)
]

const standard1 = {
  base: standardBase,
  extra: s1Special
}

const standardDefault = standard1

// Agile Decks ///////////////////////////////////////////////////////////////

// need to be changed to match the new style

/*
// 30 cards that should be in all decks (for now)
const baseCards = {
  "INSTRUCTION": {1: 5, 2: 3, 3: 2},  // 10
  "METHOD": {0: 4},                   // 4
  "REPEAT": {1: 3, 2: 3, 3: 3},       // 9
  "VARIABLE": {4: 2, 5: 1, 6: 1},     // 4
  "SCAN": {0: 2},                     // 2
  "VIRUS": {0: 1}                     // 1
}

// 10 cards to add to premade decks for each type
const premadeCards = {
  DRY: {
    "INSTRUCTION": {2: 1, 3: 1},
    "METHOD": {0: 2},
    "REPEAT": {1: 2, 2: 1, 3: 1},
    "VARIABLE": {4: 1, 5: 1},
  },

  infoSec: {
    "REPEAT": {2: 1, 3: 1},
    "ANTIVIRUS": {0: 1},
    "FIREWALL": {0: 2},
    "SCAN": {0: 3},
    "SPYWARE": {0: 2}
  },

  whiteHat: {
    "REPEAT": {2: 1, 3: 1},
    "VIRUS": {0: 2},
    "RANSOM": {0: 2},
    "TROJAN": {0: 2},
    "SPYWARE": {0: 2}
  }
}

// 10 extra cards to combine with premade cards to create the 20 card pool for
// building custom decks
const optionalCards = {
  DRY: {
    "INSTRUCTION": {2: 1, 3: 1},
    "METHOD": {0: 2},
    "REPEAT": {1: 2, 2: 1, 3: 1},
    "VARIABLE": {4: 1, 5: 1},
  },

  infoSec: {
    "REPEAT": {2: 1, 3: 1},
    "ANTIVIRUS": {0: 1},
    "FIREWALL": {0: 2},
    "SCAN": {0: 3},
    "SPYWARE": {0: 2}
  },

  whiteHat: {
    "REPEAT": {2: 1, 3: 1},
    "VIRUS": {0: 2},
    "RANSOM": {0: 2},
    "TROJAN": {0: 2},
    "SPYWARE": {0: 2}
  }
}
*/

export default {
  begginer: {
    begginer1,
    default: begginerDefault
  },
  standard: {
    standard1,
    default: standardDefault
  },
  agile: {
    default: begginerDefault
  }
}
