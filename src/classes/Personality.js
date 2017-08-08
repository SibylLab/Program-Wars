import Sprinter from './Sprinter'
import Hacker from './Hacker'
import Gambler from './Gambler'
export default class Personality {

  constructor() {
    // let num = Math.floor((Math.random() * 3) + 1);
    // switch(num) {
    //   case 1: this.isTimid = true;
    //   case 2: this.personality = new Sprinter(); break;
    //   case 3: this.personality = new Hacker(); break;
    // }
    this.personality = new Gambler();
  };

  turnLogic(event) {
      return this.personality.turnLogic(event, this.isTimid);
  }
}
