export default class Joins {
    protected table: string = '';
    protected inner: string = '';

    /**
     * Crea un inner join
     * @param foreignTable
     * @param fieldTableJoin
     * @param fieldTable
     */
    public Inner(foreignTable: string, fieldTableJoin: string, fieldTable: string) {
        this.inner = ' INNER JOIN ' + foreignTable + ' ON ' + foreignTable + '.' + fieldTableJoin + '=' + fieldTable;
        return this;
    }
}
