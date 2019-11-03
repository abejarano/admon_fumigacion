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
</style>
