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
                <li role="presentation"><a href="#coding" aria-controls="coding" role="tab" data-toggle="tab">Learning to code</a></li>
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
                        <li>You place an instruction card on either the "True" or the "False" playing field.</li>
                        <li>The value of the instruction card is added to the total number of instructions for that playing field.</li>
                        </ol>
                        Instructions can be thought of as the basis of your program overall, as basis for you to build off of.
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
                        Repeat cards are the representation of loops in software. A loop is exactly like a repetition,
                        the block of code in the loop is repeated every time the loop is ran.
                        To find out more about different types of loops you can go to: <a href="https://www.tutorialspoint.com/computer_programming/computer_programming_loops.htm">
                        TutorialsPoint.
                      </a>
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
                        Groups can be thought of as functions.. not mathematical functions but functions as in a blocks of code.
                        A function is a small chunk of code that can be called upon to run the code in the function.
                        To find out more about functions you can go to <a href="https://www.tutorialspoint.com/python/python_functions.htm">
                        TutorialsPoint.
                      </a>
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
                        Variables are something that is defined such as 'var variableOne = 1' where 'var' tells the program
                        to create and name the variable 'variableOne' the value of 1. 'variableOne can be exchanged with any other
                        value, which is why its called a variable.
                        To find out more about variables you can go to: <a href="https://www.tutorialspoint.com/computer_programming/computer_programming_variables.htm">
                          TutorialsPoint.
                        </a>
                      </div>
                    </li>
                    <li><h5>Hack</h5>
                      <div>
                        <img src="../../static/cardImg/H.png" alt="Instruction 1 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                          <li>Hack cards let you attack another player's program.</li>
                          <li>When you play a Hack card, you choose which stack of cards from another player's playing
                            fields will be destroyed. </li>
                          <li>You cannot hack a Group card.</li>
                        </ol>
                        Hacks can sound like an intimidating concept, let's call them bugs. A bug is one or more errors in code that was created by the user.
                        By code into functions (or groups) its easier to figure out what or where the bugs are, which is why groups are protected against hacks.
                        To find out more about bugs you can go to: <a href="https://searchsoftwarequality.techtarget.com/definition/bug">
                        TechTarget.
                      </a>
                      </div>
                    </li>
                  </ul>
                </div>
                <div role="tabpanel" class="tab-pane" id="gamePlay">
                  <h4>Playing the Game</h4>
                  <p>On each of your turns:</p>
                  <ol id="gamePlay">
                    <li>Select a card to either put on your "True" or "False" playing field, or to discard.</li>
                    <li>At the end of all of the player's turns, the game will choose either the "True" or "False" playing field as the "Active" part of each program to run.
                    <li>The game is over if one or more players have an "Active" playing field that totals to at least the game limit:</li>
                    <ul>
                      <li>Short: 15 instructions</li>
                      <li>Medium: 25 instructions</li>
                      <li>Long: 35 instructions</li>
                      </ul>
                  </ol>
                </div>
                <div role="tabpanel" class="tab-pane" id="coding">
                  <h4>Learn Python!</h4>
                  <p>Learning to program can be tough which is why you should start by learning Python.</p>
                  <p>Python is a relatively easy language to learn and it implements all of the concepts that
                  we've displayed here. Later on it can also be expanding to do almost anything, including web development.
                    To start learning Python all you really need is a to download python
                  and maybe a text editor, although it can be done in a text file. Consider downloading the editor
                    <a href="https://www.sublimetext.com">Sublime Text 3</a> and <a href="https://www.python.org/downloads/">
                      Python 3</a>. You can start with tutorials from <a href="https://www.codecademy.com/learn/learn-python">Code Academy</a>
                    Which requires no editors or Python downloaded.
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
