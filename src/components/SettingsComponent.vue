<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  </div>
</template>

<script>


export default {
  name: 'settings-component',
  data () {
    return {
      msg: 'Settings Page Again',
      idCounter:0
    }
  },
  methods: {
  },
  computed: {
    currentPlayerId() {
      return this.$store.getters.getCurrentPlayerId;
    }
  },
  components: {

  },
  created: function () {

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
