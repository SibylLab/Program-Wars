<template>
<div>
  <!-- Modals -->
  <backstory-modal id="backstoryModal" class="modal backstory "/>
  <rules-modal id="rulesModal" class="modal rules "/>
  <credits-modal id="creditsModal" class="modal credits"/>

  <!-- Side menu using a sidenav -->
  <input type='image'  src='static/miscIcons/burgerIcon.png'
      v-on:click="openMenu()" style="width: 100%; height: 100%;">
  <div id="mySidenav" class="sidenav">
    <a class="closebtn menu-item" v-on:click="closeMenu()"> &times; </a>
    <a class="menu-item" v-if="inGame" v-on:click="leaveGame()"> New Game </a>
    <a class="menu-item" data-toggle="modal" data-target=".backstory"> Backstory </a>
    <a class="menu-item" data-toggle="modal" data-target=".rules"> Rules </a>
    <a class="menu-item" data-toggle="modal" data-target=".credits"> Credits </a>
    <a class="menu-item" href="https://gitreports.com/issue/SibylLab/Program-Wars"
        target="_blank"> Report Issue </a>
  </div>

</div>
</template>


<script>
import BackstoryModal from '@/components/modals/BackstoryModal'
import RulesModal from '@/components/modals/RulesModal'
import CreditsModal from '@/components/modals/CreditsModal'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

/**
 * Displays the main game menu.
 *
 * The menu is hidden until the icon is clicked and will 'slide' out from the
 * right side of the screen. It then has a button to hide it again. Any positioning
 * done to the component when it is used will position the button and not the
 * sliding menu.
 *
 * Contains links to the Backstory, the Rules, the Credits, and Reporting an Issue.
 * It also will contain a link to create a new game when the menu is opened during
 * a game. This link takes the player back to the home screen to setup the new game.
 */
export default {
  name: 'side-menu',
  components: {
    'backstory-modal': BackstoryModal,
    'rules-modal': RulesModal,
    'credits-modal': CreditsModal
  },
  computed: {
    ...mapState(['showBackstory']),
    ...mapGetters(['inGame'])
  },
  methods: {
    ...mapMutations(['seenBackstory']),
    ...mapActions(['leaveGame']),
    /**
     * Opens the side menu.
     */
    openMenu () {
      this.showMenu = true
      $('.sidenav').width('20rem')
    },
    /**
     * Closes the side menu.
     */
    closeMenu () {
      this.showMenu = false
      $('.sidenav').width('0')
    }
  },
  mounted () {
    // Show the backstory on first visit to the game
    if (this.showBackstory) {
      $('#backstoryModal').modal('show')
      this.seenBackstory()
    } else {
      // prevent fade from blocking everything when backstory is not supposed to show
      $('.modal-backdrop').remove()
    }
  }
}
</script>


<style scoped>
.sidenav {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 0;
  overflow-x: hidden;
  padding-top: 4%;
  background-color: #111;
  transition: 0.5s;
  z-index: 500;
}

.sidenav a {
  font-size: 2rem;
  text-decoration: none;
  color: #fff;
  display: block;
}

.sidenav a:hover {
  color: #0077ff;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 5%;
  font-size: 2.5rem;
}

.menu-item {
  cursor: pointer;
}

.rules, .credits {
  background-color: #333333;
}
</style>
