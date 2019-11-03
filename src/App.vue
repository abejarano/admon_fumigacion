<template>
  <div id="app">
    
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ipRenderer from 'electron';


@Component({
  components: {
    
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">

  html, body {
    font-size: 9pt;
  }
  a {
    color: #333;
    cursor: pointer;
  }
  .router-link-active{
        background-color: #dcdfe1;
  }
  fieldset {
    padding: 6px 10px !important;
    border:1px solid #fd945a !important;
    border-radius: 6px;
  }
  legend{
    width: initial !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
  .circle {
    
    background: #fd945a;
    color:white;
    padding: 7px 8px;
    line-height: 34px;
    border-radius: 100px;
    font-size: 1rem;
  }
</style>
