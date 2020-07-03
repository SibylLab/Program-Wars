import Trojan from '@/classes/game/Trojan'
import Card from '@/classes/game/Card'

const scan = new Card('SCAN', 0)
const ransom = new Card('RANSOM', 0)
const virus = new Card('VIRUS', 0)
const method = new Card('METHOD', 3)
const instruction = new Card('INSTRUCTION', 2)
const repeat = new Card('REPEAT', 4)

const player = {id: 0}

describe('Trojan', () => {
  test('constructor functions properly', () => {
    let trojan = new Trojan(scan, player)
    expect(trojan.type).toEqual(scan.type)
    expect(trojan.value).toEqual(scan.value)
    expect(trojan.image).toEqual(scan.image)
    expect(trojan.isExtra).toBeFalsy()
    expect(trojan.card).toBe(scan)
    expect(trojan.player).toBe(player)
    expect(trojan.isMimic).toBeTruthy()
  })
  test('replace safety is ransom card', () => {
    let trojan = new Trojan(scan, player)
    let replaced = trojan.replace()
    expect(replaced.type).toEqual("RANSOM")
    expect(replaced.isExtra).toBeTruthy()
  })
  test('replace method is ransom card', () => {
    let trojan = new Trojan(method, player)
    let replaced = trojan.replace()
    expect(replaced.type).toEqual("RANSOM")
  })
  test('replace instruction is ransom card', () => {
    let trojan = new Trojan(instruction, player)
    let replaced = trojan.replace()
    expect(replaced.type).toEqual("RANSOM")
  })
  test('replace attack is spyware card', () => {
    let trojan = new Trojan(ransom, player)
    let replaced = trojan.replace()
    expect(replaced.type).toEqual("SPYWARE")
    expect(replaced.isExtra).toBeTruthy()
  })
  test('replace virus is spyware card', () => {
    let trojan = new Trojan(virus, player)
    let replaced = trojan.replace()
    expect(replaced.type).toEqual("SPYWARE")
  })
  test('replace repeat (any other type) is virus card', () => {
    let trojan = new Trojan(repeat, player)
    let replaced = trojan.replace()
    expect(replaced.type).toEqual("VIRUS")
    expect(replaced.isExtra).toBeTruthy()
  })
})
