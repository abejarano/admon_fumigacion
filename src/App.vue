<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import LayoutHome from '@/layouts/LayoutHome';
import LayoutDashboard from '@/layouts/LayoutDashboard';
import { mapState } from 'vuex';

@Component({
  components: {
    LayoutHome,
    LayoutDashboard,
  },
  computed: mapState(['layout']),
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
  .toolbar-header {
    border: 1px solid #c2c0c2 !important;
  }
  .toolbar-header .btn-default {
    border-color: #c2c0c2 #c2c0c2 #a19fa1;
  }
  .toolbar-actions  a {
    cursor: pointer;
  }
  th {text-transform: uppercase}
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
  
  th {
    font-size: 8pt; font-weight: bold !important;
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
