const mysql =require('mysql');
const db=require('../utils/db');
const tbRoute='route';
const pageSize = 5;

module.exports={
    getRouteAll: async(page)=>{
        let sql1= `SELECT count(*) AS total FROM ${tbRoute}`;
        let rs= await db.load(sql1);
        
        //Tong trang
        const totalPage=rs[0].total;
        const pageTotal=Math.floor(totalPage/ pageSize)+1;
        const offset=(page-1)*pageSize;
        const sql = `SELECT * FROM ${tbRoute} LIMIT ${pageSize} OFFSET ${offset}`;
        const rows = await db.load(sql);
        return {
            pageTotal:pageTotal,
            category: rows
        }
    },
    quantityField: async()=>{
        const sql = `SELECT count(id) as quantityField
        FROM ${tbRoute}`;
        const rows = await db.load(sql);
        return rows[0];
    }
}