<template>
    <div class="pane pane-sm sidebar">
        <div class="text-center mt-2">
            <b-img :src="require(`@/assets/logo.jpeg`)" rounded="circle"  width="100px"></b-img>
            
        </div>
        <nav class="nav-group mt-3">
            <h5 class="nav-group-title">Configuraciones</h5>
            <router-link class="nav-group-item" to="/dashboard" exact>
                <span class="icon icon-home"></span>
                Escritorio
            </router-link>
            <a class="nav-group-item">
                <span class="icon icon-doc-landscape"></span>
                Empresa
            </a>
            <span class="nav-group-item">
                <span class="icon icon-tools"></span>
                Servicios
            </span>
            <h5 class="nav-group-title">Operaciones</h5>
            <span class="nav-group-item">
                <span class="icon icon-clock"></span>
                Cronograma de trabajos
            </span>
             <router-link class="nav-group-item" to="/clientes">
                <span class="icon icon-home"></span>
                Clientes
             </router-link>
            <span class="nav-group-item">
                <span class="icon icon-print"></span>
                Facturación
            </span>
            <router-link class="nav-group-item" to="/" exact style="position:fixed; bottom:24px">
            
                <span class="icon icon-export"></span>
                <a>
                    Cerrar Sesión
                </a>
            </router-link>
            
        </nav>
    </div>
            
</template>
<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'MenuPrincipal'
})
export default class MenuPrincipal extends Vue {
    
}
</script>