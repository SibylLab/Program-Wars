<template>
<div id="help-page">

  <div class='side-nav'>
    <h2> Help Pages </h2>
    <br><br>

    <!-- For your page to be viewable add a link like these. Just replace the
         string in open() with a simple name for your page. -->
    <a v-on:click="open('intro')"> Introduction </a>
    <a v-on:click="open('play')"> Card Types</a>
    <a v-on:click="open('game')"> Gameplay</a>
  </div>

  <div class='help-content'>
    <!-- These create components using the markdown in your markdown file
         for the page. Save the imported page into a data member and use it
         as the source. The text in isOpen() should be the name you used with
         your link in the nav list. -->
    <vue-markdown v-if="isOpen('intro')" :source="intro"/>
    <vue-markdown v-if="isOpen('play')" :source="play"/>
    <vue-markdown v-if="isOpen('game')" :source="game"/>
  </div>

</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

// Loading your markdown file requires the 'raw-loader!' prefix to load the
// markdown as a string. Save the import into a data member so you can access it
// in the component.
import helpIntro from 'raw-loader!@/markdown/helpIntro.md'
import howToPlay from 'raw-loader!@/markdown/howToPlay.md'
import gameplay from  'raw-loader!@/markdown/gameplay.md'

export default {
  name: 'help-page',
  data () {
    return {
      page: 'intro',
      // Add your markdown page text to a member here
      intro: helpIntro,
      play: howToPlay,
      game: gameplay
    }
  },
  components: {
    'vue-markdown': VueMarkdown
  },
  methods: {
    open (page) {
      this.page = page
    },
    isOpen (page) {
      return this.page === page
    }
  }
}
</script>

<style scoped>
#help-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  height: 100vh;
  padding: 1rem;
  color: white;
  background-color: #333333;
}

.side-nav a {
  display: block;
  font-size: 1.5rem;
}

.side-nav a:hover {
  color: #0077FF;
  cursor: pointer;
}

.help-content {
  position: absolute;
  top: 0;
  left: 20%;
  width: 80%;
  text-align: left;
  padding: 1rem 3rem;
}
</style>
