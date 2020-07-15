<template>
<div id="requirements">
  <page-header/>

  <h4 class="title centered">Phase 1: Requirements</h4>

  <div id="phase-info" class="centered">
    <h4>
      <div class="name">{{ pageState.currentPlayer().name.toUpperCase() }}</div>
      Select Your Requirement
    </h4>
  </div>

  <!-- Component for listing a bunch of cards, title and cards prop? -->
  <!-- list requriement details -->

</div>
</template>

<script>
import PageHeader from '@/components/shared/PageHeader'

export default {
  name: 'requirements',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'page-header': PageHeader
  }
}
</script>

<style scoped>
#requirements {
  width: 100%;
  height: 100%;
}

#phase-info {
  position: absolute;
  top: 40px;
}

.name {
  display: inline;
  color: red;
}


.title {
  position: absolute;
  width: 50%;
  z-index: 20;
  color: white;
}

.centered {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

h4 {
  margin: 0;
  margin-top: 10px;
}
</style>

