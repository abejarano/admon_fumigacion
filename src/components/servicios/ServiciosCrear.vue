<template>
    <section>
        <h3>{{ accion }} servicios</h3>
        <hr>
        <br>
        <b-form @submit.prevent="onSubmit" id="form" class="mt-5">
                <b-row>
                    <b-col cols = "2">
                        <b-form-group label="Código" label-for = "id_servicio">
                            <b-input ref = "codigo" type="text" id = "id_servicio" required = "required" maxlength = "6" autofocus v-model="form.codigo"></b-input>
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
                            <b-input type="number" required = "required" value="0" v-model = "form.monto"></b-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group label="¿Servicio activo?">
                            <b-form-radio-group class="text-center" id="radio-group-2" name="radio-sub-component">
                                <b-form-radio v-model="form.estatus" value="N">Si</b-form-radio>
                                <b-form-radio v-model="form.estatus" class="ml-5" value="S">No</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <hr>
                <div class="text-center">
                    <b-button variant="success" type="submit">Guardar</b-button>
                    <b-button type="submit" class="ml-2"  v-on:click = "resetForm">Limpiar</b-button>
                </div>
                
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
    @Prop() private accion!: string;
    public form: any = [];
    private tools = new Tools();

    public created() {

        this.form = {
            codigo : '',
            descripcion: '',
            monto: '',
            estatus: ''
        };
    }

    public async onSubmit() {
        
        const resp = await this.tools.showMessageQuestion({
            message: '¿Desea guardar el servicio?',
            detail: 'Se registrará una nuevo servicio en la base de datos'
        });

        if (!resp) {
            return;
        }
        try {
            const i = await DB.insert('servicios', this.form).exec();
            alert('Servicio registrado con éxito');
            this.resetForm();
        } catch(err) {
            alert(err.message);
        }
        
        
    }

    public resetForm() {
        Object.keys(this.form).forEach( (key,index) => {
            this.form[key] = '';
        });
        this.$refs.codigo.focus();
        
    }
}
</script>