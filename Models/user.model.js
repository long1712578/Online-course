const mysql =require('mysql');
const { add } = require('../utils/db');
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
    updateProfile: async(userId,FullName, email, phone, gender, dob, address, UserName,Password)=>{
        // let condition=`Id=${userId}`
        // let entity=`FullName='${FullName}', email='${email}', phone='${phone}', 
        // gender='${gender}', dob='${dob}', address='${address}', UserName='${UserName}', Password='${Password}'`;
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