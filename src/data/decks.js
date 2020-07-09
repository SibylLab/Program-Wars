export default {
  // The standard cards that are in all single player decks
  // 30 max for now
  basicCards: {
    "INSTRUCTION": {1: 5, 2: 3, 3: 2},  // 10
    "METHOD": {0: 4},                   // 4
    "REPEAT": {1: 3, 2: 3, 3: 3},       // 9
    "VARIABLE": {4: 2, 5: 1, 6: 1},     // 4
    "SCAN": {0: 2},                     // 2
    "VIRUS": {0: 1}                     // 1
  },

  // The optional cards that are added to decks based on requirement type
  // 10 max for now
  optionalCards: {
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
  },

  // The pool of replacement cards
  // These should be max amount available including preset optional cards
  // So they should be filtered for each player based on the deck options they
  // have already been given.
  replacementCards: {
    "INSTRUCTION": {2: 2, 3: 2},
    "METHOD": {0: 2},
    "REPEAT": {1: 2, 2: 2, 3: 2},
    "VARIABLE": {4: 2, 5: 1},
    "SCAN": {0: 3},
    "ANTIVIRUS": {0: 2},
    "FIREWALL": {0: 2},
    "VIRUS": {0: 2},
    "RANSOM": {0: 2},
    "TROJAN": {0: 2},
    "SPYWARE": {0: 2}
  },

  // All types and available values of cards, but with 0 number
  empty: {
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
}
