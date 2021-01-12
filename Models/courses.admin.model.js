const mysql =require('mysql');
const db=require('../utils/db');
const tbCourse='course';
const pageSize=6;


module.exports={
    getCoursesAdminAll: async()=>{
        let sql1= `SELECT * FROM ${tbCourse}`;
        const rs= await db.load(sql1);
        
        return rs;
    },
  
}