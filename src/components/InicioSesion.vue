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

@Component({
    name: 'InicioSesion'
})
export default class InicioSesion extends Vue {
    created() {
        this.$store.commit('SET_LAYOUT',  'layout-home');
    }
   onSubmit() {
       this.$router.push('/dashboard') 
       console.log('ss');
   }

   onReset() {

   }
}
</script>