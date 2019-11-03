<template>
<section>
    <section class="window">    
        <div class="window-content">
            <section class="pane-group">
                <MenuPrincipal />
                <div class="pane">
                    
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
                            
                        </div>
                    </section>
                </div>  
            </section>
        </div>
    </section>
    
</section>
</template>
<script>
import { Vue, Component} from 'vue-property-decorator';
import MenuPrincipal from '@/components/MenuPrincipal';

@Component({
    components: {
        MenuPrincipal
    }
})
export default class Clientes extends Vue{
        
}
</script>