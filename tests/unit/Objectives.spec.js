import Objectives from '@/classes/game/Objectives'
import Player from '@/classes/game/Player'

let group = {type: 'GROUP'}
let repeat = {type: 'REPEAT'}
let variable = {type: 'VARIABLE'}
let virus = {type: 'VIRUS'}
let antivirus = {type: 'ANTIVIRUS'}
let firewall = {type: 'FIREWALL'}
let scan = {type: 'SCAN'}
let complete = {isComplete: () => {return true}}
let notComplete = {isComplete: () => {return false}}
function mockValue (value) { return jest.fn(() => { return value }) }


describe('Objectives.js', () => {
  test('all objectives when there are no cards played', () => {
    // Might be better to mock out the player in the future
    let player = new Player(0, 'steve', false)
    let bonuses = player.objectives.getBonuses({cards: []},[])
    expect(bonuses.group).toEqual(0)
    expect(bonuses.repeat).toEqual(0)
    expect(bonuses.variable).toEqual(0)
    expect(bonuses.safety).toEqual(0)
    expect(bonuses.defensive).toEqual(0)
    expect(bonuses.clean).toEqual(10)
    expect(bonuses.complete).toEqual(0)
  })
  test('played group cards', () => {
    let objectives = new Objectives({})
    objectives.cardsPlayed.push(group)
    objectives.cardsPlayed.push(group)
    objectives.cardsPlayed.push(repeat)
    expect(objectives.getGroupBonus()).toEqual(10)
  })
  test('played repeat cards', () => {
    let objectives = new Objectives({})
    objectives.cardsPlayed.push(variable)
    objectives.cardsPlayed.push(repeat)
    objectives.cardsPlayed.push(repeat)
    expect(objectives.getRepeatBonus()).toEqual(6)
  })
  test('played variable cards', () => {
    let objectives = new Objectives({})
    objectives.cardsPlayed.push(variable)
    objectives.cardsPlayed.push(repeat)
    objectives.cardsPlayed.push(variable)
    expect(objectives.getVariableBonus()).toEqual(4)
  })
  test('played safety cards', () => {
    let objectives = new Objectives({})
    objectives.cardsPlayed.push(antivirus)
    objectives.cardsPlayed.push(firewall)
    objectives.cardsPlayed.push(scan)
    objectives.cardsPlayed.push(variable)
    expect(objectives.getSafetyBonus()).toEqual(9)
  })

  describe('defensiveBonus', () => {
    test('player has antivirus', () => {
      let player = new Player(1, 'steve', false)
      player.addPositive("ANTIVIRUS")
      expect(player.objectives.getDefensiveBonus()).toEqual(10)
    })
    test('player has firewall', () => {
      let player = new Player(1, 'steve', false)
      player.addPositive("FIREWALL")
      expect(player.objectives.getDefensiveBonus()).toEqual(5)
    })
    test('player has scan', () => {
      let player = new Player(1, 'steve', false)
      player.addPositive("SCAN")
      expect(player.objectives.getDefensiveBonus()).toEqual(0)
    })
  })

  describe('cleanBonus', () => {
    test('player has no malware', () => {
      let player = new Player(1, 'steve', false)
      let stack = {getTop: mockValue(repeat)}
      expect(player.objectives.getCleanBonus({cards: [{isMimic: false}]}, [stack])).toEqual(10)
    })
    test('player has virus', () => {
      let player = new Player(1, 'steve', false)
      let stack = {getTop: mockValue(virus)}
      expect(player.objectives.getCleanBonus({cards: []}, [stack])).toEqual(0)
    })
    test('player has trojan', () => {
      let player = new Player(1, 'steve', false)
      expect(player.objectives.getCleanBonus({cards: [{isMimic: true}]}, [])).toEqual(0)
    })
    test('player has negative effect', () => {
      let player = new Player(1, 'steve', false)
      player.addNegative('RANSOM', 0)
      expect(player.objectives.getCleanBonus({cards: []}, [])).toEqual(0)
    })

  })

  test('has a complete stack', () => {
    let objectives = new Objectives({})
    let stacks = [complete, complete, notComplete]
    expect(objectives.getCompleteBonus(stacks)).toEqual(10)
  })
  test('does not have a complete stack', () => {
    let objectives = new Objectives({})
    let stacks = [notComplete, notComplete]
    expect(objectives.getCompleteBonus(stacks)).toEqual(0)
  })
})
