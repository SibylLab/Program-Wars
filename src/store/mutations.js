import router from '@/router'

export default {
  seenBackstory (state) {
    state.showBackstory = false
  },

  setPage (state, { page }) {
    state.page = page
  },

  changePage (state, { page }) {
    state.page = page
    if (page === 'home') {
      router.push('/')
    } else {
      router.push(page)
    }
  },

  pushGameState (state, { gameState }) {
    state.game = gameState
  }
}
