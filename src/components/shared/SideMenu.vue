<template>
<div>
  <!-- Modals -->
  <backstory-modal id="backstoryModal" class="modal fade backstory"
      tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
  </backstory-modal>
  <rules-modal id="rulesModal" class="modal fade rules"
      tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"
      style="background-color: yellowgreen">
  </rules-modal>
  <credits-modal id="creditsModal" class="modal fade credits"
      tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"
      style="background-color: mediumpurple">
  </credits-modal>

  <!-- Side menu using a sidenav -->
  <input type='image'  src='static/miscIcons/burgerIcon.png'
      v-on:click="openMenu" style="width: 36px; height: 36px;">
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" v-on:click="closeMenu">&times;</a>
    <a href="javascript:void(0)" v-if="showNewGame" v-on:click="leaveGame">New Game</a>
    <a href="#" data-toggle="modal" data-target=".backstory">Backstory</a>
    <a href="#" data-toggle="modal" data-target=".rules">Rules</a>
    <a href="#" data-toggle="modal" data-target=".credits">Credits</a>
    <a href="https://gitreports.com/issue/johnanvik/program-wars"
        target="_blank">Report Issue</a>
  </div>

</div>
</template>

<script>
import BackstoryModal from '@/components/modals/BackstoryModal'
import RulesModal from '@/components/modals/RulesModal'
import CreditsModal from '@/components/modals/CreditsModal'
import {mapActions, mapState, mapMutations} from 'vuex'

export default {
  name: 'side-menu',
  data () {
    return {
      showMenu: false
    }
  },
  components: {
    'backstory-modal': BackstoryModal,
    'rules-modal': RulesModal,
    'credits-modal': CreditsModal
  },
  computed: {
    ...mapState([
      'gameState',
      'showBackstory'
    ]),
    showNewGame () {
      return this.gameState !== "home"
    }
  },
  methods: {
    ...mapMutations([
      'seenBackstory'
    ]),
    ...mapActions([
      'leaveGame'
    ]),
    openMenu () {
      this.showMenu = true
      $('.sidenav').width('250px')
    },
    closeMenu () {
      this.showMenu = false
      $('.sidenav').width('0px')
    }
  },
  mounted () {
    if (this.showBackstory) {
      $('#backstoryModal').modal('show')
      this.seenBackstory()
    }
  }
}
</script>

<style scoped>
.sidenav {
  height: 100%;
  width: 0px;
  position: fixed;
  z-index: 1;
  top: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
  right: 0;
  z-index: 1000;
}

.sidenav a {
  padding: 0px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 3px;
  font-size: 36px;
  margin-left: 50px;
}
</style>
