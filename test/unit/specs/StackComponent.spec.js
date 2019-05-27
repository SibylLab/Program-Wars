/**
 * Stack Vue Component unit tests
 * By Austin Ball    on: 24/05/19
 */

// import {shallowMount} from '@vue/test-utils'
import Stack from '../../../src/components/SharedComponents/Stack.vue'

describe('Stack.vue', () => {
  it('has created hook', () => {
    expect(typeof Stack.created).to.equal('function')
  })

  it('sets correct default data', () => {
    expect(typeof Stack.data).to.equal('function')
    const defaultData = Stack.data()
    expect(defaultData.title).to.equal('Stack')
    expect(defaultData.id).to.equal(undefined)
    expect(defaultData.activeStack).to.equal('')
    expect(defaultData.dataContent).to.equal('hello')
    expect(defaultData.groupSelectConfirm).to.equal('Group Stacks')
    expect(defaultData.groupSelectedText).to.equal(undefined)
  })

  it('computes object', () => {
    expect(typeof Stack.computed).to.equal('object')
  })

  /* it('test groupableStack', () => {
    const wrapper = shallowMount(Stack, {
    })
    expect(Stack.computed.groupableStack.call()).to.equal(false)
  }) */
})
