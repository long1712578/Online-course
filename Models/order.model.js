const db=require('../utils/db');
const tbOrder='courseorder';


module.exports={
  async add(entity) {
    const ret = await db.add(entity, tbOrder);
    entity.OrderID = ret.insertId;
  }
}
  