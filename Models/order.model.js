const db=require('../utils/db');
const tbOrder='courseorder';
const tbOrderDetail='orderdetail';


module.exports={
  async add(entity) {
    const ret = await db.add(entity, tbOrder);
    entity.OrderID = ret.insertId;
  },
  getCountRegisterById: async(id)=>{
    const sql= `SELECT count(*) as count FROM ${tbOrderDetail} where productId=${id}`;
    const rows = await db.load(sql);
        return rows[0];
  },
  getCoursesUserByIdUser: async(id)=>{
    const sql=`SELECT o.productId as productId FROM ${tbOrder} as c
     INNER JOIN ${tbOrderDetail} as o on c.Id=o.orderId where userId=${id}`;
     const rows = await db.load(sql);
        return rows;
  }
}
  