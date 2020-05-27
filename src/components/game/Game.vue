<template>
  <!--
  This will be split up into components as show in the picture.
  The top will have the title bar component with menu and other stuff.
    It may need to be a subclass of the other component or the other component
    will have to be able to support adding a few things that may not be
    visible if we are choosing a new game.

  Then we will have a container for 3 areas
  There will be a card area in the middle that will be for showing the current
    player their hand and any relevant information or buttons.
  Then on either side of this component there will be player info areas.
    These areas will contain info about each player and show changes to their
    status as the game progresses.
  
  Below this we will have a container for the players stacks/objectives.
  There will be 2 in here for a normal game. One for each player.
  Each component will have a tab for the players stacks and a tab for the
    players objectives to be listed. The objectives should be adjusted to keep
    track of more than just these if statements
  -->
<div>
  <div id="page">

    <page-header></page-header>

    <div id="play">
     <div id="left-player">
       <player-info :player="getPlayer(0)" side="left"></player-info>
     </div>

     <div id="right-player">
       <player-info :player="getPlayer(1)" side="right"></player-info>
     </div>
    </div>

    <div id="stacks">
     <p> This is the stacks area </p>
    </div>
    
  </div>
</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import PlayerInfo from '@/components/game/PlayerInfo'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'game-page',
  components: {
    'page-header': PageHeader,
    'player-info': PlayerInfo
  },
  computed: {
    ...mapState([
      'gameState',
      'players'
    ])
  },
  methods: {
    ...mapActions([
      'leaveGame'
    ]),
    getPlayer (id) {
      return this.players[id]
    }
  },
  created () {
    // If gameState is not game when we create this element (page refresh)
    // Then we want to leave the game and return to home page.
    if (this.gameState !== 'game') {
      this.leaveGame()
    }
  }
}
</script>

<style scoped>
#page {
  width: 100%;
  height: 100%;
  background-color: grey;
}

#play {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 45%;
  background-color: #e8e8e8;
}

#left-player {
  position: absolute;
  left: 0px;
  width: 25%;
  height: 100%;
}

#right-player {
  position: absolute;
  right: 0px;
  width: 25%;
  height: 100%;
}

#stacks {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 50%;
  background-color: grey;
}
</style>
