import { Client } from 'pg';
import { postgresql } from './pg.config';

class Conexion {
    private conex: any;
    private sqlWh: string = '';
    private whereValue: any[] = [];
    private sqlSelect: string = 'SELECT * ';
    private typeSQL: string = 'SELECT';
    private inner: string = '';

    public constructor() {
        this.conex = new Client(postgresql);

    }

    public where(wh: any) {
        let indx = 1;
        // tslint:disable-next-line:forin
        for (const key in wh) {
            if (this.sqlWh.length === 0) {
                this.sqlWh += ' WHERE ' + key + ' = $' + String(indx);
            } else {
                this.sqlWh += ' AND ' + key + ' = $' + String(indx);
            }

            this.whereValue.push(wh[key]);

            indx = indx + 1;

        }

        return this;
    }

    public orWhere(field: string, value: string) {
        const newIndx = Object.keys(this.whereValue).length + 1;
        this.sqlWh += ' OR ' + field + ' = $' + String(newIndx);
        this.whereValue.push(value);

        return this;
    }

    public select(table: string, fields: any = '') {
        if (fields.length > 0) {
            this.sqlSelect = 'SELECT ' + fields + ' FROM ' + table;
        } else {
            this.sqlSelect = 'FROM ' + table;
        }

        return this;
    }

    public async exec(): Promise <any> {
        let query = '';
        switch (this.typeSQL) {
            case "SELECT":
                query = this.sqlSelect + this.sqlWh;
                break;
            
            default:
                // code...
                break;
        }
        return true;
    }
}

export default  new Conexion();
