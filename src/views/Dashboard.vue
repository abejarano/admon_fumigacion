<template>
    <section class="window">

    
    <div class="window-content">
        <section class="pane-group">
            <MenuPrincipal />
            <div class="pane">
                <section class="d-flex justify-content-center h-100">
                    <div class="col-12 p-3">
                        <h2>HHHHHH</h2>
                    </div>
                </section>
            </div>  
        </section>
    </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import MenuPrincipal from '@/components/MenuPrincipal.vue';

export default Vue.extend({
    components:{
        MenuPrincipal,
    }
})
</script>