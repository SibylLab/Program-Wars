import RedrawAction from '@/classes/ai/RedrawAction'


describe('RedrawAction ai action handler', () => {
  const player = {id: 0}
  const redraw = new RedrawAction(player)
  const testParams = ["hand", "players", "stacks", "scores"]

  test('constructor functions properly', () => {
    expect(redraw.player).toEqual(player)
  })
  test('handle returns undefined', () => {
    let move = redraw.handle(...testParams)
    expect(move.playType).toEqual("REDRAW")
    expect(move.card).toBeUndefined()
    expect(move.player).toEqual(player)
    expect(move.target).toEqual(player)
  })
})

