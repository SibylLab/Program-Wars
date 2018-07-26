<template>
  <div>
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Programming Wars Themes</h3>
          <div class="container" style="width: 100%">
            <div class="row">
              <div class="col-sm">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadios" id="classic" value="classic" v-model="themeType" checked>
                  <label class="form-check-label" for="classic">
                    Classic
                  </label>
                </div>
              </div>
              <div class="form-check">
                <input class="form-check-input inline" type="radio" name="exampleRadios" id="dark" value="dark" v-model="themeType" checked>
                <label class="form-check-label" for="dark">
                  Dark&nbsp;&nbsp;
                </label>
            </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="changeTheme()" style="margin: 5px;">Apply</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  /**
   * The Modal for when the Themes button is clicked.
   * It displays and changes the Themes.
   */
  import {mapMutations} from 'vuex'
  export default {
    data () {
      return {
        themeType: undefined
      }
    },
    methods: {
      ...mapMutations([
        'updateTheme'
      ]),
      changeTheme () {
        console.log(this.themeType)
        if (this.themeType === 'classic') {
          this.updateTheme({
            mainBC: 'background-color: #000000',
            playfieldBC: 'background-color: #cccccc',
            mainTC: 'color: #000000; background-colour: #ffffff',
            playfieldTC: 'color: #000000; background-color: #cccccc'
          })
        } else if (this.themeType === 'dark') {
          this.updateTheme({
            mainBC: 'background-color: #000000',
            playfieldBC: 'background-color: #2b394f',
            mainTC: 'color: #ffffff; background-color: #000000',
            playfieldTC: 'color: #ffffff; background-color: #2b394f'
          })
        }
      }
    }
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
