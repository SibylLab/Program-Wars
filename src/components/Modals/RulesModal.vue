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
                <li role="presentation"><a href="#coding" aria-controls="coding" role="tab" data-toggle="tab">Learning Computer Programming</a></li>
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
                        <img src="../../../static/cardImg/I1.png" alt="Instruction 1 Card" class="cardImage">
                        <img src="../../../static/cardImg/I2.png" alt="Instruction 2 Card" class="cardImage">
                        <img src="../../../static/cardImg/I3.png" alt="Instruction 3 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                        <li>Instruction cards are the basic way by which you build your program.</li>
                        <li>You place an instruction card in the chosen path to begin a stack.</li>
                        <li>The value of the instruction card is added to the total number of instructions for that playing field.</li>
                        </ol>
                        <b>Relation to computer programming:</b>
                        A computer program is a collection of instructions that tell the computer what to do.
                      </div>
                    </li>

                    <li><h5>Repetition</h5>
                     <div>
                        <img src="../../../static/cardImg/R2.png" alt="Repetition 2 Card" class="cardImage">
                        <img src="../../../static/cardImg/R3.png" alt="Repetition 3 Card" class="cardImage">
                        <img src="../../../static/cardImg/R4.png" alt="Repetition 4 Card" class="cardImage">
                        <img src="../../../static/cardImg/R5.png" alt="Repetition 5 Card" class="cardImage">
                      </div>

                      <div>
                      <ol>
                      <li>Repetition cards allow you to repeat an instruction or group card.</li>
                      <li>You add a repetition card on top of an instruction card or a group card.</li>
                      <li>The value of the instruction or group card is then multiplied by the value of the repetition card.</li>
                      <li>You can replace a repetition card with another repetition card.</li>
                      <li>You cannot repeat a repetition card (at least not yet).</li>
                      </ol>
                      <b>Relation to computer programming:</b>
                        Repetition cards represent special computer instructions called <i>loops</i>. Like a repetition card,
                        a loop repeats one or more instructions.
                        <br>To understand the different types of loops in a computer program you can go <a href="https://www.tutorialspoint.com/computer_programming/computer_programming_loops.htm">
                        here.</a>
                      </div>
                    </li>
                    <li><h5>Group</h5>
                      <div>
                        <img src="../../../static/cardImg/G2.png" alt="Group 2 Card" class="cardImage">
                        <img src="../../../static/cardImg/G3.png" alt="Group 2 Card" class="cardImage">
                        <img src="../../../static/cardImg/G4.png" alt="Group 2 Card" class="cardImage">
                        <img src="../../../static/cardImg/G5.png" alt="Group 2 Card" class="cardImage">
                        <img src="../../../static/cardImg/G6.png" alt="Group 2 Card" class="cardImage">
                      </div>

                      <div>
                      <ol>
                        <li>Group cards let you combine stacks of instructions and group cards into one card.</li>
                        <li>The combined total of the stacks must be the same as the value of the group card.
                        <li>Group cards protect your instructions from Hack cards.</li>
                      </ol>
                       <b>Relation to computer programming:</b>
                        Computer programs are commonly broken up into <i>functions</i>, <i>methods</i> or <i>procedures</i>. All of these names
                        mean the same thing - a group of instructions. These groups of instructions are given names so they can be called upon to
                        run whenever needed.
                        <br>To find out more about these groups of instructions, you can go <a href="https://www.tutorialspoint.com/python/python_functions.htm">
                        here.</a>
                      </div>
                    </li>
                    <li><h5>Variables</h5>
                      <div>
                        <img src="../../../static/cardImg/Rx.png" alt="Variable Repetition Card" class="cardImage">
                        <img src="../../../static/cardImg/V2.png" alt="Variable 2 Card" class="cardImage">
                        <img src="../../../static/cardImg/V3.png" alt="Variable 3 Card" class="cardImage">
                        <img src="../../../static/cardImg/V4.png" alt="Variable 4 Card" class="cardImage">
                        <img src="../../../static/cardImg/V5.png" alt="Variable 5 Card" class="cardImage">
                        <img src="../../../static/cardImg/V6.png" alt="Variable 6 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                          <li>Variable cards are played on top of a Variable Repetition card.</li>
                          <li>A variable card lets you change the number of times an instruction or group card is repeated.
                          <li>You can replace one variable card with another variable card.</li>
                          <li>A Variable Repetition card without a Variable card has no effect.</li>
                        </ol>
                        <b>Relation to computer programming:</b>
                        A variable in a computer program is a piece of computer memory that holds a value. Variables are given names so the computer program
                        can either get the value or change the value at the memory location.
                        You can think of a variable as a small box with a label on it,
                        and the computer program can change what is in the box at anytime.
                        <br>To find out more about variables you can go to: <a href="https://www.tutorialspoint.com/computer_programming/computer_programming_variables.htm">
                          here.</a>
                      </div>
                    </li>
                    <li><h5>Hack</h5>
                      <div>
                        <img src="../../../static/cardImg/H.png" alt="Instruction 1 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                          <li>Hack cards let you attack another player's program.</li>
                          <li>When you play a Hack card, you choose which stack of cards from another player's playing
                            fields will be destroyed. </li>
                          <li>You cannot hack a Group card or someone with a Firewall card active.</li>
                        </ol>
                        <b>Relation to computer programming:</b>
                        Sometimes a mean or mischievous computer programmer. Known as a <i>hacker</i> will change a computer program
                        to do something it is not supposed to do. Using functions can make it harder for a hacker to change the computer program,
                        which is why Group cards counter Hack cards in the game.

                      </div>
                    </li>
                    <li><h5>Virus</h5>
                      <div>
                        <img src="../../../static/cardImg/Virus.png" alt="Instruction 1 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                          <li>Virus cards let you infect another player's program, cutting their score in half.</li>
                          <li>When you play a Virus card, you choose which player will be infected. </li>
                          <li>You cannot infect someone with a AntiVirus card active.</li>
                        </ol>
                        <b>Relation to computer programming:</b>
                        Sometimes a mean or mischievous computer programmer. Known as a <i>hacker</i> will send you a computer program called a <i>virus</i>
                        to have your computer do something it shouldn't, making your computer slower.
                        Overclocking your computer increases the rate at which it runs programs, which is why Overclocking cards counter Virus cards in the game.
                      </div>
                    </li>
                    <li><h5>Power Outage</h5>
                      <div>
                        <img src="../../../static/cardImg/PowerOutage.png" alt="Instruction 1 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                          <li>Power Outage cards let you stop another player from playing instruction cards.</li>
                          <li>When you play a Power Outage card, you choose which player will be impacted. </li>
                          <li>You cannot give a power outage to someone with a generator card active.</li>
                        </ol>
                        <b>Relation to computer programming:</b>
                        Sometimes when the weather is bad you can have a power outage. This makes it so that you can't create programs.
                        A backup battery or a generator can resolve this and allow you to continue programming, which is why the battery
                        backup and generator cards reverse this program.
                      </div>
                    </li>
                    <li><h5>Battery Backup</h5>
                      <div>
                        <img src="../../../static/cardImg/BatteryBackup.png" alt="Instruction 1 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                          <li>Battery Backup cards reverse the effects of Power Outage cards.</li>
                        </ol>
                        <b>Relation to computer programming:</b>
                        Sometimes when the weather is bad you can have a power outage. This makes it so that you can't create programs.
                        A backup battery or a generator can resolve this and allow you to continue programming, which is why the battery
                        backup and generator cards reverse this program.
                      </div>
                    </li>
                    <li><h5>Overclocking</h5>
                      <div>
                        <img src="../../../static/cardImg/OverClock.png" alt="Instruction 1 Card" class="cardImage">
                      </div>

                      <div>
                        <ol>
                          <li>Overclocking cards allow you to double your current score.</li>
                        </ol>
                        <b>Relation to computer programming:</b>
                        When you overclock your computer your computer runs faster, allowing your programs to run much quicker.
                      </div>
                    </li>
                  </ul>

                  <li><h5>Generator</h5>
                    <div>
                      <img src="../../../static/cardImg/Generator.png" alt="Instruction 1 Card" class="cardImage">
                    </div>
                    <div>
                      <ol>
                        <li>Generator cards protect you from all Power Outage cards.</li>
                      </ol>
                      <b>Relation to computer programming:</b>
                      Like the battery backup, generators allow you to continue programming when you lose power.
                    </div>
                  </li>

                  <li><h5>AntiVirus</h5>
                    <div>
                      <img src="../../../static/cardImg/AntiVirus.png" alt="Instruction 1 Card" class="cardImage">
                    </div>
                    <div>
                      <ol>
                        <li>AntiVirus cards protect you from all viruses.</li>
                      </ol>
                      <b>Relation to computer programming:</b>
                      AntiViruses in general, protect you from viruses, making sure that your programs will run quickly.
                    </div>
                  </li>

                  <li><h5>Firewall</h5>
                    <div>
                      <img src="../../../static/cardImg/Virus.png" alt="Instruction 1 Card" class="cardImage">
                    </div>

                    <div>
                      <ol>
                        <li>Firewall cards protect you from all hack cards.</li>
                      </ol>
                      <b>Relation to computer programming:</b>
                      Firewalls monitor and restrict what is coming into your local network. This will help protect you
                      from hackers. 
                    </div>
                  </li>

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
                <div role="tabpanel" class="tab-pane" id="coding">
                  <h4>Learning Computer Programming</h4>
                  <p>Learning computer program can be tough for some people.
                  Some programming languages are easier to learn than others. </p>
                  <p>Python is one of the easier-to-learn programming language and it uses all of the ideas from Programming Wars.
                  A good place to start is with this <a href="http://interactivepython.org/runestone/static/IntroPythonTurtles/index.html">interactive Python tutorial.</a>
                  <p>There are also many other Python tutorials available, such as this ones from <a href="https://www.codecademy.com/learn/learn-python">Code Academy.</a>
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
