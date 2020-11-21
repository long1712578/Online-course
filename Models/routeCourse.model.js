const mysql =require('mysql');
const db=require('../utils/db');
const tbRoute='route';


module.exports={
    getRouteAll: async()=>{
        const sql = `SELECT * FROM ${tbRoute}`;
        const rows = await db.load(sql);
        return rows;
    },
}