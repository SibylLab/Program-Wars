export default {
  DRY: {
    type: "DRY",
    name: "DRY: Don't repeat yourself",
    description: "You don't want to write the same code in too many different places. You will try to put as many instructions as possible into your method. Then use that method as much as possible to build your stacks.",
    goals: [
      {goal: "Max out method stack", sprint: "+1 to hand size", game: "None"},
      {goal: "Have 1 Method stack with 2 repeats", sprint: "Scan Card", game: "None"},
      {goal: "Have 3 Method stacks with 2 repeats", sprint: "Scan Card", game: "None"}
    ]
  },
  infoSec: {
    type: "infoSec",
    name: "Information Security",
    description: "It is important to secure your system from hackers and malware. You will try to ensure that you protect yourself and ensure that your system is clean",
    goals: [
      {goal: "Played 2 safety cards total", sprint: "Variable6 Card", game: "10pts"},
      {goal: "Played 4 safety cards total", sprint: "Redraw2 Card", game: "10pts"},
      {goal: "No Malware or Hack effects at end of game", sprint: "None", game: "30pts"}
    ]
  },
  whiteHat: {
    type: "whiteHat",
    name: "White Hat Hacker",
    description: "Your job is to deploy cyber attacks against organizations systems in order to expose sercurity vulnerabilities so they can be secured. You will try to play as many attack cards as possible on other players.",
    goals: [
      {goal: "Played 2 attack cards total", sprint: "Search Card", game: "10pts"},
      {goal: "Played 4 attack cards total", sprint: "Redraw2 Card", game: "10pts"},
      {goal: "Played 6 attack cards total", sprint: "20pts", game: "20pts"}
    ]
  }
}
