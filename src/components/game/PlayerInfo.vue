<template>
<div id="info">
  <!-- Add some effect on the name or image to indicate current players turn -->
  <h3 id="name" :class="side">{{ playerName }}</h3>

  <img id="avatar" :class="side" :src="playerImagePath">

  <!-- Value needs to be tracking the players score
       Maybe also add title to show value/total
       Also should show a numerical value of score somewhere near by
       This is only annoying because of the absolute positioning so
       everything needs to be positioned explicitly -->
  <meter id="score-meter" :class="side"
     :max="scoreLimit" min=0
     :value="2000"
     :high="scoreLimit * 0.75"
     :low="scoreLimit / 2"
     :optimum="scoreLimit - 500">
  </meter>

  <!-- These list should obviously be tracking the good and bad effects
       for a player. We need to use v-for and the effect name to get
       the image path. For now we can use smushed card images. Titles
       should say what the effect is doing to you. -->
  <div id="good-effects" :class="side" style="position: absolute; top: 65%;">
    <ul>
      <li style="background-color: green;"></li>
      <li style="background-color: green;"></li>
      <li style="background-color: green;"></li>
      <li style="background-color: green;"></li>
      <li style="background-color: green;"></li>
    </ul>
  </div>

  <div id="bad-effects" :class="side" style="position: absolute; top: 80%;">
    <ul>
      <li style="background-color: red;"></li>
      <li style="background-color: red;"></li>
      <li style="background-color: red;"></li>
    </ul>
  </div>
</div>
</template>


<script>
import {mapState} from 'vuex'

export default {
  name: 'player-info',
  props: ['player', 'side'],
  components: {
  },
  computed: {
    ...mapState([
      'scoreLimit'
    ]),
    /**
     * Gives players name if the player has been set properly.
     */
    playerName () {
      return this.player !== undefined ? this.player.name : "Undefined"
    },
    /**
     * Create an path string for the players avatar image choice.
     */
    playerImagePath () {
      // later change to imageId to get the specific image they want 
      return "/static/playerImages/robo_" + this.player.id + ".jpg"
    }
  },
  methods: {
  },
}
</script>

<style scoped>
#info {
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
}

#name {
  position: absolute;
  top: 2%;
  margin-top: 0;
  margin-bottom: 0;
}

#avatar {
  position: absolute;
  top: 15%;
  width: 45%;
  height: 35%;
  border: solid black 3px;
}

#score-meter {
  position: absolute;
  top: 55%;
  width: 50%;
  height: 15px;
}

.left {
  left: 5%;
}

.right {
  right: 5%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
  margin: 5px 5px;
  width: 30px;
  height: 30px;
}
</style>

