import MainComponent from '../../../src/components/MainGame/MainComponent.vue'
import { store } from '../../../src/store/store'

// function getSubmit (Component, propsData) {
//   const Ctor = Vue.extend(Component)
//   const vm = new Ctor({ propsData }).$mount()
//   return vm.submit
// }

describe('MainComponent.js', () => {
  it('has a created hook', () => {
    expect(typeof MainComponent.created).to.equal('function')
  })

  it('sets the correct default data', () => {
    expect(typeof MainComponent.data).to.equal('function')
    const defaultData = MainComponent.data()
    expect(defaultData.idCounter).to.equal(0)
    expect(defaultData.dataToggle).to.equal(false)
    expect(defaultData.localPlayers).to.equal([])
    expect(defaultData.gameStart).to.equal(false)
    expect(defaultData.showDismissCards).to.equal(false)
    expect(defaultData.modalCards).to.equal([])
    expect(defaultData.gameOverWinner).to.equal('')
    expect(defaultData.gameOverText).to.equal('')
    expect(defaultData.modalId).to.equal('gameOverModal')
    expect(defaultData.tipsToggle).to.equal(true)
    expect(defaultData.factsToggle).to.equal(true)
    expect(defaultData.playerList).to.equal([])
    expect(defaultData.winner).to.equal('')
    expect(defaultData.winnerScore).to.equal(0)
    expect(defaultData.deleteData).to.equal([])
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
