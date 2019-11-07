<template src = "./empresa.html"></template>
<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'Empresa',
})
export default class Empresa extends Vue {
    created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
    }
    public onSubmit() {

    }
    
}
</script>