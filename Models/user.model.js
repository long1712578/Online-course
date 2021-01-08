const mysql =require('mysql');
const { add } = require('../utils/db');
const db=require('../utils/db');
const tbUser='user';
const pageSize=4;


module.exports={
    add: async(entity)=>{
        return db.add(entity, tbUser);
    },
    delete: async(id)=>{
        const sql = `DELETE FROM ${tbUser} WHERE Id=${id};`;
        await db.load(sql);
    },
    getUser: async(page)=>{
        let sql1= `SELECT count(*) AS total FROM ${tbUser} where type=1`;
        let rs= await db.load(sql1);
        //Tong trang
        const totalPage=rs[0].total;
        const pageTotal=Math.floor(totalPage/ pageSize)+1;
        const offset=(page-1)*pageSize;
        const sql = `SELECT * FROM ${tbUser} WHERE type=1  LIMiT ${pageSize} OFFSET ${offset}`;
        const rows = await db.load(sql);
        return {
            pageTotal:pageTotal,
            users: rows
        };
    },
    getUserById: async(id)=>{
        let sql=`select * from ${tbUser} where Id=${id}`;
        const row=await db.load(sql);
        if(row==null)
            return null;
        return row[0];
    },
    getUsersById: async(id)=>{
        let sql=`select * from ${tbUser} where type=1 and Id=${id}`;
        const row=await db.load(sql);
        if(row==null)
            return null;
        return row[0];
    },
    updateProfile: async(userId,FullName, email, phone, gender, dob, address, UserName,Password)=>{
         const sql=`update ${tbUser} set 
        FullName='${FullName}', email='${email}', phone='${phone}', 
        gender='${gender}', dob='${dob}', address='${address}', UserName='${UserName}', Password='${Password}'
         where Id=${userId}`;
        return await db.load(sql);
    },
    async getUserByUserName(username) {
        const rows = await db.load(`select * from ${tbUser} where UserName = '${username}'`);
        if (rows.length === 0)
          return null;
    
        return rows[0];
      },
}