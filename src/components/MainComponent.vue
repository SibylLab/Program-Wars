<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <player-info-panel></player-info-panel>
    <div id="flexcontainer">
      <playfield :trueFalse="true"></playfield>
      <playfield :trueFalse="false"></playfield>
    </div>
  </div>
</template>

<script>

import PlayerInfoPanel from './PlayerInfoPanel'
import Playfield from './Playfield'

export default {
  name: 'main-component',
  data () {
    return {
      msg: 'Welcome to Programming Wars'
    }
  },
  components: {
    'player-info-panel': PlayerInfoPanel,
    'playfield': Playfield
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flexcontainer {
  width: 100%;
  display: flex;
  flex-direction: row;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
