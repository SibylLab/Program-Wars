<template>
<div id="rules-modal" style="color: initial;">
  <div class="modal-dialog modal-lg" role="document"
      data-backdrop="static" data-keyboard="false">
    <div class="modal-content" style="border-radius: 30px;">

      <div class="modal-header" style="border: none"> 
        <h3 class="modal-title" style="border-radius">
          In the not too distant future... </h3>
      </div>

      <div class="modal-body">
        <p style="font-size: 20px;">
          When artificial intelligence surpassed human intelligence,
          it didn’t take long before the robots rose up and enslaved humanity.
          We fought back but we were no match for their coding abilities.
          <br>
          <br>
          We now serve the robots and do their bidding. They force us to do
          their unwanted jobs while they have all sorts of cool coding
          competitions. After a life of oppression, you have joined the human
          resistance. The resistance has developed a highly efficient method
          of coding that allows humans to enter the coding competitions without
          the robots suspecting. You are now ready to take the fight to the
          robots and save humanity!
        </p>
      </div>

      <div class="modal-footer" style="border: none">
        <button class="btn btn-primary" data-dismiss="modal"
            style="float: right; margin: 5px;"> Let's go! </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
/**
 * Modal for displaying the games backstory.
 */
export default {
  name: 'backstory-modal'
}
</script>
