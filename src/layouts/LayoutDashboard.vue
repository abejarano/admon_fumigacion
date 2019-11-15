<template>
    <section class="window">
        <div class="window-content">
            <section class="pane-group">
                <MenuPrincipal />
                <div class="pane">
                    <section class="d-flex justify-content-center h-100">
                        <div class="col-12 p-3">
                            
                            <router-view />
                            
                        </div>
                    </section>
                </div>  
            </section>
        </div>
    </section>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import MenuPrincipal from '@/components/MenuPrincipal.vue';

@Component({
    components: {
        MenuPrincipal,
    },
})
export default class LayoutDashboard extends Vue {
    
}
</script>