const mysql =require('mysql');
const db=require('../utils/db');
const tbUser='user';


module.exports={
    add: async(entity)=>{
        return db.add(entity, tbUser);
    },
    getUserById: async(id)=>{
        let sql=`select * from ${tbUser} where Id=${id}`;
        const row=await db.load(sql);
        if(row==null)
            return null;
        return row[0];
    },
    async getUserByUserName(username) {
        const rows = await db.load(`select * from ${tbUser} where UserName = '${username}'`);
        if (rows.length === 0)
          return null;
    
        return rows[0];
      },
}