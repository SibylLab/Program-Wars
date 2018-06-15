/**
 * Created by shauncullen on 2017-03-28.
 */

<template>
  <!-- Modal -->
  <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
        </div>
        <div v-if="modalCards.length === 0" class="modal-body">
          {{ modalBody }}
          <div v-if="image">
            <img src="https://media.giphy.com/media/MGaacoiAlAti0/giphy.gif">
          </div>
        </div>
        <div v-else class="modal-body">
          <ul id="discardList" v-for="card in modalCards">
            <li>
              <card :cardData="card" :inStack="false"></card>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button v-if="cancel" type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="modalCallback">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { bus } from '../SharedComponents/Bus';
  import Card from '../SharedComponents/Card'


  export default {
    name: 'modal',
    props: ['modalId', 'modalTitle', 'modalBody', 'modalCards', 'modalCallback', 'modalCallback2', 'cancel', 'image'],
    components: {
        'card': Card
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h1, h2 {
    font-weight: normal;
    font-size: 1em;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .value {
    font-weight: bold;
    font-size: 5em;
  }
  .type {
    font-weight: bold;
    font-size: 2em;
  }

  .selected {
    -webkit-box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
    -moz-box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
    box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
  }

  #discardList {
    display: inline;
  }


</style>
