export default {
  DRY: {
    type: "DRY",
    name: "Sprint #1 - Initial : Do Not Repeat",
    description: "You don't want to write the same code in too many different places. You will try to put as many instructions as possible into your method. Then use that method as much as possible to build your stacks.",
    goals: [
      {goal: "Max out method stack", sprint: "+1 card", game: "10 pts"},
      {goal: "Have 1 Method stack with 2 repeats", sprint: "Scan Card", game: "None"}
    ]
  },
  infoSec: {
    type: "infoSec",
    name: "Sprint #2 - Security : System Security",
    description: "It is important to secure your system from hackers and malware. You will try to ensure that you protect yourself and ensure that your system is clean.",
    goals: [
      {goal: "Played 1 safety cards total", sprint: " Variable [6] Card", game: "10 pts"},
      {goal: "Played 2 safety cards total", sprint: "Redrawn opportunity", game: "10 pts"},
      {goal: "No Malware or Hack effects at end of the game", sprint: "None", game: "30 pts"}
    ]
  },
  whiteHat: {
    type: "whiteHat",
    name: "Sprint #3 - Penetration : Penetration Testing",
    description: "Your job is to deploy cyberattacks against organizations’ systems in order to expose security vulnerabilities so they can be secured. You will try to play as many attack cards as possible on other players.",
    goals: [
      {goal: "Played 1 attack cards total", sprint: "Sort Card", game: "10 pts"},
      {goal: "Played 3 attack cards total", sprint: "Redrawn opportunity", game: "10 pts"},
      {goal: "Played 5 attack cards total", sprint: "None", game: "30 pts"}
    ]
  }
}
