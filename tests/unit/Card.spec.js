import Card from '@/classes/game/Card'


describe('Card data object', () => {
  test('constructor functions properly', () => {
    let card = new Card(5, 10, 'VIRUS', 'some/image/path.png')
    expect(card.id).toEqual(5)
    expect(card.value).toEqual(10)
    expect(card.type).toEqual('VIRUS')
    expect(card.image).toEqual('some/image/path.png')
  })
})
