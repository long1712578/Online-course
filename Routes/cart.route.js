const express=require('express');
const moment=require('moment');
const modelCourses=require('../Models/courses.model');
const modelCart=require('../Models/cart.model');
const modelOrder=require('../Models/order.model');
const modelDederDetail=require('../Models/order-detail.model');
const router=express.Router();

router.get('/cart', async(req,res)=>{
    const items=[];
    var count=0;
    var priceTotal=0;
    for(const ci of req.session.cart){
        const course=await modelCourses.getCoursesById(ci.id);
        //Tong khoa hoc
        count+=1;
        //Tong tien
        priceTotal+=course[0].price;
        items.push({
            ...ci,
            ...course,

        })
        
    }
    res.render('users/cart',{
        items:items,
        priceTotal: priceTotal,
        empty:req.session.cart.length === 0
    });
});

router.post('/cart/add', function (req, res) {
  
    const item = {
      id: +req.body.id
    };

    modelCart.add(req.session.cart, item);
    //console.log("cart",req.session.cart);
    res.redirect('/user/cart');
  });
  
  router.post('/cart/remove', function (req, res) {
    modelCart.del(req.session.cart, +req.body.id);
    res.redirect(req.headers.referer);
  });
  
  router.post('/cart/checkout', async function (req, res) {
    const details = [];
    let total = 0;
    let amount=0;
    for (const ci of req.session.cart) {
      const course = await modelCourses.getCoursesById(ci.id);
      amount +=1;
      total += course[0].price;
      details.push({
        productId: course[0].id,
        price: course[0].price,
      });
    }
  
    const order = {
      
      userId: req.session.authUser.Id,
      totalPrice: total,
      amount:amount,
      orderdate: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    await modelOrder.add(order);
  
    for (const detail of details) {
      detail.orderId = order.OrderID;
      await modelDederDetail.add(detail);
    }
  
    req.session.cart = [];
    res.redirect(req.headers.referer);
  });

module.exports=router;