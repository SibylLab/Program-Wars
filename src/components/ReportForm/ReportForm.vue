<template>
  <div style="background-color: #cccccc; align-items: center">
    <div class="header" style="vertical-align: center; height: 40px; background-color: white;">
      <p style="color: skyblue; font-size: 20px; height: 40px"><b>Programming Wars Issue Reporting</b></p>
    </div>
    <div class="body" style="background-color: #cccccc; height: 800px; width: 1800px; margin: auto;">
      <br>
      <form style="align-items: center">
      <div class="form-group" style="background-color: white; border-radius: 20px">
        <br>
        <input type="text" class="form-control" placeholder="E-mail" style="background-color: white; margin: auto; width: 900px;">
        <br>

        <input type="radio" name="reportType" value="FR">Feature Request
        <input type="radio" name="reportType" value="BR">  Bug Report
        <input type="radio" name="reportType" value="GP">  Gameplay Problem
        <input type="radio" name="reportType" value="Other">  Other
        <br>
        <br>
        <div class="form-group" style="border-color: black; border-radius: 20px; align-items: center">
          <input type="text" placeholder="Title" style="width: 900px">
          <br> <br>
          <textarea name="reportText" id="reportText" rows="8" class="form-control" placeholder="Description" style="max-width: 900px; margin: auto">
  (Remove anything not relevant to the bug report)

  Describe the problem:

  Did you find this in the tutorial or in the main game?

  Screenshots (if applicable):

          </textarea>
        </div>
        <div class="container" style="width: 900px; margin: auto;">
          <div id="HASH" class="row">
            <div id="HASH2" class="col-md-12" style="text-align: right">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".tutorial">Submit Report</button>
              <p style="vertical-align: center; font-size: 18px; margin: auto"><b>OR</b></p>
              <a type="button" class="btn btn-primary" href="https://github.com/johnanvik/program-wars/issues/new/choose" target="_blank">Report on GitHub</a>
            </div>
          </div>
        </div>
        <br>
      </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  #HASH #HASH2{
    display: flex;
    justify-content: space-between;
  }
</style>
