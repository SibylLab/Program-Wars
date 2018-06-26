import MainComponent from '../../../src/components/MainComponent.vue'
import { store } from '../../../src/store/store'

// function getSubmit (Component, propsData) {
//   const Ctor = Vue.extend(Component)
//   const vm = new Ctor({ propsData }).$mount()
//   return vm.submit
// }

describe('MainComponent.js', () => {
  it('has a created hook', () => {
    expect(typeof MainComponent.created).toBe('function')
  })

  it('sets the correct default data', () => {
    expect(typeof MainComponent.data).toBe('function')
    const defaultData = MyComponent.data()
    expect(defaultData.idCounter).toBe(0)
    expect(defaultData.dataToggle).toBe(false)
    expect(defaultData.localPlayers).toBe([])
    expect(defaultData.gameStart).toBe(false)
    expect(defaultData.showDismissCards).toBe(false)
    expect(defaultData.modalCards).toBe([])
    expect(defaultData.gameOverWinner).toBe('')
    expect(defaultData.gameOverText).toBe('')
    expect(defaultData.modalId).toBe('gameOverModal')
    expect(defaultData.tipsToggle).toBe(true)
    expect(defaultData.factsToggle).toBe(true)
    expect(defaultData.playerList).toBe([])
    expect(defaultData.winner).toBe('')
    expect(defaultData.winnerScore).toBe(0)
    expect(defaultData.deleteData).toBe([])
  })
  // it('testing the submit funtion', () => {
  //   let newPlayer = 'jane'
  //   getSubmit()
  // })
})

describe('store tests', () => {
  it('testing store', () => {
    expect(store.state.activeSide).to.equal(true)
  })
})
