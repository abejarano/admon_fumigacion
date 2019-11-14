<template>
    <section>
        <h3 class="mt-2">Listado de servicios</h3>
        <hr>
        <br>
        <div class="overflow-auto">
            <div class="mt-6">
                <b-pagination align="center" @input="cargarDatos(currentPage)"
                    v-model="currentPage"
                    pills
                    :total-rows="totalRows"
                    :per-page="perPage"
                ></b-pagination>
            </div>
        </div>

        <b-table id="my-table" striped hover :busy="loadTable" :items="items" :fields="fields">
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <br>
                    <strong>Cargando datos ...</strong>
                </div>
            </template>
            <template v-slot:head(check)="data">
                <div class="text-center">
                    <b-form-checkbox v-on:click="selectAll"></b-form-checkbox>
                </div>
            </template>
            <template v-slot:cell(check) = "data">
                <div class="text-center">
                    <b-form-checkbox :value="data.item.id" v-model="check"></b-form-checkbox>
                </div>
            </template>
            <template v-slot:cell(monto)="data">
                {{ data.item.monto | formatNumber}}
            </template>
        </b-table>
    </section>
</template>

<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator';
import DB from '@/backend/db';
const numeral = require('numeral');

Vue.filter("formatNumber", (value: any) => {
    return numeral(value).format("0,000.00"); // displaying other groupings/separators is possible, look at the docs
});

@Component({
    name: 'ServicioListado'
})
export default class ServicioListado extends Vue {
    public items: any = [];
    private fields: any = [];
    private loadTable: boolean = true;
    private check: any;
    private currentPage: number = 1;
    private totalRows: number = 120;
    private perPage: number = 40;

    public async created() {
        this.check = [];
        this.fields = [{
            label: '',
            key: 'check'
        },{
            label: 'CÓDIGO',
            key: 'codigo',
            sortable: true,
        }, {
            label: 'DESCRIPCIÓN',
            key: 'descripcion',
        }, {
            label: 'MONTO',
            key: 'monto',
            sortable: true,
        }, {
            label: 'ESTATUS',
            key: 'estatus'
        }];

        this.items =  await DB.select('servicios').exec();
        this.loadTable = false;
        
    }

    cargarDatos(pageNum: any) {
        console.log(pageNum);
      return pageNum
    }
    
    get selectAll () {
        return true;
    }
}
</script>
