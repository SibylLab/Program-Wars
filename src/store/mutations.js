export default {
  seenBackstory (state) {
    state.showBackstory = false
  },

  changePage (state, { page }) {
    state.page = page
  },

  changePageState (state, { pageState }) {
    state.pageState = pageState
  }
}
