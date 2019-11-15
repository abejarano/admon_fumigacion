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
    public insert(table: string, values: any) {
        this.sql = 'INSERT ' + table + ' SET ? ';
        let value = 'VALUE (';
        let indx = 0;
        this.typeSQL = 'INSERT';

        this.whereValue = values;
        return this;
    }
    public raw(sql: string): Promise<any> {
        return new Promise( (resolve, rejects) => {
            this.conex.query(sql, (error: any, results: any, fields: any) => {
                if (Object.keys(results).length === 1 ) {
                    resolve(results[0]);
                } else if (Object.keys(results[0]).length > 1 ) {
                    resolve(results);
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
        this.clearVar();
        return new Promise( ( resolve, reject ) => {
            switch (this.typeSQL) {
                case 'SELECT':
                    console.log(query);
                    this.conex.query(query, condition, (error: any, results: any, fields: any) => {

                        if (Object.keys(results).length === 1 ) {
                            resolve(results[0]);
                        } else if (Object.keys(results[0]).length > 1 ) {
                            resolve(results);
                        } else {
                            resolve({
                                rowCount: 0,
                            });
                        }
                    });
                    break;
                case 'INSERT':
                    this.conex.query(query, condition, (error: any, results: any) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(results.insertId);
                    });
                default:
                    return false;
                    break;
            }
        });

    }

    public async paginate(page: number = 1, rowsPag: number = 10): Promise<any> {
        const perPage = rowsPag;
        const offset = (page - 1) * perPage;
        const rs = await this.raw('select count(id) as total from ' + this.table);
        const totalRows = rs.total;
        const totalPages = Math.ceil(totalRows / perPage);

        const SQL = this.sql + this.inner + this.sqlWh + ' LIMIT ' + offset +',' + perPage;
        const data = await this.raw(SQL);

        return {
            paginate_data: data,
            paginate_totalRows: totalRows,
            paginate_totalPages: totalPages,
        };
    }

    private clearVar() {
        this.sql = 'SELECT * ';
        this.sqlWh = '';
    }
}

export default  new Conexion();
