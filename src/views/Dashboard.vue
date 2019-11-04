<template>
    <div>
        <h2>HHHHHH</h2>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
})
export default class Dashboard extends Vue {
    
    created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
    }
}
</script>
