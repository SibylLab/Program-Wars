import MethodCardWrapper from '@/classes/card/MethodCardWrapper'
import CardWrapper from '@/classes/card/CardWrapper'

jest.mock('@/classes/card/CardWrapper')

describe('MethodCardWrapper', () => {
  const method = { getScore: jest.fn(() => { return 5 }) }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new method card wrapper', () => {
    const wrapper = new MethodCardWrapper('card', method)
    expect(CardWrapper).toBeCalledWith('card')
    expect(wrapper.method).toBe(method)
  })

  test('getting the wrappers value', () => {
    const wrapper = new MethodCardWrapper('card', method)
    expect(wrapper.getValue()).toEqual(5)
    expect(method.getScore).toBeCalledTimes(1)
  })

})
