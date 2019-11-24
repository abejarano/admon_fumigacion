<template src = './ServicioListado.html'></template>

<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator';
import DB from '@/backend/db';
import GenericTable from '@/components/GenericTable.vue';
import Tools from '@/backend/tools';

const numeral = require('numeral');

Vue.filter("formatNumber", (value: any) => {
    return numeral(value).format("0,000.00");
});

@Component({
    name: 'ServicioListado',
})
export default class ServicioListado extends GenericTable {
    public data: any = [];
    private loadTable: boolean = true;

    private checkAll: boolean = false;
    private tools = new Tools();
    
    public async created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
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
        },{
            label: '',
            key: 'button',
        }];
        
        this.loadData(this.currentPage);
        
    }

    async loadData(pageNum: any) {
        this.loadTable = true;
        this.currentPage= pageNum;
        const paginate =  await DB.select('servicios').paginate(this.currentPage, this.perPage);
        this.data = paginate.paginate_data;
        this.totalRows = paginate.paginate_totalRows;
        
        this.loadTable = false;
        this.setData(this.data);
        
    }

    async editar(codigo: string) {
        this.$router.push('/servicios/actualizar/' + codigo);
        
    }

    private async deleteItem(id: any) {
        
        const resp = await this.tools.showMessageQuestion({
            message: '¿Desea eliminar el servicio?',
            detail: ''
        });
        
        if (resp === 2 || resp === 0) {
            return;
        }
        
        DB.delete('servicios').where({
            codigo: id
        }).exec().then( result => {
           this.loadData(this.currentPage); 
        });
    }
    
}
</script>
