/**
 *
 * Contains information on what cards to use in a deck.
 *
 * I ended up with a layout that did not work well for proper documentation
 * so some descriptions of the file layout is given here in markdown for API
 * documentation. More info on what is in each deck can be found by looking in
 * the source code.
 *
 * Each deck is an object setup like so:
 * ```
 * {
 *   base  // The cards types used in the base for the deck
 *   extra // The cards to include along with the base deck
 * }
 * ```
 *
 * The card types objects are set up as objects like so:
 * ```
 * {
 *   type // The type of the card
 *   val  // The value of the card
 *   num  // The number of cards of this type to add
 * }
 * ```
 *
 * The levels for each mode are a list of 4 items that look like so:
 * ```
 * {
 *   id          // the name of the deck (can be used to index) deckData.<mode>[id] for deck data
 *   name        // The display name for the level
 *   description // A list of safety and attack cards added in the level
 * }
 * ```
 *
 * Export object looks like this:
 * ```
 * {
 *   beginner:       // a collection of beginner mode data
 *   {
 *     malware1      // The malware1 deck info i.e. { base, extra }
 *     malware2      // The malware2 deck info
 *     hack1         // The hack1 deck info
 *     hack2         // The hack2 deck info
 *     default       // The default deck
 *     levels        // List of decks, names and descriptions
 *   },
 *   standard:       // a collection of standard deck data
 *   {
 *     stdMalware    // The only malware deck info i.e. { base, extra }
 *     stdHack       // The only hacks deck info
 *     stdCombined1  // Deck info for 2 malware and 2 hack cards
 *     stdCombined2  // Deck info for a different set of 2 malware and 2 hack cards
 *     default       // The default deck
 *     levels        // List of decks, names and descriptions
 *   }
 * }
 * ```
 *
 * @module deckData
 */

// make an object to record the type value and number of a card that
// will be in a deck.
function makeType (type, val, num) {
  return { type, val, num }
}

// Begginer Decks ////////////////////////////////////////////////////////////

// Base cards to add to each beginner deck
const beginnerBase = [
  makeType('INSTRUCTION', 1, 8),
  makeType('INSTRUCTION', 2, 14),
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

// Sets of special cards to add to the beginner base to make a full beginner deck
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

// Full deck objects containing lists of base and extra cards
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

// Default deck for beginner mode
const beginnerDefault = malware1

// List of level descriptions and an id for the deck they use
const beginnerLevels = [
  {
    id: 'malware1',
    name: 'Malware 1',
    description: 'Antivirus, Spyware, and Ransom'
  },
  {
    id: 'hack1',
    name: 'Hack 1',
    description: 'Firewall, Buffer Overflow, and Denial of Service'
  },
  {
    id: 'malware2',
    name: 'Malware 2',
    description: 'Antivirus, Virus, and Trojan'
  },
  {
    id: 'hack2',
    name: 'Hack 2',
    description: 'Firewall, Cross-Site Scripting, and Sql Injection'
  }
]

// Standard Decks ////////////////////////////////////////////////////////////

// base card types
const standardBase = [
  makeType('INSTRUCTION', 1, 6),
  makeType('INSTRUCTION', 2, 14),
  makeType('INSTRUCTION', 3, 8),
  makeType('REPEAT', 1, 5),
  makeType('REPEAT', 2, 5),
  makeType('REPEAT', 3, 4),
  makeType('REPEAT', 4, 2),
  makeType('VARIABLE', 3, 2),
  makeType('VARIABLE', 4, 3),
  makeType('VARIABLE', 5, 2),
  makeType('VARIABLE', 6, 1),
  makeType('METHOD', 0, 14),
  makeType('SCAN', 0, 5),
  makeType('SEARCH', 0, 2),
  makeType('SORT', 0, 3)
]

// aditional card types
const std1Special = [
  makeType('SPYWARE', 0, 2),
  makeType('RANSOM', 0, 2),
  makeType('VIRUS', 0, 2),
  makeType('TROJAN', 0, 2),
  makeType('ANTIVIRUS', 0, 1)
]

const std2Special = [
  makeType('DDOS', 0, 2),
  makeType('STACK_OVERFLOW', 0, 2),
  makeType('STACK_UNDERFLOW', 0, 2),
  makeType('SQL_INJECTION', 0, 2),
  makeType('FIREWALL', 0, 1),
]

const std3Special = [
  makeType('SPYWARE', 0, 2),
  makeType('VIRUS', 0, 2),
  makeType('STACK_UNDERFLOW', 0, 2),
  makeType('SQL_INJECTION', 0, 2),
  makeType('FIREWALL', 0, 1),
  makeType('ANTIVIRUS', 0, 1)
]

const std4Special = [
  makeType('DDOS', 0, 2),
  makeType('STACK_OVERFLOW', 0, 2),
  makeType('RANSOM', 0, 2),
  makeType('TROJAN', 0, 2),
  makeType('FIREWALL', 0, 1),
  makeType('ANTIVIRUS', 0, 1)
]

// Standard deck setups
const stdMalware = {
  base: standardBase,
  extra: std1Special
}

const stdHack = {
  base: standardBase,
  extra: std2Special
}

const stdCombined1 = {
  base: standardBase,
  extra: std3Special
}

const stdCombined2 = {
  base: standardBase,
  extra: std4Special
}

// Default for standard decks
const standardDefault = stdMalware

// list of standard levels
const standardLevels = [
  {
    id: 'stdMalware',
    name: 'Only Malware',
    description: 'Antivirus, Spyware, Ransom, Virus, and Trojan'
  },
  {
    id: 'stdHack',
    name: 'Only Hacks',
    description: 'Firewall, Buffer Overflow, Cross-Site Scripting, Sql Injection, and Denial of Service'
  },
  {
    id: 'stdCombined1',
    name: 'Combined 1',
    description: 'Antivirus, Spyware, Virus, Firewall, Cross-Site Scripting, and Sql Injection'
  },
  {
    id: 'stdCombined2',
    name: 'Combined 2',
    description: 'Antivirus, Ransom, Trojan, Firewall, Buffer Overflow, and Denial of Service'
  }
]

// Exports ///////////////////////////////////////////////////////////////////

export default {
  beginner: {
    malware1, malware2, hack1, hack2,
    default: beginnerDefault,
    levels: beginnerLevels
  },
  standard: {
    stdMalware, stdHack, stdCombined1, stdCombined2,
    default: standardDefault,
    levels: standardLevels
  }
}
