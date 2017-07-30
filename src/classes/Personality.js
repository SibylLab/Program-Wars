import Sprinter from './Sprinter'
import Hacker from './Hacker'
export default class Personality {

  constructor(name) {
    if(name === 'Flash') {
      this.personality = new Sprinter();
    }
    if(name === 'Joker') {
      this.personality = new Hacker();
    }
  };

  turnLogic(event) {
  //   if(this.personality instanceof Sprinter) {
      return this.personality.turnLogic(event);
  //   } else if(this.personality instanceof Hacker) {
  //
  //   }
  }
}
