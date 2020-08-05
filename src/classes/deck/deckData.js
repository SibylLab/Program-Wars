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

const std1Special = [
  makeType('SPYWARE', 0, 2),
  makeType('RANSOM', 0, 2),
  makeType('VIRUS', 0, 2),
  makeType('TROJAN', 0, 2),
  makeType('ANTIVIRUS', 0, 2)
]

const std2Special = [
  makeType('DDOS', 0, 2),
  makeType('STACK_OVERFLOW', 0, 2),
  makeType('STACK_UNDERFLOW', 0, 2),
  makeType('SQL_INJECTION', 0, 2),
  makeType('FIREWALL', 0, 2),
]

const std3Special = [
  makeType('SPYWARE', 0, 2),
  makeType('VIRUS', 0, 2),
  makeType('STACK_UNDERFLOW', 0, 2),
  makeType('SQL_INJECTION', 0, 2),
  makeType('FIREWALL', 0, 2),
  makeType('ANTIVIRUS', 0, 2)
]

const std4Special = [
  makeType('DDOS', 0, 2),
  makeType('STACK_OVERFLOW', 0, 2),
  makeType('RANSOM', 0, 2),
  makeType('TROJAN', 0, 2),
  makeType('FIREWALL', 0, 2),
  makeType('ANTIVIRUS', 0, 2)
]

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

const standardDefault = stdMalware

const standardLevels = [
  {
    id: 'stdMalware',
    name: 'Only Malware',
    description: 'Antivirus, Spyware, Ransom, Virus, and Trojan'
  },
  {
    id: 'stdHack',
    name: 'Only Hacks',
    description: 'Firewall, Stack Overflow, Stack Underflow, Sql Injection, and DDoS'
  },
  {
    id: 'stdCombined1',
    name: 'Combined 1',
    description: 'Antivirus, Spyware, Virus, Firewall, Stack Overflow, and Sql Injection'
  },
  {
    id: 'stdCombined2',
    name: 'Combined 2',
    description: 'Antivirus, Ransom, Trojan, Firewall, Stack Overflow, and DDoS'
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
