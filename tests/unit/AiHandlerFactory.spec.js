import AiHandlerFactory from '@/classes/ai/AiHandlerFactory'


describe('AiHandlerFactory', () => {
  const player = {id: 0}
  const factory = new AiHandlerFactory()

  test('with default easy personality', () => {
    let handler = factory.newHandler('any', player)
    expect(handler.player).toBe(player)
    expect(handler.actionHandlers.length).toEqual(2)
    expect(handler.actionHandlers[0].player).toBe(player)
    expect(handler.actionHandlers[1].player).toBe(player)
    expect(handler.actionHandlers[1].playOrder.VARIABLE).toEqual(0)
  })
  test('with aggressive personality', () => {
    let handler = factory.newHandler('aggressive', player)
    expect(handler.player).toBe(player)
    expect(handler.actionHandlers.length).toEqual(2)
    expect(handler.actionHandlers[0].player).toBe(player)
    expect(handler.actionHandlers[1].player).toBe(player)
    expect(handler.actionHandlers[1].playOrder.VIRUS).toEqual(2)
  })
})
