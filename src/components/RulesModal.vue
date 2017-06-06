<template>
  <div>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
            <h3 class="modal-title">Programming Wars Rules</h3>
          </div>
          <div class="modal-body" style="text-align: left">
            <h4>Introduction</h4>
            <p>The basic elements of a program are simple to understand, but can be used to create complex
              computer programs. In this fun, fast-paced game you try to complete a simple program before
              the opponent player or team.</p>

            <h4>Components</h4>
            <p>There are five types of cards:</p>
            <ul>
              <li><h5>Instruction</h5>
              <p>Instruction cards provide the instructions used to create the
                program. There are 24 Instruction cards divided into three types: Instruction-1,
                Instruction-2, and Instruction-3. There are 8 cards of each Instruction type.</p></li>
              <li><h5>Repetition</h5>
                <p>Repetition cards allow you to repeat a set of instructions. There are 13
                  Repetition cards divided into 5 types:Repetition-2, Repetition-3, Repetition-4,
                  and Repetition-5. There are 5 cards of the variable Repetition-X card.</p></li>
              <li><h5>Group</h5>
                <p>A Group card lets you combine two Instruction cards into one card. Group cards
                  give you more points at the end of the game. </p></li>
              <li><h5>Variables</h5>
                <p>Variable cards are used with the variable Repetition (R x ) cards. You use
                  these cards to change the number of times an Instruction or Group card repeats. There
                  16 Variable cards divided into 5 types: Variable-2 (4 cards), Variable-3 (4 cards),
                  Variable-4 (4 cards), Variable-5 (2 card), and Variable-6 (2 cards).</p></li>
              <li><h5>Hack</h5>
                <p>Hacking cards allow you to remove one of an opponent’s Instruction cards
                  and put it in the discard pile. There are 4 Hacking cards.</p></li>
            </ul>

            <h4>Game Play</h4>
            <p>Play starts with the youngest player and continues clockwise.
              On your turn, you do the following:</p>
            <ul>
              <li><p>Draw a card from the draw pile.<br/>
                ○ If there are no more cards in the draw pile, shuffle the discard pile to create a
                new draw pile. <br/>
                ○ If there are no more cards in either the draw or the discard pile, move to the next
                step.</p></li>
              <li>Put a card to the left or right of your Decision card.<br/>
                ○ If you cannot play a card, discard one card from your hand.</li>
              <li>At the end of everyone’s turn, the Boolean coin is flipped and placed back next to
                the deck.<br/>
                ○ If the Boolean coin is “True” (Heads), the cards to the left-side of your Decision
                card are ‘running’ to give your current total.<br/>
                ○ If the Boolean coin is “False” (Tails), the cards to the right-side of your Decision
                card are ‘running’ to give your current total.</li>
            </ul>

              <h4>Card Playing Rules</h4>
              <ul>
                <li><h5>Instruction Cards</h5>
                <ul><li>Instruction cards are placed to either the left or right side of your Decision card.</li>
                </ul></li>
                <li><h5>Repetition Cards</h5>
                <ul><li>Repetition cards are played on either an Instruction card or a Group card.</li>
                <li>A variable Repetition card (R x ) can replace a R 2 , R 3 , R 4 , or R 5 on a player’s turn. The
                  fixed Repetition card is then put in the discard pile.</li>
                  <li>An Instruction card under a Repetition card can be grouped with another Instruction
                    card. The Repetition card then applies to the Group card.</li>
                  <li>A variable Repetition card (R x ) without a variable card has no effect.</li>
                </ul></li>
                <li><h5>Group Cards</h5>
                <ul><li>A Group card replaces two Instruction cards that are on the same side of the
                  Decision card and that add to the number on the Group card. For example, a Group-3
                  card replaces both an Instruction-1 and an Instruction-2 card.</li>
                <li>Group cards cannot be hacked.</li>
                </ul></li>
                <li><h5>Variable Cards</h5>
                <ul><li>Variable cards can only be played on one Repetition-X card.</li>
                <li>Variable cards can be replaced by a Variable card of a higher value. The replaced card
                  is put in the discard pile. For example, a Variable-2 card can be replaced by a Variable-3
                  card, and the Variable-2 is placed in the discard pile.</li>
                </ul></li>
              </ul>
            </ul>
            <h4>End of Game</h4>
            <p>The game ends when the Boolean coin is flipped and you or your team’s ‘running’ program
              totals 35 or more instructions.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
  $('#rulesModal').modal('hide');
</script>

<style scoped>
  h5 {
    font-weight: bold;
  }

  h4 {
    font-weight: bold;
  }

</style>
