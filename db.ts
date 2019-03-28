import mysql from 'mysql';

export class Connection {

    constructor () {}

    public initDbConnection(): any {
        return mysql.createConnection({
            host     : '127.0.0.1',
            user     : 'root',
            password : 'hotdog',
            database : 'user_schema'
        });
    }
}