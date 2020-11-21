const mysql =require('mysql');
const db=require('../utils/db');
const tbCategory='category';


module.exports={
    getCategoryAll: async()=>{
        const sql = `SELECT * FROM ${tbCategory}`;
        const rows = await db.load(sql);
        return rows;
    },
}