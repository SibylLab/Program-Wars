import router from '@/router'

export default {
  seenBackstory (state) {
    state.showBackstory = false
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
