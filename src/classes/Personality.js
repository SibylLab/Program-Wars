import Sprinter from './Sprinter'
import Hacker from './Hacker'
export default class Personality {

  constructor() {
    let num = Math.floor((Math.random() * 3) + 1);
    switch(num) {
      case 1:
      case 2: this.personality = new Sprinter(); console.log('num was ' + num); break;
      case 3: this.personality = new Hacker(); console.log('num was ' + num); break;
    }
    if(num === 1) {
      this.isTimid = true;
    }
    // if(name === 'Flash' || name === 'JarJarBinks') {
    //   this.personality = new Sprinter();
    // }
    // if(name === 'Joker') {
    //   this.personality = new Hacker();
    // }
  };

  turnLogic(event) {
      return this.personality.turnLogic(event, this.isTimid);
  }
}
