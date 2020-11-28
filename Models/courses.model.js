const mysql =require('mysql');
const db=require('../utils/db');
const tbRoute='route';
const tbCourse='course';
const pageSize=6;


module.exports={
    getCoursesAll: async(page)=>{
        //Tinh tong san pham
        let sql1= `SELECT count(*) AS total FROM ${tbCourse}`;
        const rs= await db.load(sql1);
        //Tong trang
        const totalPage=rs[0].total;
        const pageTotal=Math.floor(totalPage/ pageSize)+1;
        const offset=(page-1)*pageSize;
        const sql = `SELECT * FROM ${tbCourse} LIMiT ${pageSize} OFFSET ${offset}`;
        const rows = await db.load(sql);
        return {
            pageTotal:pageTotal,
            rourses: rows,
        };
    },
    getCoursesById: async(id)=>{
        const sql=`SELECT *FROM ${tbCourse} WHERE id=${id}`;
        const rows=await db.load(sql);
        return rows;
    },
    getCoursesByRouteId: async(idRoute)=>{
        const sql=`select *
        from (SELECT c.* FROM ${tbCourse} c inner join
             ${tbRoute} r on r.id=c.idroute) kq where kq.idRoute=${idRoute} `;
        const rows=await db.load(sql);
        return rows;
    }
}