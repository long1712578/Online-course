const db = require('../utils/db');

const tbCourseLike = 'courselike';
const tbCourse='course';

module.exports = {
  add(entity) {
    return db.add(entity,tbCourseLike);
  },
  delete : async(id)=>{
    const sql = `DELETE FROM ${tbCourseLike} WHERE id=${id};`;
        await db.load(sql);
  },
  getLikeByUserId: async(id)=>{
    const sql = `select l.id,c.name,c.price,c.image FROM ${tbCourseLike}
     as l inner join ${tbCourse} as c on l.courseId=c.id WHERE userId=${id}`;
       return await db.load(sql);
  },
};