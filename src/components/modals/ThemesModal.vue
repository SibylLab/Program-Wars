<template>
  <div>
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Program Wars Themes</h3>
          <div class="container" style="width: 100%">
            <div class="row">
              <div class="col-sm">
                <select class="custom-select" name="select" v-model="themeType" style="width: 25%">
                  <option value="classic">Classic</option>
                  <option value="dark">Dark</option>
                  <option value="solarized">Solarized</option>
                </select>
              </div>
          </div>
            <div class="row">
              <img :src="getSrc()" alt="ThemePick" style="width: 50%; height: 45%; margin-top: 13px;">
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="changeTheme()" style="margin: 5px;">Apply</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;">Close</button>
        </div>
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
        themeType: 'classic',
      }
    },
    methods: {
      ...mapMutations([
        'updateTheme'
      ]),
      /**
       * This is the main function for changing the theme for all of the colours.
       */
      changeTheme () {
        if (this.themeType === 'classic') {
          this.updateTheme({
            mainBC: 'background-color: #ffffff',
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
        } else if (this.themeType === 'solarized') {
          this.updateTheme({
            mainBC: 'background-color: #175b89',
            playfieldBC: 'background-color: #4183af',
            mainTC: 'color: #ffffff; background-color: #175b89',
            playfieldTC: 'color: #ffffff; background-color: #4183af'
          })
        }
      },
      getSrc () {
        if (this.themeType === 'classic') {
          return 'static/Themes/classicTheme.jpg'
        } else if (this.themeType === 'dark') {
          return 'static/Themes/darkTheme.jpg'
        } else if (this.themeType === 'solarized') {
          return 'static/Themes/solarizedTheme.jpg'
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

  select {
    background-color: whitesmoke;
    -webkit-box-shadow: 1px 1px 1px 1px darkgray;
    -moz-box-shadow: 1px 1px 1px 1px darkgray;
    box-shadow: 1px 1px 1px 1px darkgray;
  }

</style>
