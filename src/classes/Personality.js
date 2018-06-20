import Handler from './AiActions/AiHandler'

/**
 * This class picks at random one of the Ai personalities to use.
 */
export default class Personality {

  constructor () {
    this.num = Math.floor((Math.random() * 4) + 1)
  };

  turnLogic (event) {
    let personality = new Handler(event)
    switch (this.num) {
      case 1: personality.setAi('sprinter'); break
      case 2: personality.setAi('hacker'); break
      case 3: personality.setAi('gambler'); break
      case 4: personality.setAi('protector'); break
    }
    return personality
  }
}
