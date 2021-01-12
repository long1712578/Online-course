const mysql =require('mysql');
const db=require('../utils/db');
const tbRoute='route';
const tbCourse='course';
const pageSize = 6;

module.exports={
    getRouteAll: async(page)=>{
        let sql1= `SELECT count(*) AS total FROM ${tbRoute}`;
        let rs= await db.load(sql1);
        
        //Tong trang
        const totalPage=rs[0].total;
        const pageTotal=Math.floor(totalPage/ pageSize)+1;
        const offset=(page-1)*pageSize;
        const sql = `SELECT * FROM ${tbRoute} LIMIT ${pageSize} OFFSET ${offset}`;
        const rows = await db.load(sql);
        return {
            pageTotal:pageTotal,
            category: rows
        }
    },
    quantityField: async()=>{
        const sql = `SELECT count(id) as quantityField
        FROM ${tbRoute}`;
        const rows = await db.load(sql);
        return rows[0];
    },
    getRouteByID: async(id)=>{
        const sql = `SELECT * FROM ${tbRoute} WHERE Id=${id} `;
        const rows = await db.load(sql);
        return rows;
    },
    updateCategory: async(id,name)=>{
        const sql=`UPDATE ${tbRoute}
        SET  name='${name}'
        WHERE id=${id}`;
        await db.load(sql);
    },
    add: async(entity)=>{
        return db.add(entity,tbRoute);
    },
    count: async(id)=>{
        const sql =`SELECT count(*) as count FROM ${tbRoute} as r inner join ${tbCourse} as c on r.id=c.idroute where r.id=${id}`;
        return db.load(sql);
    },
    delete: async(id)=>{
        const sql = `DELETE FROM ${tbRoute} WHERE id=${id};`;
        await db.load(sql);
    }
}