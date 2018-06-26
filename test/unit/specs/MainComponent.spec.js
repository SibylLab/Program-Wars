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
    expect(Array.isArray(defaultData.localPlayers)).to.equal(true)
    expect(defaultData.gameStart).to.equal(false)
    expect(defaultData.showDismissCards).to.equal(false)
    expect(Array.isArray(defaultData.modalCards)).to.equal(true)
    expect(defaultData.gameOverWinner).to.equal('')
    expect(defaultData.gameOverText).to.equal('')
    expect(defaultData.modalId).to.equal('gameOverModal')
    expect(defaultData.tipsToggle).to.equal(true)
    expect(Array.isArray(defaultData.playerList)).to.equal(true)
    expect(defaultData.winner).to.equal('')
    expect(defaultData.winnerScore).to.equal(0)
    expect(Array.isArray(defaultData.deleteData)).to.equal(true)
  })
  // it('testing the submit funtion', () => {
  //   let newPlayer = 'jane'
  //   getSubmit()
  // })
})
