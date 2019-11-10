<template>
    <div class="border mt-5 p-5">
        <h3 class="text-center">Ingresar al Sistema</h3>
        <b-form id="form-login" @submit.prevent="onSubmit" @reset="onReset">
            <b-form-group
                id="usuario"
                label="Usuario:"
                label-for="input-usuario"
            >
            <b-form-input autofocus
                id="input-usuario" placeholder = "Ingrese su usuario"
                type="text"
                required
                v-model="form.usuario"
                ></b-form-input>
            </b-form-group>
            <b-form-group id="clave" label="Contraseña:" label-for="input-clave">
                <b-form-input
                    id="input-clave"
                    type="password"
                    required
                    placeholder="Escribe tu clave para ingresar al sistema"
                    v-model="form.clave"
                    >
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" class="col-12">Ingresar</b-button>
        </b-form>        
    </div>
        
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import DB from '@/backend/db';
import Tools from '@/backend/tools';

@Component({
    name: 'InicioSesion',
})
export default class InicioSesion extends Vue {
    public form: any = [];

    public created() {
        this.$store.commit('SET_LAYOUT',  'layout-home');
        this.form = {
            usuario: '',
            clave: '',
        };    
    }
    public onSubmit() {
        
        (async () => {
            
            const data = await DB.select('usuarios')
                            .where({usuario: this.form.usuario})
                            .exec();
            console.log(data.clave);
            if (data.rowCount === 0) {
                alert('Usuario ingresado no esta registrado en el sistema');
                return;
            }
            if (data.clave !== Tools.makePassword(this.form.clave)){
                alert('La clave ingresada es incorrecta');
                return;
            }
            this.$router.push('/dashboard');
        })();

   }

   public onReset() {

   }
}
</script>