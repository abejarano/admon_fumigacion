<template src = "./ClientesListado.html"></template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'ClientesListado'
})
export default class ClientesListado extends Vue {
    public items: any = [];

    created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
        this.items = [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
    }

}
</script>