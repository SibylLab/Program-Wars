<template>
<div>
  <!-- Modals -->
  <backstory-modal id="backstoryModal" class="modal fade backstory "></backstory-modal>
  <rules-modal id="rulesModal" class="modal fade rules "></rules-modal>
  <credits-modal id="creditsModal" class="modal fade credits"></credits-modal>

  <!-- Side menu using a sidenav -->
  <input type='image'  src='static/miscIcons/burgerIcon.png'
      v-on:click="openMenu" style="width: 36px; height: 36px;">
  <div id="mySidenav" class="sidenav">
    <a class="closebtn menu-item" v-on:click="closeMenu">&times;</a>
    <a class="menu-item" v-if="showNewGame" v-on:click="leaveGame">New Game</a>
    <a class="menu-item" data-toggle="modal" data-target=".backstory">Backstory</a>
    <a class="menu-item" data-toggle="modal" data-target=".rules">Rules</a>
    <a class="menu-item" data-toggle="modal" data-target=".credits">Credits</a>
    <a class="menu-item" href="https://gitreports.com/issue/johnanvik/program-wars"
        target="_blank">Report Issue</a>
  </div>

</div>
</template>


<script>
import BackstoryModal from '@/components/modals/BackstoryModal'
import RulesModal from '@/components/modals/RulesModal'
import CreditsModal from '@/components/modals/CreditsModal'
import {mapActions, mapState, mapMutations} from 'vuex'

/**
 * The main game menu.
 * Contains any modals that the menu has links to.
 */
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
    // Show the backstory on first visit to the landing page
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

.menu-item {
  cursor: pointer;
}

.rules, .credits {
  background-color: #333333;
}
</style>
