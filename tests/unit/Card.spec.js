import Card from '@/classes/game/Card'


describe('Card data object', () => {
  test('constructor functions properly', () => {
    let card = new Card('VIRUS', 0)
    expect(card.value).toEqual(0)
    expect(card.type).toEqual('VIRUS')
    expect(card.image).toEqual('static/cardImages/virus0.png')
  })
  test('trojan card is attack', () => {
    let card = new Card('TROJAN', 0)
    expect(card.isAttack()).toBeTruthy()
    expect(card.isSafety()).toBeFalsy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('ransom card is attack', () => {
    let card = new Card('RANSOM', 0)
    expect(card.isAttack()).toBeTruthy()
    expect(card.isSafety()).toBeFalsy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('spyware card is attack', () => {
    let card = new Card('SPYWARE', 0)
    expect(card.isAttack()).toBeTruthy()
    expect(card.isSafety()).toBeFalsy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('antivirus card is safety', () => {
    let card = new Card('ANTIVIRUS', 0)
    expect(card.isAttack()).toBeFalsy()
    expect(card.isSafety()).toBeTruthy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('scan card is safety', () => {
    let card = new Card('SCAN', 0)
    expect(card.isAttack()).toBeFalsy()
    expect(card.isSafety()).toBeTruthy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('firewall card is safety', () => {
    let card = new Card('FIREWALL', 0)
    expect(card.isAttack()).toBeFalsy()
    expect(card.isSafety()).toBeTruthy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('virus card is not special', () => {
    let card = new Card('VIRUS', 0)
    expect(card.isAttack()).toBeFalsy()
    expect(card.isSafety()).toBeFalsy()
    expect(card.isSpecial()).toBeFalsy()
  })
})
