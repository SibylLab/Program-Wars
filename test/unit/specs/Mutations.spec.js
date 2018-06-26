import {store} from '../../../src/store/store'

describe('test store.js getters', () => {
  it('test the store addPlayers function', () => {
    let pay = {list: [{name: 'joe', isAi: false}]}
    store.commit('addPlayers', pay)
    expect(store.getters.getPlayers[0].name).to.equal('joe')
  })
  it('test the store resetState function', () => {
    expect(store.getters.getWinner).to.equal(false)
  })
  it('test the store endTurn function', () => {
    store.commit('endTurn', 1)
    expect(store.getters.getPlayers[0].name).to.equal('joe')
  })
})
