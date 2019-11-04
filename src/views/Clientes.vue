<template>
<section>
    <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
            <div class="btn-group">
                <button class="btn btn-default">
                    <span class="icon icon-doc pr-4"></span>
                    Nuevo
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
            <ClientesCrear />
        </div>
    </section>
               
</section>
</template>
<script lang = 'ts'>
import { Vue, Component} from 'vue-property-decorator';
import ClientesCrear from '@/components/clientes/ClientesCrear.vue';

@Component({
    components: {
        ClientesCrear
    }
})
export default class Clientes extends Vue{
    created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
    }
}
</script>