import {Turn} from './AiChain'
import {store} from '../../store/store'

export default class Firewall extends Turn {
  execute () {
    if (this.hand.firewallCard !== undefined && !store.getters.getCurrentPlayer.hasFirewall) {
      this.cardToPlay = this.hand.firewallCard
      this.moveType = 'protection'
      return true
    }
    return false
  }
}
