<template>
<div id="help-page">
  <!-- nav is not a separate component to make it easy to add new pages
       and the links to them. -->
  <div class='side-nav'>
    <h2> Help Pages </h2>
    <br><br>
    <a v-on:click="open('intro')"> Introduction </a>
    <a v-on:click="open('test')"> Test </a>
  </div>

  <div class='help-content'>
    <help-intro v-if="isOpen('intro')"/>
    <vue-markdown v-if="isOpen('test')" :source="helpIntro"/>
  </div>

</div>
</template>

<script>
import Intro from '@/components/help/Intro'
import VueMarkdown from 'vue-markdown'
// import helpIntro from '@/markdown/helpIntro.md'

export default {
  name: 'help-page',
  data () {
    return {
      page: 'intro'
    }
  },
  components: {
    'help-intro': Intro,
    'vue-markdown': VueMarkdown
  },
  computed: {
    helpIntro () {
      return "# Intro\nnew text for the intro"
    }
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
}
</style>
