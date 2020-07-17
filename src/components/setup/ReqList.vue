<template>
<div id="req-list">

  <img v-for="req in reqs" v-bind:key="req"
    :src="reqImage(req)" v-on:click="select(req)"
    :class="['card', {active: activeReq(req)}]">

</div>
</template>

<script>
export default {
  name: 'req-list',
  props: ['reqs'],
  data () {
    return {
      pageState: this.$store.state.pageState,
      update: true
    }
  },
  methods: {
    reqImage (req) {
      return 'static/cardImages/requirements/' + req + '.png'
    },
    activeReq (req) {
      return this.pageState.req === req
    },
    select (req) {
      this.pageState.req = req
    }
  }
}
</script>

<style scoped>
#req-list {
  position: relative;
  width: 100%;
  height: 100%;
}

.card {
  display: inline;
  top: 10%;
  height: 80%;
  width: auto;
  margin: 0 10px;
}

.active {
  -webkit-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  box-shadow: 0 0 24px 15px rgba(0,255,0,1);
}
</style>

