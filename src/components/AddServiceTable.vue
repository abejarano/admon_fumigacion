<template>
    <b-modal id="modalService" title="Agregar servicio" modal-title="false" header-text-variant="light" header-bg-variant= "dark" @show="showModalService">
        <b-form-group label="Servicio" label-for = "id_servicio">
            <b-form-select id ="id_servicio" v-on:change = "getPriceService($event)" v-model="formModalService.codigo">
                <option v-for="item of dataService" :value="item.id">{{ item.codigo }} - {{ item.descripcion }}</option>
            </b-form-select>
        </b-form-group>
        <b-row>
            <b-col cols = "4">
                <b-form-group label="Monto Unitario" label-for = "id_precio">
                    <b-form-input type="text" disabled id="id_precio" v-model="formModalService.precio"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols = "4">
                <b-form-group label="Cantidad" label-for = "id_cantidad">
                    <b-form-input value="1" id = "id_cantidad" v-model="formModalService.cantidad" v-on:keyup.enter = "calcularTotal"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols = "4">
                <b-form-group label="Total" label-for = "id_total">
                    <b-form-input id="id_total" v-model="formModalService.total"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <template v-slot:modal-footer="{ cancel }">
            <b-button size="md" variant="success" @click="addItem()">
                <span class="icon icon-plus-circled mr-3" style="color: white;"></span>
                Agregar
            </b-button>
        </template>
    </b-modal>
</template>
<script  lang = "ts">
import { Vue, Component, ProvideReactive } from 'vue-property-decorator';
import DB from '@/backend/db';

@Component({
    name: 'AddServiceTable'
})
export default class AddServiceTable  extends Vue {
    private dataService: any = [];
    private itemsServices: any = [];
    private formModalService: any = {
        codigo: '',
        precio: '',
        cantidad: 1,
        total: '',
    };

    private async addItem() {
        if (this.formModalService.codigo === '') {
            alert('Por favor seleccione un servicio');
            return;
        }
        const descripcion = await this.getDescriptionService(this.formModalService.codigo);
        console.log(descripcion);
        this.itemsServices.push({
            codigo: this.formModalService.codigo,
            descripcion: descripcion,
            cantidad: this.formModalService.cantidad,
            precio: this.formModalService.precio,
            total: this.formModalService.total
        });
        this.$emit('makeAddItem', this.itemsServices);
    }

    private async showModalService() {
        this.formModalService = {
            codigo: '',
            precio: '',
            cantidad: 1,
            total: '',
        };
        this.dataService = await DB.select('servicios', 'id, codigo, descripcion, monto')
            .where({estatus: 'A'})
            .exec();
    }

    private async getDescriptionService(code: string): Promise<any> {
        
        for (const iterator of this.dataService) {
            if (iterator.id === code) {
                return iterator.descripcion;
            }
        }
        
        
    }

    private async getPriceService(idService: number) {
        for (const iterator of this.dataService) {
            if (iterator.id === idService) {
                this.formModalService.precio = iterator.monto;
                this.calcularTotal();
            }
        }
    }
    private calcularTotal() {
        this.formModalService.total = this.formModalService.precio * this.formModalService.cantidad;
    }
}
</script>