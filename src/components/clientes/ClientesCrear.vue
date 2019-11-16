<template src="./ClientesCrear.html"></template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Tools from '@/backend/tools';
import DB from '@/backend/db';

@Component({
    name: 'ClientesCrear'
})
export default class ClientesCrear extends Vue {
    private is_update: boolean = false;
    private accion: string = 'Crear';
    private form: any = {
        rif: '',
        razon_social: '',
        correo_empresa: '',
        telefono_empresa: '',
        direccion: '',
        nombre_representante: '',
        telefono_representante: '',
        correo_representante: '',
        tipo_cliente: '',
        estado: '',
    };
    private tools = new Tools();
    
    created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
        if (this.$route.params.action === 'crear') {
            this.is_update = false;
        } else {
            this.is_update = true;
            this.searchData();
        }
    }

    private async searchData() {
        
        DB.select('clientes').where({rif: this.$route.params.id}).exec().then( data => {
            this.form = data;
        });
    }

    public async onSubmit(onAction: any) {
        const resp = await this.tools.showMessageQuestion({
            message: '¿Desea '+this.$route.params.action+' el servicio?',
            detail: 'Se registrará una nuevo servicio en la base de datos'
        });
        
        if (resp === 2 || resp === 0) {
            return;
        }
        try {
            if (!this.is_update) {
                await DB.insert('clientes', this.form).exec();
                
            } else {
                await DB.update('clientes', this.form).where({rif: this.$route.params.id}).exec();
            }
            
            if (onAction === 'l') {
                this.$router.push('/clientes');
            }
            
        } catch(err) {
            alert(err.message);
        }
    }

    public resetForm() {
        Object.keys(this.form).forEach( (key,index) => {
            this.form[key] = '';
        });
        
    }
}
</script>