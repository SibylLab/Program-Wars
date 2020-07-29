const standardDeck = {
  "INSTRUCTION": {1: 10, 2: 12, 3: 6},
  "REPEAT": {1: 5, 2: 5, 3: 4, 4: 2},
  "VARIABLE": {3: 2, 4: 2, 5: 2, 6: 1},
  "METHOD": {0: 12},
  "VIRUS": {0: 3},
  "RANSOM": {0: 3},
  "TROJAN": {0: 3},
  "SPYWARE": {0: 3},
  "ANTIVIRUS": {0: 1},
  "SCAN": {0: 5},
}

const beginnerDeck = {
  "INSTRUCTION": {1: 10, 2: 12, 3: 6},
  "REPEAT": {1: 5, 2: 5, 3: 4, 4: 2},
  "VARIABLE": {3: 2, 4: 2, 5: 2, 6: 1},
  "METHOD": {0: 12},
  "VIRUS": {0: 3},
  "RANSOM": {0: 3},
  "ANTIVIRUS": {0: 1},
  "SCAN": {0: 5},
}


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

// All types and available values of cards, but with 0 number
const emptyCards = {
  "INSTRUCTION": {1: 0, 2: 0, 3: 0},
  "METHOD": {0: 0},
  "REPEAT": {1: 0, 2: 0, 3: 0},
  "VARIABLE": {4: 0, 5: 0, 6: 0},
  "VIRUS": {0: 0},
  "RANSOM": {0: 0},
  "SPYWARE": {0: 0},
  "TROJAN": {0: 0},
  "ANTIVIRUS": {0: 0},
  "FIREWALL": {0: 0},
  "SCAN": {0: 0},
}

// change and pass at creation to debug certain cards easier
const debugDeck = {
  "INSTRUCTION": {1: 0, 2: 0, 3: 0},
  "METHOD": {0: 0},
  "REPEAT": {1: 0, 2: 0, 3: 0},
  "VARIABLE": {4: 0, 5: 0, 6: 0},
  "VIRUS": {0: 0},
  "RANSOM": {0: 0},
  "SPYWARE": {0: 0},
  "TROJAN": {0: 5},
  "ANTIVIRUS": {0: 0},
  "FIREWALL": {0: 0},
  "SCAN": {0: 10},
}

export {
  standardDeck,
  beginnerDeck,
  baseCards,
  premadeCards,
  optionalCards,
  emptyCards,
  debugDeck
}
