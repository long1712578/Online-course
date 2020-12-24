module.exports = {
    add(cart, item) {
      cart.push(item);
    },
  
    del(cart, id) {
      for (let i = cart.length - 1; i >= 0; i--) {
        if (id === cart[i].id) {
          cart.splice(i, 1);
          return;
        }
      }
    },
  
    getNumberOfItems(cart) {
      let ret = 0;
      for (ci of cart) {
        ret += ci.quantity;
      }
  
      return ret;
    }
  };
  