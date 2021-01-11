const mysql =require('mysql');
const db=require('../utils/db');
const tbComman='commanadmin';


module.exports={
    add: async(entity)=>{
        return db.add(entity, tbComman);
    },
    getAll: async(id)=>{
        const sql=`SELECT *FROM ${tbComman} WHERE userId=${id}`;
        const rows=await db.load(sql);
        return rows;
    }
}