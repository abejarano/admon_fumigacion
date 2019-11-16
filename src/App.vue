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
  @import './assets/css/style.scss';
</style>
