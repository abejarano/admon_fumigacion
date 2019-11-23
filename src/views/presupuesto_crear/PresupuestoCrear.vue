<template src = "./PresupuestoCrear.html"></template>
<script lang = "ts">
import { Vue, Component, InjectReactive } from 'vue-property-decorator';
import AddServiceTable from '@/components/AddServiceTable.vue';
import ClientesCrear from '@/views/clientes_crear/ClientesCrear.vue';
import DB from '@/backend/db';
import Tools from '@/backend/tools';
var moment = require('moment');

@Component({
    name: 'presupuesto',
    components: {
        AddServiceTable,
        ClientesCrear,
    }
})
export default class Presupuesto extends Vue {
    private is_update: boolean = false;
    private accion: string = 'Crear';
    private fields: any = [];
    private data: any = [];
    private tools = new Tools();
    private dias_presupuesto: number = 0;
    private form: any = {
        monto_iva: 0,
        porcentaje_iva: '',
        monto_base: 0,
        monto_total: 0,
        rif: '',
        cliente_id: '',
        razon_social: '',
        nro_presupuesto: ''
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
        this.form.nro_presupuesto = empresa.correlativo_presupuesto;
        this.dias_presupuesto = empresa.dias_presupuesto;   

    }

    public resetForm() {
        Object.keys(this.form).forEach( (key,index) => {
            this.form[key] = '';
        });
        this.data = [];
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
        this.form.monto_base = (subtotal).toFixed(2);
        const iva = (subtotal * this.form.porcentaje_iva).toFixed(2);
        this.form.monto_iva = iva;

        this.form.monto_total = (Number(iva) + subtotal).toFixed(2);
    }

    private async setSearchClient(rifClient: string) {
        
        const data = await DB.select('clientes').where({
            rif: rifClient
        }).exec();
        if (data.rowCount === 0) {
            this.$root.$emit('bv::show::modal', 'modal-client');
            return;
        }
        this.form.cliente_id = data.id;
        this.form.razon_social = data.razon_social;
    }

    private async receiveClient(client_id: any) {
        this.$root.$emit('bv::hide::modal', 'modal-client');
        if (client_id > 0) {
            const data = await DB.select('clientes').where({
                id: client_id
            }).exec();
            if (data.rowCount === 0) {
                return;
            }
            this.form.razon_social = data.razon_social;
            this.form.rif = data.rif;
            this.form.cliente_id = client_id;
        }
    }

    private async onSubmit(onAction: any) {
        const resp = await this.tools.showMessageQuestion({
            message: '¿Desea '+this.$route.params.action+' el servicio?',
            detail: 'Se registrará una nuevo servicio en la base de datos'
        });

        if (resp === 2 || resp === 0) {
            return;
        }

        try {
            const data_presupuesto = {
                fecha_expiracion: moment().add('days', this.dias_presupuesto).format('YYYY-MM-DD'),
                monto_iva: this.form.monto_iva,
                monto_base: this.form.monto_base,
                monto_total: this.form.monto_total,
                cliente_id: this.form.cliente_id,
                porcentaje_iva: this.form.porcentaje_iva,
            };
            DB.conex.beginTransaction( () => {
                (async () => {
                    const id = await DB.insert('presupuestos', data_presupuesto).exec();
            
                    for (const iterator of this.data) {
                        const detail = {
                            monto_unitario: iterator.precio,
                            cantidad: iterator.cantidad,
                            total: iterator.total,
                            servicio_id: iterator.codigo,
                            presupuesto_id: id,
                        }
                        await DB.insert('presupuesto_detalles', detail).exec();
                    }    
                    DB.conex.commit( (err: any) =>{
                        if (err) { 
                            DB.conex.rollback( () => {
                                throw err;
                            });
                        }
                        this.resetForm();
                    });
                })();
                
            });
            

        } catch (e) {
            alert(e.message);
        }

    }
}
</script>
