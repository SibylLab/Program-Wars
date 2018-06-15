let playerModalTimer = 2;// sec
let endTurnTimer = 1.5;// sec
let coinTimer = 2;// sec
let runTimer = 1;// sec

/**
 * These are all of the asynchronous functions that are used by the store. You can directly call other functions from
 * these because they are asynchronous.
 */
export default {
  playerTookTurn(context) {
    context.commit('removeActiveCardFromHand');
    context.commit('setHasPlayed', {hasPlayed: true});
    context.commit('setPlayerScores')
  },

  firstRound(context) {
    context.commit('playerModalTrigger');
    if(!context.state.isTutorial)
      context.dispatch('coinAnimation');
    setTimeout(() => {
      context.commit('playerModalHide');
      context.state.pointerEvent = '';
    }, playerModalTimer * 1000);
    setTimeout(() => {
      if(context.getters.getCurrentPlayer.isAi) {
        context.commit('aiTakeTurn', context.getters.getAiDependent);
      }
    }, 2500)
  },

  coinAnimation(context){
    context.commit('coinModalTrigger');
    context.commit('setCoinFlipAnim', 0);
    context.commit('setPlayfieldColour', true);
    context.state.coinMsg = context.state.activeSide ? true : false;
    setTimeout(() => {context.commit('setCoinFlipAnim', 1)}, 200);
    setTimeout(() => {
      $('.coin').modal('handleUpdate');
      $('.coin').modal('hide');
    }, coinTimer * 1000);
  },

  /**
   * At the beginning and end of every players turn this function will be called to do a variety of things related to their turn.
   * This function will play the coin animations, choose an active side, display winners if at least one person won, and display any
   * modals necessary.
   * @param context
   * @param payload
   */
  turn(context, payload) {
    context.commit('getIsLast');
    context.state.pointerEvent = 'pointer-events: none';
    switch(payload) {
      case true:
        if(context.state.isLast) {
            setTimeout(() => {
              context.commit('setHasPlayed', {hasPlayed: false});
              context.commit('endTurn', context.state.players.length);
              context.commit('setGameState', {gameState: 'startPlayerTurn'});
              return '';
            }, endTurnTimer * 1000)
        } else {
          setTimeout(() => {
            context.commit('setHasPlayed', {hasPlayed: false});
            context.commit('endTurn', context.state.players.length);
            context.commit('setGameState', {gameState: 'startPlayerTurn'});
            context.commit('playerModalTrigger');
            setTimeout(() => {
              context.commit('playerModalHide');
            }, playerModalTimer * 1000);
          }, endTurnTimer * 1000);
          setTimeout(() => {
            console.log("Made it to ai turn")
            if(context.getters.getCurrentPlayer.isAi) {

              console.log("InAiTurn")
              context.commit('aiTakeTurn', context.getters.getAiDependent);
            }
          }, 4000)
        }
        context.state.pointerEvent = '';
        break;
      case false:
        context.commit('checkWin');
        if(!context.state.winner) {
          context.dispatch('coinAnimation');
        }
        if (context.state.winner) {
          setTimeout(() => {
          context.commit('winnerModalTrigger');
          return '';
        }, coinTimer * 1000 + 350)
        }
        else if(!(context.state.winner)) {
          setTimeout(() => {
            context.commit('playerModalTrigger');
            setTimeout(()=> {
              context.commit('playerModalHide');
              context.state.pointerEvent = '';
            }, playerModalTimer * 1000)
          }, (coinTimer + runTimer) * 1000 + 350);
          setTimeout(() => {
            if(context.getters.getCurrentPlayer.isAi) {
              context.commit('aiTakeTurn', context.getters.getAiDependent);
            }
          }, 6000)
        }
        break;
    }
  }
}
