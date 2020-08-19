import Method from '@/classes/card/Method'
import MethodCardWrapper from '@/classes/card/MethodCardWrapper'
import Stack from '@/classes/stack/Stack'

jest.mock('@/classes/card/MethodCardWrapper')
jest.mock('@/classes/stack/Stack')

describe('Method class', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a method card', () => {
    const card = new Method('deck')
    expect(card.value).toEqual(0)
    expect(card.type).toEqual('METHOD')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/method.png')
  })

  test('playing the method card', () => {
    const playField = { method: 'method', player: 'player', addStack: jest.fn() }
    const playInfo = { playField }

    const card = new Method('deck')
    card.play(playInfo)

    expect(MethodCardWrapper).toBeCalledWith(card, playField.method)
    expect(Stack).toBeCalledWith(MethodCardWrapper.mock.instances[0], playField.player)
    expect(playField.addStack).toBeCalledWith(Stack.mock.instances[0])
  })
})
