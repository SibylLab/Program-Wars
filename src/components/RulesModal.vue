<template>
  <div>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-radius: 30px">
          <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
            <h3 class="modal-title">Programming Wars Rules</h3>
            <div>
              <ul class="nav nav-tabs" role="tablist" style="font-size: 22px">
                <li role="presentation" class="active"><a href="#introduction" aria-controls="introduction" role="tab" data-toggle="tab">Introduction</a></li>
                <li role="presentation"><a href="#cardType" aria-controls="cardType" role="tab" data-toggle="tab">Card Types</a></li>
                <li role="presentation"><a href="#gamePlay" aria-controls="gamePlay" role="tab" data-toggle="tab">Playing the Game</a></li>
              </ul>

              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="introduction">
                  <h4>Introduction</h4>
                  <p>In this fun, fast-paced educational card game <b>you try to complete a program before your opponents can complete their program</b>.
                  <p>To build your program you will be using the basic building blocks of any program: instructions, repeats, decisions, and groups of instructions.</p>
                </div>
                <div role="tabpanel" class="tab-pane" id="cardType">
                  <h4>Card Types</h4>
                  <p>To build your program you use five types of cards:</p>
                  <ul>
                    <li><h5>Instruction</h5>
                      <div>
                        <img src="../../static/cardImg/I1.png" alt="Instruction 1 Card" class="cardImage">
                        <img src="../../static/cardImg/I2.png" alt="Instruction 2 Card" class="cardImage">
                        <img src="../../static/cardImg/I3.png" alt="Instruction 3 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                        <li>Instruction cards are the basic way by which you build your program.</li>
                        <li>You place an instruction card in the chosen path to begin a stack.</li>
                        <li>The value of the instruction card is added to the total number of instructions for that playing field.</li>
                        </ol>
                      </div>
                    </li>

                    <li><h5>Repetition</h5>
                     <div>
                        <img src="../../static/cardImg/R2.png" alt="Repetition 2 Card" class="cardImage">
                        <img src="../../static/cardImg/R3.png" alt="Repetition 3 Card" class="cardImage">
                        <img src="../../static/cardImg/R4.png" alt="Repetition 4 Card" class="cardImage">
                        <img src="../../static/cardImg/R5.png" alt="Repetition 5 Card" class="cardImage">
                      </div>

                      <div>
                      <ol>
                      <li>Repetition cards allow you to repeat an instruction or group card.</li>
                      <li>You add a repetition card on top of an instruction card or a group card.</li>
                      <li>The value of the instruction or group card is then multiplied by the value of the repetition card.</li>
                      <li>You can replace a repetition card with another repetition card.</li>
                      <li>You cannot repeat a repetition card (at least not yet).</li>
                      </ol>
                      </div>
                    </li>
                    <li><h5>Group</h5>
                      <div>
                        <img src="../../static/cardImg/G2.png" alt="Group 2 Card" class="cardImage">
                        <img src="../../static/cardImg/G3.png" alt="Group 2 Card" class="cardImage">
                        <img src="../../static/cardImg/G4.png" alt="Group 2 Card" class="cardImage">
                        <img src="../../static/cardImg/G5.png" alt="Group 2 Card" class="cardImage">
                        <img src="../../static/cardImg/G6.png" alt="Group 2 Card" class="cardImage">
                      </div>

                      <div>
                      <ol>
                        <li>Group cards let you combine stacks of instructions and group cards into one card.</li>
                        <li>The combined total of the instructions must be the same as the value of the group card.
                        <li>Group cards protect your instructions from Hack cards.</li>
                      </ol>
                      </div>
                    </li>
                    <li><h5>Variables</h5>
                      <div>
                        <img src="../../static/cardImg/Rx.png" alt="Variable Repetition Card" class="cardImage">
                        <img src="../../static/cardImg/V2.png" alt="Variable 2 Card" class="cardImage">
                        <img src="../../static/cardImg/V3.png" alt="Variable 3 Card" class="cardImage">
                        <img src="../../static/cardImg/V4.png" alt="Variable 4 Card" class="cardImage">
                        <img src="../../static/cardImg/V5.png" alt="Variable 5 Card" class="cardImage">
                        <img src="../../static/cardImg/V6.png" alt="Variable 6 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                          <li>Variable cards are played on top of a Variable Repetition card.</li>
                          <li>A variable card lets you change the number of times an instruction or group card is repeated.
                          <li>You can replace one variable card with another variable card.</li>
                          <li>A Variable Repetition card without a Variable card has no effect.</li>
                        </ol>
                      </div>
                    </li>
                    <li><h5>Hack</h5>
                      <div>
                        <img src="../../static/cardImg/H.png" alt="Instruction 1 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                          <li>Hack cards let you attack another player's program.</li>
                          <li>When you play a Hack card, you choose which stack of cards from another player's playing fields will be destroyed.
                          <li>You cannot hack a Group card.</li>
                        </ol>
                      </div>
                    </li>
                  </ul>
                </div>
                <div role="tabpanel" class="tab-pane" id="gamePlay">
                  <h4>Playing the Game</h4>
                  <p>On each of your turns:</p>
                  <ol id="gamePlay">
                    <li>Select a card to put in the "True" or "False" playing field that was chosen at the beginning of the round, or to discard.</li>
                    <li>At the beginning of all of the player's turns, the game will choose either the "True" or "False" playing field as the "Active" part of each program to run.
                    <li>The game is over if a player reaches the score limit in either paths:</li>
                    <ul>
                      <li>Short: 15 instructions</li>
                      <li>Medium: 25 instructions</li>
                      <li>Long: 35 instructions</li>
                      </ul>
                  </ol>
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

  p {
    font-size: medium;
  }

  .tab-pane {
    text-align: left;
  }

  #gamePlay, #cardPlaying {
    font-size: medium;
  }

</style>
