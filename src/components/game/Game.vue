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
  <div id="page">
  <page-header></page-header>
  <h1>Game Page</h1>
  </div>

</template>


<script>
import PageHeader from '@/components/shared/PageHeader'

export default {
  name: 'game-page',
  components: {
    'page-header': PageHeader
  },
}
</script>

<style scoped>
#page {
  width: 100%;
  height: 100%;
  background-color: grey;
}
</style>
