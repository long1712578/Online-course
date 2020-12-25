const mysql =require('mysql');
const db=require('../utils/db');
const tbRoute='route';
const tbCourse='course';
const tbCourseRating='ratingcourse';
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
        //const
        return {
            pageTotal:pageTotal,
            rourses: rows
        };
    },
    getCoursesCatAll: async(cat,page)=>{
        //Tinh tong san pham
        let sql1= `SELECT count(*) AS total FROM ${tbCourse} where idCategory=${cat}`;
        const rs= await db.load(sql1);
        
        //Tong trang
        const totalPage=rs[0].total;
        
        const pageTotal=Math.floor(totalPage/ pageSize)+1;
        const offset=(page-1)*pageSize;
        const sql = `SELECT * FROM ${tbCourse} WHERE idCategory=${cat} LIMiT ${pageSize} OFFSET ${offset}`;
        const rows = await db.load(sql);
        return {
            pageTotal:pageTotal,
            rourses: rows,
        };
    },
    getCoursesSearch: async(page,keyWord)=>{
        //Tinh tong san pham
        
        let sqlFTS=`SELECT count(*) AS total from ${tbCourse} where match
            (name,described) against ("${keyWord}" with query expansion)`;
        const rs= await db.load(sqlFTS);
        //Tong trang
        const totalPage=rs[0].total;
        const pageTotal=Math.floor(totalPage/ pageSize)+1;
        const offset=(page-1)*pageSize;

        const sql = `SELECT * from ${tbCourse} where match
            (name,described) against ("${keyWord}" with query expansion)`;
        const rows = await db.load(sql);
        return {
            pageTotal:pageTotal,
            rourses: rows,
        };
    },
    getCoursesCatSearch: async(cat,page,keyWord)=>{
        //Tinh tong san pham
        
        let sqlFTS=`SELECT count(*) AS total from ${tbCourse} where idCategory=${cat} and match
            (name,described) against ("${keyWord}" with query expansion)`;
        const rs= await db.load(sqlFTS);
        //Tong trang
        const totalPage=rs[0].total;
        const pageTotal=Math.floor(totalPage/ pageSize)+1;
        const offset=(page-1)*pageSize;

        const sql = `SELECT * from ${tbCourse} where idCategory=${cat} and match
            (name,described) against ("${keyWord}" with query expansion)`;
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
    },
    getCoursesTopTen: async()=>{
        const sql= `SELECT *
        FROM ${tbCourse}
        order by dateCourse desc LIMIT ${10}`;
        const rows=await db.load(sql);
        return rows;
    },
    getCoursesViewTen: async()=>{
        const sql= `SELECT *
        FROM ${tbCourse}
        order by view desc LIMIT ${10}`;
        const rows=await db.load(sql);
        return rows;
    },
    increaseView: async(id)=>{
        const sql=`update ${tbCourse} set view=view+1 where id=${id};`
        const rows=await db.load(sql);
    },
    addRating: async(entity)=>{
        return db.add(entity,tbCourseRating);
    },
    updateRating: async(id)=>{
        const sql=`update ${tbCourse}
        set rating = (
        select avg(rating) from ${tbCourseRating}  where courseId=${id})
        where id= ${id};`
        const result=await db.load(sql);
    }

}