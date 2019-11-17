<template src = "./PresupuestoCrear.html"></template>
<script lang = "ts">
import { Vue, Component, InjectReactive } from 'vue-property-decorator';
import AddServiceTable from '@/components/AddServiceTable.vue';
import DB from '@/backend/db';

@Component({
    name: 'presupuesto',
    components: { AddServiceTable }
})
export default class Presupuesto extends Vue {
    private is_update: boolean = false;
    private accion: string = 'Crear';
    private fields: any = [];
    private data: any = [];

    private form: any = {
        iva: 0,
        porcentaje_iva: '',
        sub_total: 0,
        total: 0,
        rif: '',
        razon_social: ''
    };

    private async created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
        this.fields = [{
            label: '',
            key: 'check'
        },{
            label: 'CÓDIGO',
            key: 'codigo',
        },{
            label: 'DESCRIPCION',
            key: 'descripcion',
        }, {
            label: 'CANTIDAD',
            key: 'cantidad',
        }, {
            label: 'PRECIO UNITARIO',
            key: 'precio',
        }, {
            label: 'TOTAL',
            key: 'total'
        }];

        const empresa = await DB.select('empresa').exec();
        this.form.porcentaje_iva = empresa.porcentaje_iva;
        
    }
    
    private async onSubmit(onAction: any) {

    }

    public resetForm() {
        Object.keys(this.form).forEach( (key,index) => {
            this.form[key] = '';
        });
        
    }

    private openModelService() {
        this.$root.$emit('bv::show::modal', 'modalService');
    }

    public setAddItem (newItem: any) {
        this.data = newItem;
        this.setCalculateTotal();
    }

    private setCalculateTotal() {
        let subtotal: number = 0;
        for (const iterator of this.data) {
            subtotal += iterator.total;
        }
        this.form.sub_total = (subtotal).toFixed(2);
        const iva = (subtotal * this.form.porcentaje_iva).toFixed(2);
        this.form.iva = iva;

        this.form.total = (Number(iva) + subtotal).toFixed(2);
    }

    private async setSearchClient(rifClient: string) {
        
        const data = await DB.select('clientes').where({
            rif: rifClient
        }).exec();
        if (data.rowCount === 0) {
            return;
        }

        this.form.razon_social = data.razon_social;
    }
}
</script>