<template>
    <section>
        <header class="toolbar toolbar-header">
            <div class="toolbar-actions">
                <div class="btn-group">
                    <button class="btn btn-default" v-on:click = "onSubmit">
                        <span class="icon icon-floppy pr-4"></span>
                        Guardar
                    </button>
                </div>
            </div>
        </header>
        <br>
        <h3 class="form-title">Configuración de empresa</h3>
        
        <b-form @submit.prevent="onSubmit" class="form-custom">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Configuración general" active>
                        <b-card-text>
                            <b-row>
                                <b-col cols = "2">
                                    <b-form-group label="Rif" label-for = "id_rif">
                                        <b-input type = "text" id="id_rif" v-mask = "'A-#########'" v-model="form.rif"></b-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols = "5">
                                    <b-form-group label="Razon social" label-for = "id_razsoc">
                                        <b-input id="id_razsoc" v-model = "form.razsoc"></b-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group label= "Dirección" label-for = "id_direccion">
                                        <b-form-textarea id="id_direccion" rows="3" v-model="form.direccion"></b-form-textarea>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="12">

                                </b-col>
                            </b-row>
                        </b-card-text>
                    </b-tab>
                    <b-tab title="Configuración administrativa">
                        <b-card-text>
                            <b-row>
                                <b-col cols = "2">
                                    <b-form-group label = "Porcentaje de I.V.A" label-for="id_iva">
                                        <b-input type = "text" id="id_iva" v-model="form.porcentaje_iva"></b-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols = "3">
                                    <b-form-group label = "Correlativo de Facturas" label-for="id_correlativo_factura">
                                        <b-input type = "text" id="id_correlativo_factura" v-model="form.correlativo_factura"></b-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols = "3">
                                    <b-form-group label = "Correlativo de presupuestos" label-for="id_correlativo_presupuestos">
                                        <b-input type = "text" id="id_correlativo_presupuestos" v-model="form.correlativo_presupuesto"></b-input>
                                    </b-form-group>
                                </b-col> 
                            </b-row>
                        </b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-form>
    </section>
</template>
<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import DB from '@/backend/db';

@Component({
    name: 'Empresa',
})
export default class Empresa extends Vue {
    private is_update: boolean = false;
    private form: any = {
        rif: '',
        razsoc: '',
        direccion: '',
        porcentaje_iva: '',
        correlativo_factura: '',
        correlativo_presupuesto: '',
    };

    public created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
        this.searhData();
    }
    private async searhData() {
        const data = await DB.select('empresa').exec();
        if (data.rowCount === 0) {
            this.is_update = false;
        } else {
            this.is_update = true;
            this.form = data;
        }

    }
    public onSubmit() {
        if (!this.is_update) {
            DB.insert('empresa', this.form).exec().then( () => {
                alert('Datos empresariales actualizados');
            });
        } else {
            DB.update('empresa', this.form).exec().then( () => {
                alert('Datos empresariales actualizados');
            });
        }
        
    }
}
</script>
