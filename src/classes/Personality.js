import Sprinter from './Sprinter'
import Hacker from './Hacker'
import Gambler from './Gambler'
import Protector from './Protector'
export default class Personality {

  constructor() {
    let num = Math.floor((Math.random() * 5) + 1);
    switch(num) {
      case 1: this.isTimid = true;
      case 2: this.personality = new Sprinter(); break;
      case 3: this.personality = new Hacker(); break;
      case 4: this.personality = new Gambler(); break;
      case 5: this.personality = new Protector(); break;
    }
  };

  turnLogic(event) {
      return this.personality.turnLogic(event, this.isTimid);
  }
}
