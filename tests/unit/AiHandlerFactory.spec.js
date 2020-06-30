import AiHandlerFactory from '@/classes/ai/AiHandlerFactory'


describe('AiHandlerFactory', () => {
  const player = {id: 0}
  const factory = new AiHandlerFactory()

  test('with default easy personality', () => {
    // Will need to be updated when standard actions are added
    let handler = factory.newHandler('any', player)
    expect(handler.player).toBe(player)
    expect(handler.actionHandlers.length).toEqual(1)
    expect(handler.actionHandlers[0].player).toBe(player)
    expect(handler.actionHandlers[0].playOrder.VARIABLE).toEqual(0)
  })
  test('with aggressive personality', () => {
    let handler = factory.newHandler('aggressive', player)
    expect(handler.player).toBe(player)
    expect(handler.actionHandlers.length).toEqual(1)
    expect(handler.actionHandlers[0].player).toBe(player)
    expect(handler.actionHandlers[0].playOrder.VIRUS).toEqual(0)
  })
})
