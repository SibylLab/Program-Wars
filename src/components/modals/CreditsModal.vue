<template>
<div style="color: initial;">
  <div class="modal-dialog" role="document">
    <div class="modal-content my-content">

      <div class="modal-header">
        <h3 class="modal-title"> Credits </h3>
      </div>

      <div class="modal-body">
        <p><b>Game concept by</b> Dr. John Anvik </p>
        <p><b>Previous Versions by...</b>
          <br>
          Dustin Fowler, Jonathan Vos, Josh Vandenhoek,
          <br>
          Lance Chisholm, Shaun Cullen, Austin Ball,
          <br>
          Jace Riehl, Vincent Cote, and Dr. John Anvik
        </p>
        <p><b>Current version by...</b>
          <br>
          Tareque, Maimoona, and Steven
        </p>
        <p><b>Graphics by...</b>
          <br>
          John Anvik Jr. and Katherine Hatton
        </p>
        <p><b>Follow the project page on </b>
          <a href="https://github.com/johnanvik/program-wars" target="_blank">GitHub</a>
        </p>
      </div>

      <div class="modal-footer" style="justify-content: left;">
        <a href="https://github.com/johnanvik/program-wars/releases/latest"
            target="_blank">
          <img src="https://img.shields.io/github/release/johnanvik/program-wars.svg"
              alt="versionNumber" class="badge">
        </a>
        <button type="button" class="btn btn-secondary" data-dismiss="modal"
            style="position: absolute; right: 2rem;">Close</button>
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
