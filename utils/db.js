const mysql = require('mysql');
const util=require('util');

//Tao ket noi voi database
function createConnection() {
    return mysql.createPool({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: "coursesonline",
        connectionLimit: 50,
    });
}
const pool=createConnection();

const pool_query = util.promisify(pool.query).bind(pool);

module.exports={
    load: sql => pool_query(sql),
    add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
    del: (condition, tableName) => pool_query(`delete from ${tableName} where ?`, condition),
    patch: (entity, condition, tableName) => pool_query(`update ${tableName} set  ? where ?`, [entity, condition])
}
