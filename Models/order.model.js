const db=require('../utils/db');
const tbOrder='courseorder';
const tbOrderDetail='orderdetail';
const tbCourse='course';


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
  },
  getListOrderByIdUser: async(id)=>{
    const sql= `SELECT idOrder,name,image,price,orderDate FROM ${tbCourse} as c inner join (SELECT orderDate, productId,o.id as idOrder FROM ${tbOrder} as c
      INNER JOIN ${tbOrderDetail} as o on c.Id=o.orderId where userId=${id})as s on c.id=s.productId`;
      const rows = await db.load(sql);
        return rows;
  },
}
  