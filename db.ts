import mysql from 'mysql';

export class Connection {
    constructor () {}

    public initDbConnection(): any {
        return mysql.createConnection({
            host     : 'localhost',
            user     : 'hotdog1987',
            password : 'hotdog',
            database : 'user_schema'
        });
    }
}