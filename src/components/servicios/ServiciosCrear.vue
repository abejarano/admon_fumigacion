<template>
    <section>
        <h3>{{ accion }} servicios</h3>
        <hr>
        <br>
        <b-form @submit.prevent="onSubmit" class="mt-5">
                <b-row>
                    <b-col cols = "2">
                        <b-form-group label="Código" label-for = "id_servicio">
                            <b-input type="number" id = "id_servicio" max-lenght = "6" autofocus = "on"></b-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols = "12">
                        <b-form-group label = "Nombre del servicio" label-for = "id_nombre">
                            <b-input type="text" id="id_nombre"></b-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols = "3">
                        <b-form-group label="Precio del servicio" label-for="id_precio">
                            <b-input></b-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group label="¿Servicio activo?">
                            <b-form-radio-group class="text-center" id="radio-group-2" name="radio-sub-component">
                                <b-form-radio value="N">Si</b-form-radio>
                                <b-form-radio class="ml-5" value="S">No</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                    </b-col>
                </b-row>
        </b-form>
    </section>
</template>
<script lang = "ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'ServicosCrear'
})
export default class ServicosCrear extends Vue {
    @Prop() private accion!: string;

    created() {
        
    }
}
</script>