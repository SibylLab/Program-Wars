<template>
  <div id="condsField">
    <div class="container conditionals">
      <p> This is where the conditionals list will go </p>
      <!--<ol class="condList">
        <li v-for="cond in condList"> if {{getCondIf(cond)}} <br> then {{getCondThen(cond)}} <br> else {{getCondElse(cond)}}</li>
      </ol>-->
    </div>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'

export default {
  name: 'conditionals-list',
  props: ['playerId'],
  data () {
    return {
      title: 'conds'/* ,
      condList: [{condIf: '(more than 5 groups)', condThen: '{earn 10 points}', condElse: '{lose 5 points}', completed: false},
                    {condIf: '(more than 5 repeats)', condThen: '{earn 10 points}', condElse: '{lose 5 points}', completed: false},
                    {condIf: '(more than 3 players hacked)', condThen: '{earn 15 points}', condElse: '{lose 3 points}', completed: false},
                    {condIf: '(no virus on PC)', condThen: '{earn 5 points}', condElse: '{lose 10 points}', completed: false},
                    {condIf: '(all safeties)', condThen: '{earn 50 points}', condElse: '{lose 5 points}', completed: false}] */
    }
  }/* ,
  computed: {
    condList () {
      let condList = this.getCondList()
      return condList[0]
    }
  },
  methods: {
    /* ...mapGetters([
      'getConditionsList'
    ]) */
    /* getCondIf (index) {
      return this.condList[index].condIf
    },
    getCondThen (index) {
      return this.condList[index].condThen
    },
    getCondElse (index) {
      return this.condList[index].condElse
    }
    getCondList () {
      return [{condIf: '(more than 5 groups)', condThen: '{earn 10 points}', condElse: '{lose 5 points}', completed: false},
                    {condIf: '(more than 5 repeats)', condThen: '{earn 10 points}', condElse: '{lose 5 points}', completed: false},
                    {condIf: '(more than 3 players hacked)', condThen: '{earn 15 points}', condElse: '{lose 3 points}', completed: false},
                    {condIf: '(no virus on PC)', condThen: '{earn 5 points}', condElse: '{lose 10 points}', completed: false},
                    {condIf: '(all safeties)', condThen: '{earn 50 points}', condElse: '{lose 5 points}', completed: false}]
    }
  } */

}
</script>

<style scoped>
  #condsField {
    background-color: yellowgreen;
    width: 100%;
    height: 90%;
    min-height: 100px;
  }
</style>
