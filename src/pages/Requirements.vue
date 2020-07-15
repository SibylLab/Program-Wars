<template>
<div id="requirements">
  <page-header/>

  <h4 id="title">Requirements Phase: "PLAYER" Select Your Requirements</h4>

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

#title {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 40px;
  margin: 0;
  margin-top: 10px;
}
</style>

