// import mainComponent from '../../../src/components/MainComponent.vue'
//
// function getSubmit (Component, propsData) {
//   const Ctor = Vue.extend(Component)
//   const vm = new Ctor({ propsData }).$mount()
//   return vm.submit
// }
//
// describe('MainComponent.js', () => {
//   it('testing the submit funtion', () => {
//     let newPlayer = 'jane'
//     getSubmit()
//   })
// })

import { store } from '../../../src/store/store'
import { actions } from '../../../src/store/actions'

describe('store tests', () => {
  it('testing store', () => {
    expect(store.state.activeSide).to.equal(true)
  })
})
