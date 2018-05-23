import hackModal from '../../../src/components/Modals/CardModals/HackModal.vue'
// import { bus } from '../../../src/components/Bus.vue'

describe('HackModal', () => {
  it('running the hackCanceled function', () => {
    // let call = false
    hackModal.methods.hackCanceled()
    // bus.$on('hackCanceled', () => {
    //   call = true
    // })
    // expect(call).to.equal(true)
  })
})
