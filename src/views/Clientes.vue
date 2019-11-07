<template>
<section>
    <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
            <div class="btn-group">
                <button class="btn btn-default" v-on:click = "nuevo">
                    <span class="icon icon-doc pr-4"></span>
                    Nuevo
                </button>
                <button class="btn btn-default" v-on:click = "listar">
                    <span class="icon icon-menu pr-4"></span>
                    Listado
                </button>
                <button class="btn btn-default">
                    <span class="icon icon-floppy pr-4"></span>
                    Guardar
                </button>
                <button class="btn btn-default">
                    <span class="icon icon-trash pr-4"></span>
                    Eliminar
                </button>
                <button class="btn btn-default">
                    <span class="icon icon-search"></span>
                    Filtrar
                </button>
                
            </div>
        </div>
    </header>
    <section class="d-flex justify-content-center h-100">
        <div class="col-12 p-3">
            <ClientesCrear v-if="crear" />
            <ClientesListado v-if = "listado" />
        </div>
    </section>
               
</section>
</template>
<script lang = 'ts'>
import { Vue, Component} from 'vue-property-decorator';
import ClientesCrear from '@/components/clientes/ClientesCrear.vue';
import ClientesListado from '@/components/clientes/ClientesListado.vue';

@Component({
    components: {
        ClientesCrear,
        ClientesListado
    }
})
export default class Clientes extends Vue{
    public crear: boolean = false;
    public listado: boolean = true;

    public created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
    }
    public nuevo() {
        this.crear = true;
        this.listado = false;
    }

    public listar() {
        this.crear = false;
        this.listado = true;
    }
}
</script>