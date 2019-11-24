<template src = "./PresupuestoListado.html"></template>

<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator';
import GenericTable from '@/components/GenericTable.vue';
import DB from '@/backend/db';


@Component({
    name: 'PresupuestoListado.vue',
})
export default class PresupuestoListado extends GenericTable {
    public data: any = [];
    private loadTable: boolean = true;

    public async created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
        this.fields = [{
            label: '',
            key: 'check'
        },{
            label: 'Nro Presupuesto',
            key: 'id'
        },{
            label: 'Cliente',
            key: 'razon_social'
        },{
            label: 'Sub total',
            key: 'monto_base'
        },{
            label: 'I.V.A',
            key: 'monto_iva'
        },{
            label: 'Total',
            key: 'monto_total'
        },{
            label: 'Fecha creación',
            key: 'fecha_creacion'
        },{
            label: 'Fecha caducidad',
            key: 'fecha_expiracion'
        },{
            label: 'Estatus',
            key: 'estado'
        },];

        this.loadData(this.currentPage);

    }

    async loadData(pageNum: any) {
        this.loadTable = true;
        this.currentPage = pageNum;

        const paginate = await DB.select('presupuestos',
            'presupuestos.id, razon_social, monto_base, monto_iva, ' +
            'monto_total, fecha_creacion, fecha_expiracion, presupuestos.estado')
            .Inner('clientes', 'id', 'presupuestos.cliente_id')
            .paginate(this.currentPage, this.perPage);
            
        this.data = paginate.paginate_data;
        this.totalRows = paginate.paginate_totalRows;

        this.loadTable = false;
        this.setData(this.data);

    }
}
</script>

<style scoped>

</style>
