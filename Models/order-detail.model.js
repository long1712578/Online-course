const db = require('../utils/db');

const tbOrderDetail = 'orderdetail';

module.exports = {
  add(entity) {
    return db.add(entity,tbOrderDetail);
  }
};