let playerModalTimer = 2;// sec
let endTurnTimer = 1.5;// sec
let coinTimer = 2;// sec
let runTimer = 1;// sec

export default {
  playerTookTurn(context) {
    context.commit('removeActiveCardFromHand');
    context.commit('setHasPlayed', {hasPlayed: true});
    context.commit('setPlayerScores')
  },
  firstRound(context) {
    context.commit('playerModalTrigger');
    setTimeout(() => {
      context.commit('playerModalHide');
      context.state.pointerEvent = ''
    }, playerModalTimer * 1000)
  },
  turn(context, payload) {
    context.commit('getIsLast');
    context.state.coinMsg = 'Evaluating...';
    context.state.pointerEvent = 'pointer-events: none'
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
            if(context.getters.getCurrentPlayer.isAi) {
              // console.log(context.getters.getCurrentPlayerHand)
              context.commit('aiTakeTurn', context.getters.getAiDependent);
            }
          }, 4000)
        }
        context.state.pointerEvent = '';
        break;
      case false:
        context.commit('checkWin');
        context.commit('coinModalTrigger');
        context.commit('setCoinFlipAnim', 0);
        context.commit('setPlayfieldColour', true);
        context.state.coinMsg = context.state.activeSide ? 'True' : 'False';
        setTimeout(() => {context.commit('setCoinFlipAnim', 1)}, 200);
        setTimeout(() => {
          $('.coin').modal('handleUpdate');
          $('.coin').modal('hide');
          setTimeout(() => {
            if(!(context.state.winner)) {
              context.commit('setPlayfieldColour', false);
            }
          }, runTimer * 1000);
        }, coinTimer * 1000);
        if (context.state.winner) {
          setTimeout(() => {
          context.commit('winnerModalTrigger');
          return '';
        }, coinTimer * 1000 + 350)
        }
        if(!(context.state.winner)) {
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
