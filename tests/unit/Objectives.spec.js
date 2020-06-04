import Objectives from '@/classes/game/Objectives'
import Player from '@/classes/game/Player'

let group = {type: 'GROUP'}
let repeat = {type: 'REPEAT'}
let variable = {type: 'VARIABLE'}
let antivirus = {type: 'ANTIVIRUS'}
let firewall = {type: 'FIREWALL'}
let complete = {isComplete: () => {return true}}
let notComplete = {isComplete: () => {return false}}


describe('Objectives.js', () => {
  test('all objectives when there are no cards played', () => {
    // Might be better to mock out the player in the future
    let player = new Player(0, 'steve', false)
    let stacks = []
    let bonuses = player.objectives.getBonuses(stacks)
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
    expect(objectives.getRepeatBonus()).toEqual(4)
  })
  test('played variable cards', () => {
    let objectives = new Objectives({})
    objectives.cardsPlayed.push(variable)
    objectives.cardsPlayed.push(repeat)
    objectives.cardsPlayed.push(variable)
    expect(objectives.getVariableBonus()).toEqual(6)
  })
  test('played safety cards', () => {
    let objectives = new Objectives({})
    objectives.cardsPlayed.push(antivirus)
    objectives.cardsPlayed.push(firewall)
    objectives.cardsPlayed.push(variable)
    expect(objectives.getSafetyBonus()).toEqual(20)
  })
  test('player has all safety effects', () => {
    let player = new Player(1, 'steve', false)
    player.addPositive("ANTIVIRUS")
    player.addPositive("FIREWALL")
    expect(player.objectives.getDefensiveBonus()).toEqual(10)
  })
  test('player has no virus', () => {
    let player = new Player(1, 'steve', false)
    expect(player.objectives.getCleanBonus()).toEqual(10)
  })
  test('player has virus', () => {
    let player = new Player(1, 'steve', false)
    player.addNegative('VIRUS')
    expect(player.objectives.getCleanBonus()).toEqual(0)
  })
  test('has a complete stack', () => {
    let objectives = new Objectives({})
    let stacks = [complete, notComplete]
    expect(objectives.getCompleteBonus(stacks)).toEqual(10)
  })
  test('does not have a complete stack', () => {
    let objectives = new Objectives({})
    let stacks = [notComplete, notComplete]
    expect(objectives.getCompleteBonus(stacks)).toEqual(0)
  })
})
