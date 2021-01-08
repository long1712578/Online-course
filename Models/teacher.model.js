const mysql =require('mysql');
const db=require('../utils/db');
const tbTeacher='user';


module.exports={
    getTeacherAll: async()=>{
        const sql = `SELECT * FROM ${tbTeacher} WHERE type=2`;
        const rows = await db.load(sql);
        return rows;
    },
    getTeacherById: async(id)=>{
        const sql = `SELECT * FROM ${tbTeacher} WHERE type=2 and Id=${id}`;
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