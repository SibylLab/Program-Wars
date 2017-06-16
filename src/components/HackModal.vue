<template>
  <div>
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Programming Wars Rules</h3>
        </div>
        <div class="modal-body">
          <div class="container">
            <ul class="nav nav-tabs">
              <!--<li class="active"><a data-toggle="tab" href="#home">Home</a></li>-->
              <li v-for="player in playerList" :class="isActive"><a data-toggle="tab" :href="'#' + player.name">{{ player.name }}</a></li>
            </ul>

            <div class="tab-content" style="text-align: left">
              <!--<div id="home" class="tab-pane fade in active">-->
              <!--</div>-->

              <div v-for="player in playerList" :id="player.name" class="tab-pane fade">
                <h1>{{ player.name }}</h1>
              </div>

            </div>
          </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        playerList: []
      }
    },
    created() {
      this.playerList = this.$store.getters.getPlayers;
    },
    computed: {
      isActive() {
        for(let player of this.playerList){
          if(player.id === 0) {
            console.log(player.id)
            return '';
          } else {
            return '';
          }
        }
      }
    }
//    computed: {
//      getPlayerList() {
//        this.playerList = this.$store.getters.getPlayers;
//      }
//    }
  }

</script>

<style scoped>

</style>
