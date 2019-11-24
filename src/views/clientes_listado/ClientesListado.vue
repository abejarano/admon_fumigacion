<template src = "./ClientesListado.html"></template>


<script lang = "ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Tools from '@/backend/tools';
import DB from '@/backend/db';
import GenericTabble from '@/components/GenericTable.vue';

@Component({
    name: 'ClientesListado'
})
export default class ClientesListado extends GenericTabble {
    public data: any = [];
    private loadTable: boolean = false;
    private tools = new Tools();

    public async created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
        this.fields = [{
            label: '',
            key: 'check'
        }, {
            label: 'Rif / C.I',
            key: 'rif'
        }, {
            label: 'Razon social',
            key: 'razon_social'
        }, {
            label: 'Correo electrónico',
            key :'correo_empresa'
        }, {
            label: 'Nro. telefónico',
            key :'telefono_empresa'
        }, {
            label: '',
            key: 'button',
        }];
        
        this.loadData(this.currentPage);

    }
    async loadData(pageNum: any) {
        this.loadTable = true;
        this.currentPage= pageNum;
        const paginate =  await DB.select('clientes', 
            'rif, razon_social, correo_empresa, telefono_empresa')
            .paginate(this.currentPage, this.perPage);
            console.log(paginate);
        this.data = paginate.paginate_data;
        this.totalRows = paginate.paginate_totalRows;
        
        this.loadTable = false;
        //this.setData(this.data);
        
    }

    async editar(codigo: string) {
        this.$router.push('/clientes/actualizar/' + codigo);
        
    }

    onFiltered(filteredItems: any) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
    }
    private async deleteItem(id: any) {
        
        const resp = await this.tools.showMessageQuestion({
            message: '¿Desea eliminar el cliente?',
            detail: ''
        });
        
        if (resp === 2 || resp === 0) {
            return;
        }
        
        DB.delete('clientes').where({
            rif: id
        }).exec().then( result => {
           this.loadData(this.currentPage); 
        });
    }
}
</script>