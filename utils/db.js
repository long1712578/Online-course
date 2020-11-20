const mysql = require('mysql');
const util=require('util');

//Tao ket noi voi database
function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: "coursesonline",
        
    });
}

//const pool_query=util.promisify(createConnection.query).bind(createConnection);


exports.load = sql => {
    return new Promise((done, fail) => {
        const con = createConnection();
        con.connect(err => {
            if(err) {
                fail(err);
            }
        });
        con.query(sql, (error, results, fields) => {
            if(error) {
                fail(error);
            }
            done(results);
        });
        con.end();
    });
};

exports.add = (tbName, entity) => {
    return new Promise((done, fail) => {
        const con = createConnection();
        con.connect(err => {
            if(err) {
                fail(err);
            }
        });
        const sql = `INSERT INTO \`${tbName}\` SET ?`;
        con.query(sql, entity, (error, results) => {
            if (error) {
                fail(error);
            }
            done(results.insertId);
        });
        con.end();
    })
};
