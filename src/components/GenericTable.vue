<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator';
import Tools from '../backend/tools';

@Component({})
export default class GenericTable extends Vue {
    private check: any[] = [];
    private selectedAll: boolean = false;
    private items: any[] = [];

    public currentPage: number = 1;
    public totalRows: number = 1;
    public perPage: number = 14;
    public fields: any = [];
    private filter: string = '';

    setData(data: any[]) {
        this.items = data;
    }
    selectAll () {
        if (!this.selectedAll) {
            for (const item in this.items) {
                this.check.push(this.items[item].id.toString());
            }
            this.selectedAll = true;
        } else {
            while(this.check.length > 0) {
                this.check.pop();
            }
            this.selectedAll = false;
        }
        
    }

    select(itemID: any) {
        const indx = this.check.indexOf(itemID);
        if (indx < 0) {
            this.check.push(itemID);
        } else {
            this.check.splice(indx, 1);
        }
        console.log(this.check);
    }

    getSelectedData() {
        return this.check;
    }

    onFiltered(filteredItems: any) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1
    }
}
</script>
