<template>
    <section>
        <h3 class="mt-2">Listado de servicios</h3>
        <hr>
        <br>
        <b-table striped hover :items="items"></b-table>
    </section>
</template>

<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'ServicioListado'
})
export default class ServicioListado extends Vue {
    public items: any = [];

    created() {
        this.items = [
            { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
            { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
            { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
            { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
    }
}
</script>