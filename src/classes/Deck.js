/**
 * Created by Lance on 2017-03-10.
 */
import Card from './Card'
export default class Deck {
  constructor(){
    //this.initDeck();
  };

  cards = [];
  discard_cards = []
  //cardId = 0;

  initDeck() {
    // generate Instruction cards
    let cardId = 0;

    /// TODO START ***** FOR TESTING ONLY, PLEASE DELETE IN PRODUCTION
    this.cards.push(new Card(109, 1, 'I'))
    this.cards.push(new Card(110, 2, 'I'))
    this.cards.push(new Card(111, 3, 'I'))
    this.cards.push(new Card(112, 4, 'G'))
    this.cards.push(new Card(113, 1, 'G'))
    /// TODO END ***** FOR TESTING ONLY, PLEASE DELETE IN PRODUCTION

    for(let i = 0; i < 8; i++) {
      for (let i = 1; i < 4; i++) {
        //what should this be?
        //this.$store.commit('addCardToDeck', new Card(cardId, i, 'I'));//this?
        this.cards.push(new Card(cardId, i, 'I'));//or this?
        cardId++;
      }
    }
    // generate fixed Repitition cards
    for(let i = 0; i < 2; i++) {
      for (let i = 2; i < 6; i++) {
        //this.$store.commit('addCardToDeck', new Card(this.cardId, i, 'R'));
        this.cards.push(new Card(cardId, i, 'R'));
        cardId++;
      }
    }

    // generate variable repetition cards
    for (let i = 0; i < 5; i++) {
      //this.$store.commit('addCardToDeck', new Card(this.cardId, 0, 'Rx'));
      this.cards.push(new Card(cardId, 1, 'R'));
      cardId++;
    }

    // generate fixed Repitition cards
    for(let i = 0; i < 2; i++) {
      for (let i = 2; i < 7; i++) {
        //this.$store.commit('addCardToDeck', new Card(this.cardId, i, 'G'));
        this.cards.push(new Card(cardId, i, 'G'));
        cardId++;
      }
    }

    // generate variables cards
    for(let i = 0; i < 4; i++) {
      for (let i = 2; i < 5; i++) {
        //this.$store.commit('addCardToDeck', new Card(this.cardId, i, 'V'));
        this.cards.push(new Card(cardId, i, 'V'));
        cardId++;
      }
    }

    // generate variable cards
    for(let i = 0; i < 2; i++) {
      for (let i = 5; i < 7; i++) {
        //this.$store.commit('addCardToDeck', new Card(this.cardId, i, 'V'));
        this.cards.push(new Card(cardId, i, 'V'));
        cardId++;
      }
    }

    for (let i = 0; i < 5; i++) {
      //this.$store.commit('addCardToDeck', new Card(this.cardId, 0, 'H'));
      this.cards.push(new Card(cardId, 0, 'H'));
      cardId++;
    }
    console.log(this.cards.length+'End of init');
    for(let card of this.cards){
      console.log('id:'+card.id+':'+card.value);
    }

    // TODO: uncommment this later TESTING

    this.shuffle();

  };//end Init game
  draw() {
    let card = this.cards[0];//[0] is the top of the deck
    this.cards.shift();//unshift removes the first element.
    console.log(this.cards.length);
    //console.log(this);
    return card;
  };
  shuffle() {
    for (let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
  }

}
