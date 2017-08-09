import Sprinter from './Sprinter'
import Hacker from './Hacker'
import Gambler from './Gambler'
import Protector from './Protector'
export default class Personality {

  constructor() {
    let num = Math.floor((Math.random() * 4) + 1);
    // switch(num) {
    //   case 1: this.isTimid = true;
    //   case 2: this.personality = new Sprinter(); break;
    //   case 3: this.personality = new Hacker(); break;
    //   case 4: this.personality = new Gambler(); break;
    // }
    this.personality = new Protector();
  };

  turnLogic(event) {
      return this.personality.turnLogic(event, this.isTimid);
  }
}
