<template>
<div id="header">

  <h4 id="title" class="head-text">Program Wars</h4>

  <h4 id="limit" class="head-text" v-if="isGame">
    Score Limit: {{ scoreLimit }}
  </h4>

  <label id="tips-check" class="head-text" v-if="isGame">
    <input type="checkbox" value="true" v-on:click="toggleTips" checked>Game Tips
  </label>

  <!-- connects to an easytimer instance through id and class
       actual timer is maintained in store -->
  <div id="basicUsage" v-if="isGame" class="p-3 mb-2 bg-primary text-white">
    00:00:00
  </div>

  <side-menu id="menu"></side-menu>

</div>
</template>


<script>
import SideMenu from '@/components/shared/SideMenu'
import {mapState, mapMutations, mapGetters} from 'vuex'

export default {
  name: 'landing-page',
  data () {
    return {}
  },
  components: {
    'side-menu': SideMenu,
  },
  computed: {
    ...mapState([
      'scoreLimit',
    ]),
    ...mapGetters([
      'isGame',
    ]),
  },
  methods: {
    ...mapMutations([
      'toggleTips'
    ])
  }
}
</script>


<style scoped>
#header {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 40px;
  background-color: #333333;
  font-family: monospace;
}

#title {
  position: absolute;
  top: 10px;
  left: 1%;
}

#limit {
  position: relative;
  top: 10px;
  text-align: 'center';
}

.head-text {
  margin-top: 0;
  margin-bottom: 0;
  color: #fff;
}

#tips-check {
  position: absolute;
  top: 10px;
  right: 140px;
  margin-bottom: 0;
}

#basicUsage {
  width: 70px;
  position: absolute;
  top: 5px;
  right: 60px;
  font-size: 13px;
  text-decoration: blue;
  padding: 2px;
  margin-top: 0px;
  border: solid #333333 2px;
  border-radius: 5px;
  vertical-align: baseline;
}

#menu {
  position: absolute;
  top: 2px;
  right: 1%;
}
</style>
