const db = require('../utils/db');

const tbOrderDetail = 'orderdetail';

module.exports = {
  add(entity) {
    return db.add(entity,tbOrderDetail);
  },
  delete : async(id)=>{
    const sql = `DELETE FROM ${tbOrderDetail} WHERE id=${id};`;
        await db.load(sql);
  }
};