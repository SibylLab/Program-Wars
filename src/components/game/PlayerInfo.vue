<template>
<div id="info">
  <!-- Add some effect on the name or image to indicate current players turn -->
  <h3 id="name" :class="side">{{ player.name }}</h3>

  <img id="avatar" :class="side" :src="playerImagePath">

  <!-- Value needs to be tracking the players score
       Maybe also add title to show value/total
       Also should show a numerical value of score somewhere near by
       This is only annoying because of the absolute positioning so
       everything needs to be positioned explicitly -->
  <meter id="score-meter" :class="side"
     :max="scoreLimit" min=0
     :value="50"
     :high="scoreLimit * 0.75"
     :low="scoreLimit / 2"
     :optimum="scoreLimit - 500">
  </meter>

  <div id="good-effects" :class="side" style="position: absolute; top: 65%;">
    <ul :key="effectReact">
      <img v-for="effect in player.positiveEffects" v-bind:key="effect"  
          class="effect-icon" :src="effectImagePath(effect)">
    </ul>
  </div>

  <div id="bad-effects" :class="side" style="position: absolute; top: 80%;">
    <ul :key="effectReact">
      <img v-for="effect in player.negativeEffects" v-bind:key="effect"  
          class="effect-icon" :src="effectImagePath(effect)">
    </ul>
  </div>
</div>
</template>


<script>
import {bus} from '@/components/shared/Bus'
import {mapState} from 'vuex'

export default {
  name: 'player-info',
  props: ['player', 'side'],
  data () {
    return {
      effectReact: 0
    }
  },
  computed: {
    ...mapState([
      'scoreLimit'
    ]),
    playerImagePath () {
      // later change to imageId to get the specific image they want 
      return "/static/playerImages/robo_" + this.player.id + ".jpg"
    }
  },
  methods: {
    effectImagePath (effect) {
      return "/static/cardImages/effects/" + effect + ".png"
    },
  },
  created () {
    bus.$on('played-effect', (playerId) => {
      // Allows the component to know to update the effect lists
      if (playerId === this.player.id) {
        this.effectReact = !this.effectReact
      }
    })
  }
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
  border-radius: 5px;
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

.effect-icon {
  width: 30px;
  height: 30px;
  margin: 5px 5px; 
  border: solid black 2px;
}

li {
  display: inline-block;
  margin: 5px 5px;
  width: 30px;
  height: 30px;
}
</style>

