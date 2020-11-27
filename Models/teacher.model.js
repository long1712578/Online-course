const mysql =require('mysql');
const db=require('../utils/db');
const tbTeacher='user';


module.exports={
    getTeacherAll: async()=>{
        const sql = `SELECT * FROM ${tbTeacher} WHERE type=2`;
        const rows = await db.load(sql);
        return rows;
    },
}