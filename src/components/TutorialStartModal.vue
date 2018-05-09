<template>
  <div>
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Programming Wars Objectives</h3>
          <div>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="introduction">
                <h4>Introduction</h4>
                <p style="font-size: 16px">Thanks for playing the tutorial. Each card in your hand is a representation of a programming fundamental.
                  You can choose which of the branches, true and false, to build up in each turn. At the end of each turn a
                  coin will be flipped to choose which branch will be executed. If you have at least at much instructions as the
                  score limit in the path that is chosen then you will win.
                </p>
                <br>
                <h4>Building Instructions</h4>
                <p style="font-size: 16px">
                  Instructions are the building blocks of your programs on either path. They will be the first card that
                  you play to start off your path.
                  You will then build on top of these functions with repeats, groups, and variables.
                  To shut down an opponents block of code you can hack it with a hack card.
                </p>
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

  import { bus } from './Bus.vue'

  export default {
  }

</script>


