<template>
  <div>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
            <h3 class="modal-title">Programming Wars Rules</h3>
            <div>
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#introduction" aria-controls="introduction" role="tab" data-toggle="tab">Introduction</a></li>
                <li role="presentation"><a href="#cardType" aria-controls="cardType" role="tab" data-toggle="tab">Card Type</a></li>
                <li role="presentation"><a href="#gamePlay" aria-controls="gamePlay" role="tab" data-toggle="tab">Game Play</a></li>
                <li role="presentation"><a href="#cardPlayingRules" aria-controls="cardPlayingRule" role="tab" data-toggle="tab">Card Playing Rules</a></li>
                <li role="presentation"><a href="#endOfGame" aria-controls="endOfGame" role="tab" data-toggle="tab">End of Game</a></li>

              </ul>

              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="introduction">
                  <h4>Introduction</h4>
                  <p>The basic elements of a program are simple to understand, but can be used to create complex
                    computer programs. In this fun, fast-paced game you try to complete a simple program before
                    the opponent player.</p>
                </div>
                <div role="tabpanel" class="tab-pane" id="cardType">
                  <h4>Card Types</h4>
                  <p>There are five types of cards:</p>
                  <ul>
                    <li><h5>Instruction</h5>
                      <p>Instruction cards provide the instructions used to create the
                        program. The instruction card is always placed on an empty stack, the
                        cards value will be added to your total on the boolean side of its stack.</p></li>
                    <li><h5>Repetition</h5>
                      <p>Repetition cards allow you to repeat an instructions. This will multiply
                        the value of the repetition card and the instruction card (ex. there is an
                        I-2 card on the stack, you add an R-3 card, your score for that stack is now 6).
                        There are also variable Repetition cards (R-x), they allow to choose the value
                        by adding a Variable card to it. Repetition cards may be played on Instruction
                        cards or a stack who has been grouped.</p></li>
                    <li><h5>Group</h5>
                      <p>A Group card lets you combine the cards of one or more stacks.To group
                        the cards, the combined value of the stacks must equal the value of
                        the Group card. A grouped stack cannot be hacked.</p></li>
                    <li><h5>Variables</h5>
                      <p>Variable cards are used with the variable Repetition (R-x) cards. You use
                        these cards to change the number of times an Instruction or Group card repeats.</p></li>
                    <li><h5>Hack</h5>
                      <p>Hacking cards allow you to remove one of an opponent’s stack, the
                        Hack card cannot be used on a grouped stack.</p></li>
                  </ul>
                </div>
                <div role="tabpanel" class="tab-pane" id="gamePlay">
                  <h4>Game Play</h4>
                  <p>On your turn, you do the following:</p>
                  <ul>
                    <li>Draw a card from the draw pile.<br/>
                      ○ If there are no more cards in the draw pile, the discarded pile is shuffled and reused.</li>
                    <li>Add a card to either the "True" or "False" side.<br/>
                      ○ If you cannot play a card, discard a card from your hand.</li>
                    <li>At the end of everyone’s turn, the Boolean coin is flipped to determine the active side.<br/>
                      ○ If the Boolean coin is “True”, the stacks on the "True" side
                      are ‘running’ to give your current total.<br/>
                      ○ If the Boolean coin is “False”, the stacks on the "False" side
                      are ‘running’ to give your current total.</li>
                  </ul>
                </div>
                <div role="tabpanel" class="tab-pane" id="cardPlayingRules">
                  <h4>Card Playing Rules</h4>
                  <ul>
                    <li><h5>Instruction Cards</h5>
                      <ul><li>Instruction cards are placed to either "True" or "False" side.</li>
                      </ul></li>
                    <li><h5>Repetition Cards</h5>
                      <ul><li>Repetition cards are played on either an Instruction card or a Group card.</li>
                        <li>A variable Repetition card (R-x) without a variable card counts as an R-1.</li>
                      </ul></li>
                    <li><h5>Group Cards</h5>
                      <ul><li>A Group card combines one or more stack(s) turning it into a single group card on a single stack</li>
                        <li>Group cards cannot be hacked.</li>
                      </ul></li>
                    <li><h5>Variable Cards</h5>
                      <ul><li>Variable cards can only be played on one Repetition-X card.</li>
                        <li>Variable cards can be replaced by a Variable card of a higher value. The replaced card
                          is put in the discard pile. For example, a V-2 card can be replaced by a V-3
                          card.</li>
                      </ul></li>
                  </ul>
                </div>
                <div role="tabpanel" class="tab-pane" id="endOfGame">
                  <h4>End of Game</h4>
                  <p>The game ends when the Boolean coin is flipped and your ‘running’ program
                    totals the set score limit or more instructions.</p>
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

  }

</script>

<style scoped>
  h5 {
    font-weight: bold;
  }

  h4 {
    font-weight: bold;
  }

  .tab-pane {
    text-align: left;
  }

</style>
