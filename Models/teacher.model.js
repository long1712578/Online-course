const mysql =require('mysql');
const db=require('../utils/db');
const tbTeacher='user';
const pageSize=4;


module.exports={
    getTeacherAll: async(page)=>{
        let sql1= `SELECT count(*) AS total FROM ${tbTeacher} where type=2 and isActive=1`;
        let rs= await db.load(sql1);
        //Tong trang
        const totalPage=rs[0].total;
        const pageTotal=Math.floor(totalPage/ pageSize)+1;
        const offset=(page-1)*pageSize;
        const sql = `SELECT * FROM ${tbTeacher} WHERE type=2 and isActive=1 LIMiT ${pageSize} OFFSET ${offset}`;
        const rows = await db.load(sql);
        return {
            pageTotal:pageTotal,
            teacher: rows
        };
    },
    getTeacherById: async(id)=>{
        const sql = `SELECT * FROM ${tbTeacher} WHERE type=2 and Id=${id} `;
        const rows = await db.load(sql);
        return rows;
    },
    quantityTeacher: async()=>{
        const sql = `SELECT count(id) as quantityTeacher
        FROM ${tbTeacher} where type=2;`;
        const rows = await db.load(sql);
        return rows[0];
    }
}