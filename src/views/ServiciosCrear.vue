<template>
    <section>
        <header class="toolbar toolbar-header">
            <div class="toolbar-actions">
                <div class="btn-group">
                    <router-link class="btn btn-default" to="/servicios/crear" exact>
                        <span class="icon icon-doc pr-4"></span>
                        Nuevo
                    </router-link>
                    <router-link class="btn btn-default" to="/servicios">
                        <span class="icon icon-menu pr-4"></span>
                        Listado
                    </router-link>
                    <button class="btn btn-default" v-on:click = "onSubmit('l')">
                        <span class="icon icon-floppy pr-4"></span>
                        Guardar
                    </button>
                    <button class="btn btn-default" v-on:click = "onSubmit('o')">
                        <span class="icon icon-floppy pr-4"></span>
                        Guardar y añadir otro
                    </button>
                    <button class="btn btn-default" v-on:click = "resetForm">
                        <span class="icon icon-arrows-ccw pr-4"></span>
                        Limpiar
                    </button>
                </div>
            </div>
        </header>
        <h3 class="form-title">{{ accion }} servicios</h3>
        <hr>
        <b-form @submit.prevent="onSubmit" id="form" class="form-custom">
            <b-row>
                <b-col cols = "2">
                    <b-form-group label="Código" label-for = "id_servicio">
                        <b-input ref = "codigo" :disabled="is_update"  v-mask="'sv####'"  type="text" id = "id_servicio" required = "required" maxlength = "6" autofocus v-model="form.codigo"></b-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols = "12">
                    <b-form-group label = "Nombre del servicio" label-for = "id_nombre">
                        <b-input type="text" id="id_nombre" required = "required" v-model = "form.descripcion"></b-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols = "3">
                    <b-form-group label="Precio del servicio" label-for="id_precio">
                        <b-input type="text" required = "required" v-model = "form.monto"></b-input>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group label="¿Activo?" label-for="id_estatus">
                        <b-form-select v-model="form.estatus" id="id_estatus">
                            <option value="A">Si</option>
                            <option value="I">No</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <br>    
            <hr>
                
        </b-form>
    </section>
</template>
<script lang = "ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Tools from '@/backend/tools';
import DB from '@/backend/db';

@Component({
    name: 'ServicosCrear'
})
export default class ServicosCrear extends Vue {
    private is_update: boolean = false;
    private accion: string = 'Crear';
    public form: any = {
            codigo : '',
            descripcion: '',
            monto: '',
            estatus: 'A'
        };
    private tools = new Tools();
    private searchCode: string = '';

    public created() {
        console.log(this.$route.params);
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
        if (this.$route.params.action === 'crear') {
            this.is_update = false;
        } else {
            this.is_update = true;
            this.searchData();
        }
        
        
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
                await DB.insert('servicios', this.form).exec();
                
            } else {
                await DB.update('servicios', this.form).where({codigo: this.$route.params.id}).exec();
            }
            
            if (onAction === 'l') {
                this.$router.push('/servicios');
            }
            
        } catch(err) {
            alert(err.message);
        }
        
        
    }

    public resetForm() {
        
        Object.keys(this.form).forEach( (key,index) => {
            this.form[key] = '';
        });
        // this.$refs.codigo.focus();
        this.is_update = false;
        if (this.$route.params.action !== 'crear') {
            this.$router.push('/servicios/crear');
        }
        
    }

    private async searchData() {
        DB.select('servicios').where({codigo: this.$route.params.id}).exec().then( data => {
            this.form = data;
        });
        
    }
}
</script>