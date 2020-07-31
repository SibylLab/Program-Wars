import DryReq from '@/classes/agile/DryReq'
import InfoSecReq from '@/classes/agile/InfoSecReq'
import WhiteHatReq from '@/classes/agile/WhiteHatReq'

const personalityToType = {
  'standard': 'DRY',
  'aggressive': 'whiteHat',
  'defensive': 'infoSec',
  'basic': 'DRY'
}


/**
 * A factory to return Requirement objects.
 */
export default class ReqFactory {

  /**
   * Return a requirement object of the given type.
   * @param type A string name of the desired requirement
   * @return A Requirement object of the given type
   * @throws if the type is not valid
   */
  newReq (type, playerId) {
    if (type === 'DRY') {
      return new DryReq(playerId)
    } else if (type === 'infoSec') {
      return new InfoSecReq(playerId)
    } else if (type === 'whiteHat') {
      return new WhiteHatReq(playerId)
    } else {
      throw type + ' is not a valid requirement type'
    }
  }

  newAIReq (personality, playerId) {
    let type = personalityToType[personality]
    if (!type) { type = 'DRY' }
    return this.newReq(type, playerId)
  }
}
