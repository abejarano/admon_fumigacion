import mysql from 'mysql';

class Conexion {
    private conex: any;
    private sqlWh: string = '';
    private sql: string = '';
    private inner: string = '';
    private whereValue: any[] = [];
    private typeSQL: string = 'SELECT';
    private table: string = '';


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
        this.sql = '';
        this.table = table;
        if (fields.length > 0) {
            this.sql = 'SELECT ' + fields + ' FROM ' + table;
        } else {
            this.sql += 'SELECT * FROM ' + table;
        }
        return this;
    }
    public update(table: string, values: any) {
        this.sql = 'UPDATE ' + table + ' SET ';
        this.typeSQL = 'UPDATE';
        let indx = 0;
        // tslint:disable-next-line:forin
        for (const key in values) {
            if (key !== 'id') {
                if (Object.keys(values).length - 1 === indx) {
                    this.sql += key + ' = ? ';
                } else {
                    this.sql += key + ' = ?, ';
                }

                this.whereValue.push(values[key]);
            }

            indx++;
        }
        return this;
    }
    public insert(table: string, values: any) {
        this.sql = 'INSERT ' + table + ' SET ? ';
        this.typeSQL = 'INSERT';

        this.whereValue = values;
        return this;
    }
    public raw(sql: string): Promise<any> {
        return new Promise( (resolve, rejects) => {
            this.conex.query(sql, (error: any, results: any, fields: any) => {
                if (Object.keys(results).length === 1 ) {
                    results = results[0];
                    resolve(JSON.parse( JSON.stringify(results)));
                } else if (Object.keys(results[0]).length > 1 ) {
                    resolve(JSON.parse( JSON.stringify(results)));
                } else {
                    resolve({
                        rowCount: 0,
                    });
                }
            });
        });
    }
    public async exec(): Promise <any> {
        const query = this.sql + this.inner + this.sqlWh;
        let condition: any = [];
        if ( Object.keys(this.whereValue).length > 0 ) {
            condition = this.whereValue;
        }
        return new Promise( ( resolve, reject ) => {
            if (this.typeSQL === 'SELECT') {
                this.conex.query(query, condition, (error: any, results: any, fields: any) => {
                    if (error) {
                        reject(error);
                    }
                    this.clearVar();

                    if (Object.keys(results).length === 1 ) {
                        resolve(JSON.parse( JSON.stringify(results[0])));
                    } else if (Object.keys(results[0]).length > 1 ) {
                        resolve(JSON.parse( JSON.stringify(results)));
                    } else {
                        resolve({
                            rowCount: 0,
                        });
                    }
                });

            }
            if (this.typeSQL === 'INSERT' || this.typeSQL === 'UPDATE' || this.typeSQL === 'DELETE') {
                this.conex.query(query, condition, (error: any, results: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    if (this.typeSQL === 'INSERT') {
                        this.clearVar();
                        resolve(results.insertId);
                    } else if (this.typeSQL === 'UPDATE' || this.typeSQL === 'DELETE') {
                        this.clearVar();
                        resolve(results.affectedRows);
                    }

                });
            }

        });

    }

    public delete(table: string) {
        this.table = table;
        this.sql = 'DELETE FROM ' + table;
        this.typeSQL = 'DELETE';
        return this;
    }

    public async paginate(page: number = 1, rowsPag: number = 10): Promise<any> {
        const perPage = rowsPag;
        const offset = (page - 1) * perPage;
        const rs = await this.raw('select count(id) as total from ' + this.table);

        const totalRows = rs.total;
        const totalPages = Math.ceil(totalRows / perPage);

        const SQL = this.sql + this.inner + this.sqlWh + ' LIMIT ' + offset + ',' + perPage;
        const data = await this.raw(SQL);

        return {
            paginate_data: data,
            paginate_totalRows: totalRows,
            paginate_totalPages: totalPages,
        };
    }

    private clearVar() {
        this.sql = '';
        this.sqlWh = '';
        this.typeSQL = 'SELECT';
        this.inner = '';
        while (this.whereValue.length > 0) {
            this.whereValue.pop();
        }
        this.whereValue = [];
    }
}

export default  new Conexion();
