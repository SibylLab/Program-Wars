import hackModal from '@/components/Modals/CardModals/HackModal.vue'
// import { bus } from '@/components/Bus.vue'

describe('HackModal', () => {
  it('running the hackCanceled function', () => {
    // let call = false
    hackModal.methods.hackCanceled()
    // bus.$on('hackCanceled', () => {
    //   call = true
    // })
    // expect(call).toEqual(true)
  })
})
