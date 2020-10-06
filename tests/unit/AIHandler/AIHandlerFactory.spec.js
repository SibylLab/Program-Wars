import AIHandlerFactory from '@/classes/AIHandler/AIHandlerFactory'
import AIHandler from '@/classes/AIHandler/AIHandler'
import PlayBestCard from '@/classes/AIHandler/PlayBestCard'
import PlayRandomCard from '@/classes/AIHandler/PlayRandomCard'

jest.mock('@/classes/AIHandler/AIHandler')
jest.mock('@/classes/AIHandler/PlayBestCard')
jest.mock('@/classes/AIHandler/PlayRandomCard')

describe('AIHandlerFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('newHandler', () => {
    // also tests _newBeginnerHandler as it is so simple
    test('creating a new beginner handler', () => {
      const beginSpy = jest.spyOn(AIHandlerFactory.prototype, '_newBeginnerHandler')
      const factory = new AIHandlerFactory()
      factory.newHandler('beginner')

      expect(beginSpy).toBeCalledTimes(1)
      expect(PlayRandomCard).toBeCalledTimes(1)
      const playRandomInstance = PlayRandomCard.mock.instances[0]
      expect(AIHandler).toBeCalledTimes(1)
      expect(AIHandler).toBeCalledWith([playRandomInstance])
    })

    test('creating a new standard handler', () => {
      const factory = new AIHandlerFactory()
      factory._newStandardHandler = jest.fn()
      factory.newHandler('standard')

      expect(factory._newStandardHandler).toBeCalledTimes(1)
      expect(factory._newStandardHandler).toBeCalledWith('standard')
    })
  })

  describe('_newStandardHandler', () => {
    test('when the personality is valid and not standard', () => {
      const factory = new AIHandlerFactory()
      factory._newStandardHandler('aggresive')

      expect(PlayBestCard).toBeCalledTimes(1)
      const arg = PlayBestCard.mock.calls[0][0]
      expect(arg[0]).toEqual('SORT')
      expect(arg[5]).toEqual('RANSOM')
      expect(arg[11]).toEqual('INSTRUCTION')
      
      const playBestInstance = PlayBestCard.mock.instances[0]
      expect(AIHandler).toBeCalledTimes(1)
      expect(AIHandler).toBeCalledWith([playBestInstance])
    })

    test('when the personality is valid and not standard', () => {
      const factory = new AIHandlerFactory()
      factory._newStandardHandler('aggresive')

      expect(PlayBestCard).toBeCalledTimes(1)
      const arg = PlayBestCard.mock.calls[0][0]
      expect(arg[0]).toEqual('SORT')
      expect(arg[5]).toEqual('RANSOM')
      expect(arg[11]).toEqual('INSTRUCTION')
      
      const playBestInstance = PlayBestCard.mock.instances[0]
      expect(AIHandler).toBeCalledTimes(1)
      expect(AIHandler).toBeCalledWith([playBestInstance])
    })

    test('when the personality is invalid', () => {
      const factory = new AIHandlerFactory()
      factory._newStandardHandler('invalid')

      expect(PlayBestCard).toBeCalledTimes(1)
      const arg = PlayBestCard.mock.calls[0][0]
      expect(arg[0]).toEqual('INSTRUCTION')
      expect(arg[4]).toEqual('SORT')
      expect(arg[10]).toEqual('RANSOM')
      
      const playBestInstance = PlayBestCard.mock.instances[0]
      expect(AIHandler).toBeCalledTimes(1)
      expect(AIHandler).toBeCalledWith([playBestInstance])
    })
  })

})
