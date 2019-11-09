<template>
    <div class="border mt-5 p-5">
        <h3 class="text-center">Ingresar al Sistema</h3>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
            <b-form-group
                id="usuario"
                label="Usuario:"
                label-for="input-usuario"
            >
            <b-form-input
                id="input-usuario" placeholder = "Ingrese su usuario"
                type="text"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="clave" label="Contraseña:" label-for="input-clave">
                <b-form-input
                    id="input-clave"
                    type="password"
                    required
                    placeholder="Enter email"
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

@Component({
    name: 'InicioSesion',
})
export default class InicioSesion extends Vue {
    public created() {
        this.$store.commit('SET_LAYOUT',  'layout-home');
        DB.where({
            usuario: 'abejarano',
            clave: '130202',
        }).orWhere('0', 's');
    }
   public onSubmit() {
       this.$router.push('/dashboard');
   }

   public onReset() {

   }
}
</script>