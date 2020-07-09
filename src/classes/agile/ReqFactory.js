import DryReq from '@/classes/game/DryReq'
import InfoSecReq from '@/classes/game/InfoSecReq'
import WhiteHatReq from '@/classes/game/WhiteHatReq'

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
  newRequirement (type) {
    if (type === 'dry') {
      return new DryReq()
    } else if (type === 'infoSec') {
      return new InfoSecReq()
    } else if (type === 'whiteHat') {
      return new WhiteHatReq()
    } else {
      throw type + ' is not a valid requirement type'
    }
  }
}
