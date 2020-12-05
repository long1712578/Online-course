const mysql =require('mysql');
const db=require('../utils/db');
const tbVideo='video';
const tbTeacher='user';//type=2
const tbRoute='route';


module.exports={
    getVideoDeatilAll: async(id,video)=>{
        const sql = `
        select *
from (select  Row_number() over(order by idVideo) STT, v.name as NameVideo, v.path as PathVideo,v.id as idVideo, c.id as IdCourse, c.name as NameCourse, c.describe as describeCourse, c.price as price, t.FullName as Fullname,t.describe as DescribeTeacher,t.level as LevelTeacher
      from ((video v inner join course c on c.id = v.IdCourses)
      inner join (select * from user u where u.type=2) t on t.Id=c.Idteacher) where c.id=${id}) kq
where STT=${video}
    `;
        const rows = await db.load(sql);
        return rows;
    },

    getVideoDeatilList: async(id)=>{
        const sql = `
        select *
        from (select  Row_number() over(order by idVideo) STT, v.name as NameVideo, v.path as PathVideo,v.id as idVideo, c.id as IdCourse, c.name as NameCourse, c.describe as describeCourse, c.price as price, t.FullName as Fullname,t.describe as DescribeTeacher,t.level as LevelTeacher
      from ((video v inner join course c on c.id = v.IdCourses)
      inner join (select * from user u where u.type=2) t on t.Id=c.Idteacher) where c.id=${id}) kq
    `;
        const rows = await db.load(sql);
        return rows;
    },

}