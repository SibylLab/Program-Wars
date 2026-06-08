<template>
  <div style="color: initial;">
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content my-content">
        <div class="modal-header">
          <h3 class="modal-title">
            Credits
          </h3>
        </div>

        <div class="modal-body" style="text-align: center;">
          <p>
            <b>Game concept by</b>
            <br>
            <a href="https://www.ulethbridge.ca/directory/person/john.anvik" target="_blank" rel="noopener">Dr. John Anvik</a>
            & 
            <a href="https://www.jamiur.xyz/" target="_blank" rel="noopener">Md Jamiur Rahman Rifat</a>
          </p>
        </div>

        <div class="modal-footer" style="justify-content: center;">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Modal to display the program credits.
 */
export default {}
</script>

<style scoped>
.my-content {
  position: fixed;
  width: 60%;
  top: 5%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2em;
}

.badge {
  display: inline;
  position: relative;
  left: 2rem;
  width: 8rem;
}

.badge:empty {
  display: inline;
}
</style>
