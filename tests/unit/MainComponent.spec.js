import MainComponent from '@/components/MainGame/MainComponent.vue'

describe('MainComponent.js', () => {
  it('has a created hook', () => {
    expect(typeof MainComponent.created).toEqual('function')
  })

  it('sets the correct default data', () => {
    expect(typeof MainComponent.data).toEqual('function')
    const defaultData = MainComponent.data()
    expect(defaultData.idCounter).toEqual(0)
    expect(defaultData.dataToggle).toEqual(false)
    expect(Array.isArray(defaultData.localPlayers)).toEqual(true)
    expect(defaultData.gameStart).toEqual(false)
    expect(defaultData.showDismissCards).toEqual(false)
    expect(Array.isArray(defaultData.modalCards)).toEqual(true)
    expect(defaultData.gameOverWinner).toEqual('')
    expect(defaultData.gameOverText).toEqual('')
    expect(defaultData.modalId).toEqual('gameOverModal')
    expect(defaultData.tipsToggle).toEqual(true)
    expect(Array.isArray(defaultData.playerList)).toEqual(true)
    expect(defaultData.winner).toEqual('')
    expect(defaultData.winnerScore).toEqual(0)
    expect(Array.isArray(defaultData.deleteData)).toEqual(true)
  })
})
