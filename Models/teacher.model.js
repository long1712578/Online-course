const mysql =require('mysql');
const db=require('../utils/db');
const tbTeacher='user';


module.exports={
    getTeacherAll: async()=>{
        const sql = `SELECT * FROM ${tbTeacher}`;
        const rows = await db.load(sql);
        return rows;
    },
}