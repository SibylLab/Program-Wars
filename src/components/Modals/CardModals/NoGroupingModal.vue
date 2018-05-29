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
                <h4>Grouping unsuccesssful</h4>
                <p style="font-size: 16px">
                  Unfortuntely, you don't have any stacks that can be grouped with this card.
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
  import { bus } from '../../SharedComponents/Bus.vue'
  export default {
  }
</script>
