<template>
<div id="requirements">
  <page-header/>

  <h4 class="title centered">Phase 1: Requirements</h4>

  <div id="req-content" class="centered">
    <h4 id="phase-info" class="centered">
      <div class="name">{{ pageState.currentPlayer().name.toUpperCase() }}</div>
      Requirments and Goals for each sprints 
    </h4>

    <div id="req-cards" class="centered">
      <req-list :reqs="pageState.reqNames()"/>
    </div>

    <div id="req-info" class="centered">
      <req-details/>
    </div>

    <div id="buttons" class="centered">
      <button class="btn btn-success my-btn" v-on:click="premade()">
        Use Pre-built Deck </button>
       <!--  
      <button class="btn btn-primary my-btn" v-on:click="next()">
        Customize Deck </button>
      -->
    </div>
  </div>

</div>
</template>

<script>
import PageHeader from '@/components/shared/PageHeader'
import ReqList from '@/components/setup/ReqList'
import ReqDetails from '@/components/setup/ReqDetails.vue'
import { mapActions } from 'vuex'

export default {
  name: 'requirements',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'page-header': PageHeader,
    'req-list': ReqList,
    'req-details': ReqDetails
  },
  methods: {
    ...mapActions([
      'startDeckSetup'
    ]),
    premade () {
      this.pageState.choosePrebuilt()
      this.next()
    },
    next () {
      if (this.pageState.nextPlayer() === undefined) {
        this.startDeckSetup({players: this.pageState.playerListForDeckBuilding()})
      }
    }
  }
}
</script>

<style scoped>
#requirements {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1350px;
  min-height: 760px;
  background-image: linear-gradient(to bottom right, purple, darkblue);
}

#req-content {
  position: absolute;
  top: 60px;
  width: 90%;
  height: 89%;
  border-radius: 20px;
  background-color: white;
}

#phase-info {
  position: absolute;
  top: 0px;
  color: black;
}

#req-cards {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 40%;
}

#req-info {
  position: absolute;
  top: 47%;
  width: 100%;
  height: 45%;
  color: black;
  font-size: 20px;
}

#buttons {
  position: absolute;
  bottom: 0px;
}

.name {
  display: inline;
  color: red;
  margin-right: 15px;
}

.title {
  position: absolute;
  width: 50%;
  z-index: 20;
  color: white;
}

.centered {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.my-btn {
  display: inline;
  margin: 10px;
}

h4 {
  margin: 0;
  margin-top: 10px;
}
</style>

