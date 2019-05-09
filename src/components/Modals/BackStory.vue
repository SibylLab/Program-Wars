<template>
    <div>
        <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
            <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header" style="border: none"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="overclockCanceled">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title"> Welcome to Program Wars </h3>
        </div>
        <div class="modal-body">
          <div class="container col-lg-12">
            <div class="row">
              <p style="font-size: 24px"> When artificial intelligence surpassed human intelligence, it didn’t take long before the robots
              rose up and enslaved humanity. We fought back but we were no match for their codin 
              abilities. We now serve the robots and do their bidding. They force us to do their unwanted jobs while
              they have all sorts of cool coding competitions. After a life of oppression, you have joined the
              human resistance. The resistance has developed a highly efficient method of coding that allows
              humans to enter the coding competitions without the robots suspecting. You are now ready to
              take the fight to the robots and save humanity! </p>
            </div>
          </div>
        </div>
        <div class="modal-footer" style="border: none">
          <button class="btn btn-default" @click="continue" data-dismiss="modal" style="float: right; margin: 5px;" :style="hideButton"> Let's go! </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../SharedComponents/Bus.vue'
  // import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    data () {
      return {
        showPanel: false
      }
    },
    methods: {
      continue () {
        bus.$emit('close')
      }
    }
  }
</script>

<style scoped>
    .stacks {
        widows: 120px;
        border: 1px solid black;
    }
</style>
