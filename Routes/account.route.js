const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const router = express.Router();
const userModel=require('../Models/user.model');
router.get('/signUp', async function (req, res) {
    res.render('account/signUp');
  })
  
router.post('/signUp', async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const dob = moment(req.body.DOB, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const gender=parseInt(req.body.gender);
  const user = {
    UserName: req.body.username,
    Password: hash,
    dob: dob,
    FullName: req.body.fullname,
    email: req.body.email,
    address:req.body.address,
    phone:req.body.phoneNumber,
    gender:gender,
    type: req.body.typeAccount,
    image: req.body.image,
    describe:req.body.describe,
    level:req.body.level
    
  }
  
  await userModel.add(user);
  res.render('account/signIn');
})

router.get('/signIn', async function (req, res) {
  res.render('account/signIn');
})
router.post('/signIn', async (req,res)=>{
 
  const user = await userModel.getUserByUserName(req.body.username);
  
  if (user === null) {
    return res.render('account/signIn', {
      err_message: 'Invalid username or password.'
    });
  }

  const ret = bcrypt.compareSync(req.body.password, user.Password);
  if (ret === false) {
    return res.render('account/signIn', {
      err_message: 'Invalid username or password.'
    });
  }

  req.session.isAuth=true;
  req.session.authUser=user;
  

  // let url = req.session.retUrl || '/';
  if(user.type===1){
    //req.session.cart=[];
    res.redirect('/user/home');
  }else if(user.type===2){
    res.redirect('/teacher')
  }else{
    res.redirect('/admin/index')
  }
 
})

router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.getUserByUserName(username);
  if (user === null) {
    return res.json(true);
  }

  res.json(false);
})
router.get('/profile',async (req,res)=>{
  res.render('account/profile');
})
module.exports=router;