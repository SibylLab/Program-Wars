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
                <p style="font-size: 16px">Thanks for playing the tutorial! In Programming Wars you pretend to create a computer program using cards.
                Each part of Programming Wars represents a real part of a computer program.
                <p>Your computer program has two parts: a "True" side and a "False" side (called <i>branches</i> in a computer program). This represents making a decision in a computer program.
                You choose which of the two sides, True or False, to build your computer program in each turn. At the end of each turn, the computer will
                randomly choose which of the two sides will be run. Your goal is to have the computer run a program that has the target number (or more) of instructions.
                </p>
                <br>
                <h4>Playing the Game</h4>
                <p>
                  The Instruction card is the basic building block for your program, and is the first card that
                  you play to start building your program.
                  You will then continue to build your program by using Repetition cards to make Instruction cards repeat,
                  using Variable cards to change the number of times the Instructions repeat,
                  protecting your Instructions with Group cards, and
                  attacking an opponent's Instructions using a Hack card.
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

  import { bus } from '../SharedComponents/Bus.vue'

  export default {
  }

</script>


