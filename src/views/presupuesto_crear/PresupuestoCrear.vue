<template src = "./PresupuestoCrear.html"></template>
<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'presupuesto'
})
export default class Presupuesto extends Vue {
    private is_update: boolean = false;
    private accion: string = 'Crear';
    
    private form: any = {

    };

    created() {
        this.$store.commit('SET_LAYOUT',  'layout-dashboard');
    }
    private async onSubmit(onAction: any) {

    }
    public resetForm() {
        Object.keys(this.form).forEach( (key,index) => {
            this.form[key] = '';
        });
        
    }
}
</script>