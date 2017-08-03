import Sprinter from './Sprinter'
import Hacker from './Hacker'
export default class Personality {

  constructor(name) {
    if(name === 'Flash' || name === 'JarJarBinks') {
      this.personality = new Sprinter();
    }
    if(name === 'Joker') {
      this.personality = new Hacker();
    }
  };

  turnLogic(event) {
      return this.personality.turnLogic(event);
  }
}
