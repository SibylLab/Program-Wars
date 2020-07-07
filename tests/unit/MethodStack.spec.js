import MethodStack from '@/classes/game/MethodStack'


describe('methodStack', () => {
  let method
  beforeEach(() => {
    method = new MethodStack(2)
    method.cards = [{value: 2}, {value: 3}]
  })

  test('hasMaxRepeats is always true', () => {
    expect(method.hasMaxRepeats()).toBeTruthy()
  })
  test('hasVariable is always false', () => {
    expect(method.hasVariable()).toBeFalsy()
  })
  test('getScore', () => {
    expect(method.getScore()).toEqual(5)
  })
  test('isComplete no', () => {
    expect(method.isComplete()).toBeFalsy()
  })
  test('isComplete yes', () => {
    method.cards.push({value: 5})
    expect(method.isComplete()).toBeTruthy()
  })
  test('toLimit', () => {
    expect(method.toLimit()).toEqual(4)
  })
  test('willAccept no not instruction', () => {
    expect(method.willAccept({type: 'REPEAT'})).toBeFalsy()
  })
  test('willAccept no to big', () => {
    expect(method.willAccept({type: 'INSTRUCTION', value: 6})).toBeFalsy()
  })
  test('willAccept yes', () => {
    expect(method.willAccept({type: 'INSTRUCTION', value: 3})).toBeTruthy()
  })


})

