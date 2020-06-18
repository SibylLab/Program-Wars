import Card from '@/classes/game/Card'


describe('Card data object', () => {
  test('constructor functions properly', () => {
    let card = new Card(5, 10, 'VIRUS', 'some/image/path.png')
    expect(card.id).toEqual(5)
    expect(card.value).toEqual(10)
    expect(card.type).toEqual('VIRUS')
    expect(card.image).toEqual('some/image/path.png')
  })
  test('trojan card is attack', () => {
    let card = new Card(5, 10, 'TROJAN', 'some/image/path.png')
    expect(card.isAttack()).toBeTruthy()
    expect(card.isSafety()).toBeFalsy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('ransom card is attack', () => {
    let card = new Card(5, 10, 'RANSOM', 'some/image/path.png')
    expect(card.isAttack()).toBeTruthy()
    expect(card.isSafety()).toBeFalsy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('spyware card is attack', () => {
    let card = new Card(5, 10, 'RANSOM', 'some/image/path.png')
    expect(card.isAttack()).toBeTruthy()
    expect(card.isSafety()).toBeFalsy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('antivirus card is safety', () => {
    let card = new Card(5, 10, 'ANTIVIRUS', 'some/image/path.png')
    expect(card.isAttack()).toBeFalsy()
    expect(card.isSafety()).toBeTruthy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('scan card is safety', () => {
    let card = new Card(5, 10, 'SCAN', 'some/image/path.png')
    expect(card.isAttack()).toBeFalsy()
    expect(card.isSafety()).toBeTruthy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('firewall card is safety', () => {
    let card = new Card(5, 10, 'FIREWALL', 'some/image/path.png')
    expect(card.isAttack()).toBeFalsy()
    expect(card.isSafety()).toBeTruthy()
    expect(card.isSpecial()).toBeTruthy()
  })
  test('virus card is not special', () => {
    let card = new Card(5, 10, 'VIRUS', 'some/image/path.png')
    expect(card.isAttack()).toBeFalsy()
    expect(card.isSafety()).toBeFalsy()
    expect(card.isSpecial()).toBeFalsy()
  })
})
