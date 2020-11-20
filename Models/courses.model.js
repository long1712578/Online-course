const mysql =require('mysql');
const db=require('../utils/db');
const tbCourse='course';


module.exports={
    getCoursesAll: async()=>{
        const sql = `SELECT * FROM ${tbCourse}`;
        const rows = await db.load(sql);
        return rows;
    },
}