import mysql from 'mysql';

class Conexion {
    private conex: any;
    private sqlWh: string = '';
    private sqlSelect: string = 'SELECT * ';
    private inner: string = '';
    private whereValue: any[] = [];
    private typeSQL: string = 'SELECT';


    public constructor() {
        // this.conex = new Pool(postgresql);
        const db = mysql.createConnection ({
            host: '127.0.0.1',
            user: 'root',
            password: 'mysql',
            database: 'db_fumigacion',
        });

        db.connect((err) => {
            if (err) {
                alert(err);
            }

        });
        this.conex = db;
    }

    public where(wh: any) {
        let indx = 1;
        // tslint:disable-next-line:forin
        for (const key in wh) {
            if (this.sqlWh.length === 0) {
                // this.sqlWh += ' WHERE ' + key + ' = $' + String(indx);
                this.sqlWh += ' WHERE ' + key + ' = ? ';
            } else {
                // this.sqlWh += ' AND ' + key + ' = $' + String(indx);
                this.sqlWh += ' AND ' + key + ' = ? ';
            }

            this.whereValue.push(wh[key]);

            indx = indx + 1;

        }
        return this;
    }

    public orWhere(field: string, value: string) {
        // falta mejorar
        const newIndx = Object.keys(this.whereValue).length + 1;
        this.sqlWh += ' OR ' + field + ' = $' + String(newIndx);
        this.whereValue.push(value);

        return this;
    }

    public select(table: string, fields: any = '') {
        if (fields.length > 0) {
            this.sqlSelect = 'SELECT ' + fields + ' FROM ' + table;
        } else {
            this.sqlSelect += 'FROM ' + table;
        }

        return this;
    }

    public async exec(): Promise <any> {
        const query = this.sqlSelect + this.inner + this.sqlWh;
        let condition: any = [];
        return new Promise( ( resolve, reject ) => {
            switch (this.typeSQL) {
                case 'SELECT':

                    if ( Object.keys(this.whereValue).length > 0 ) {
                        condition = this.whereValue;
                    }

                    this.clearVar();
                    const data = this.conex.query(query, condition, (error: any, results: any, fields: any) => {
                        if (Object.keys(results[0]).length === 1 ) {
                            resolve(results[0]);
                        } else if (Object.keys(results[0]).length > 1 ) {
                            resolve(results[0]);
                        } else {
                            resolve({
                                rowCount: 0,
                            });
                        }
                    });
                    break;

                default:
                    return false;
                    break;
            }
        });


        switch (this.typeSQL) {
            case 'SELECT':

                if ( Object.keys(this.whereValue).length > 0 ) {
                    condition = this.whereValue;
                }

                this.clearVar();
                const data = this.conex.query(query, condition, (error: any, results: any, fields: any) => {
                    console.log(results);
                });

                return data;
                /*const data = await client.query(query);
                client.release();
                client.end();
                if (data.rowCount === 0) {
                    return {
                        rowCount: 0,
                    };
                } else {
                    if (data.rowCount === 1) {
                        return data.rows[0];
                    } else {
                        return data.rows;
                    }

                }*/

                break;

            default:
                return false;
                break;
        }
    }

    private clearVar() {
        this.sqlSelect = 'SELECT * ';
        this.sqlWh = '';
    }
}

export default  new Conexion();
